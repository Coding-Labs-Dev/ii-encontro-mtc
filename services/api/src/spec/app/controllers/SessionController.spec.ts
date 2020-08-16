import request from 'supertest';

import { server as app } from '~/app';
import * as bcrypt from '../../mocks/bcrypt';
import { queryMock, batchWriteItemMock } from '../../mocks/dynamodb';
import Admin from 'models/Admin';

describe('SessionController', () => {
  beforeEach(() => {
    bcrypt.compare.mockReset();
    bcrypt.hashSync.mockReset();
    queryMock.mockReset();
    batchWriteItemMock.mockReset();
  });

  describe('POST /sessions', () => {
    it('returns tokens if admin email and password matches', async () => {
      bcrypt.hashSync.mockImplementation(() => '123456');
      bcrypt.compare.mockImplementation(() => true);
      queryMock.setup({
        Items: [
          {
            PK: {
              S: 'ADMIN#admin@admin.com',
            },
            SK: {
              S: `ADMIN#123456`,
            },
          },
        ],
      });

      const response = await request(app)
        .post('/sessions')
        .send({
          email: 'admin@admin.com',
          password: '123456',
        });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        token: expect.anything(),
        refreshToken: expect.anything(),
      });
    });

    it('returns 404 if admin is not found', async () => {
      queryMock.setup({
        Items: [],
      });

      const response = await request(app)
        .post('/sessions')
        .send({
          email: 'admin2@admin.com',
          password: '123456',
        });
      expect(response.status).toBe(404);
    });

    it('returns 401 if password does not match', async () => {
      bcrypt.compare.mockImplementation(() => false);
      queryMock.setup({
        Items: [
          {
            PK: {
              S: 'ADMIN#admin@admin.com',
            },
            SK: {
              S: `ADMIN#123456`,
            },
          },
        ],
      });

      const response = await request(app)
        .post('/sessions')
        .send({
          email: 'admin2@admin.com',
          password: '123456',
        });
      expect(response.status).toBe(401);
    });
  });

  describe('PUT /sessions', () => {
    it('returns token if refreshTokens is valid', async () => {
      queryMock.setup({
        Items: [
          {
            PK: {
              S: 'ADMIN#admin@admin.com',
            },
            SK: {
              S: 'ADMIN#123456',
            },
          },
        ],
      });

      const admin = await Admin.getAdmin('admin@admin.com');
      const tokens = admin?.createTokens();
      const response = await request(app)
        .put('/sessions')
        .send({
          email: 'admin@admin.com',
          refreshToken: tokens?.refreshToken,
        });
      expect(response.body).toHaveProperty('token');
    });

    it('returns 401 if email is not found', async () => {
      queryMock.setup({});
      const response = await request(app)
        .put('/sessions')
        .send({
          email: 'admin@admin.com',
          refreshToken: '1234',
        });
      expect(response.status).toBe(401);
    });

    it('returns 401 if payload email does not match', async () => {
      queryMock.setup({
        Items: [
          {
            PK: {
              S: 'ADMIN#admin@admin.com',
            },
            SK: {
              S: 'ADMIN#123456',
            },
          },
        ],
      });

      const admin = await Admin.getAdmin('admin@admin.com');
      const tokens = admin?.createTokens();

      queryMock.setup({
        Items: [
          {
            PK: {
              S: 'ADMIN#admin2@admin.com',
            },
            SK: {
              S: 'ADMIN#123456',
            },
          },
        ],
      });

      const response = await request(app)
        .put('/sessions')
        .send({
          email: 'admin2@admin.com',
          refreshToken: tokens?.refreshToken,
        });
      expect(response.status).toBe(401);
    });

    it('returns 401 if refreshToken is invalid', async () => {
      queryMock.setup({
        Items: [
          {
            PK: {
              S: 'ADMIN#admin@admin.com',
            },
            SK: {
              S: 'ADMIN#123456',
            },
          },
        ],
      });
      const response = await request(app)
        .put('/sessions')
        .send({
          email: 'admin@admin.com',
          refreshToken: '1234',
        });
      expect(response.status).toBe(401);
    });
  });
});
