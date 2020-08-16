import request from 'supertest';

import { server as app } from '~/app';
import { queryMock, batchWriteItemMock } from '../../mocks/dynamodb';

describe('AdminController', () => {
  beforeEach(() => {
    queryMock.mockReset();
    batchWriteItemMock.mockReset();
  });

  describe('POST /admins', () => {
    it('creates admin when it does not exists', async () => {
      queryMock.setup({});
      batchWriteItemMock.setup({});

      const response = await request(app)
        .post('/admins')
        .send({
          email: 'admin@admin.com',
          password: '123456',
        });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        email: 'admin@admin.com',
      });
    });

    it('does not creates admin if one already exists', async () => {
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
        .post('/admins')
        .send({
          email: 'anotheradmin@admin.com',
          password: '123456',
        });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: {
          message: 'Admin already exists',
        },
      });
    });
  });
});
