import * as bcrypt from '../mocks/bcrypt';
import { queryMock, batchWriteItemMock } from '../mocks/dynamodb';
import Admin from 'models/Admin';

describe('Models: Admin', () => {
  beforeEach(() => {
    queryMock.mockReset();
    batchWriteItemMock.mockReset();
    bcrypt.compare.mockReset();
  });

  it('getAdmin', async () => {
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

    const admin = await Admin.getAdmin('email');

    expect(admin?.toJSON()).toEqual({
      email: 'admin@admin.com',
      hashedPassword: '123456',
    });
  });

  it('createAdmin', async () => {
    batchWriteItemMock.setup({});

    const admin = await Admin.createAdmin({
      email: 'admin@admin.com',
      password: '123456',
    });

    expect(batchWriteItemMock.getInstance()).toHaveBeenCalledWith(
      expect.objectContaining({
        RequestItems: {
          [process.env.DYNAMODB_TABLE]: [
            {
              PutRequest: {
                Item: {
                  PK: {
                    S: 'ADMIN#admin@admin.com',
                  },
                  SK: {
                    S: expect.stringMatching('ADMIN#'),
                  },
                },
              },
            },
            {
              PutRequest: {
                Item: {
                  PK: {
                    S: 'ADMIN#admin@admin.com',
                  },
                  SK: {
                    S: 'META',
                  },
                },
              },
            },
          ],
        },
      })
    );

    expect(admin?.toJSON()).toHaveProperty('email', 'admin@admin.com');
    expect(admin?.toJSON()).toHaveProperty('hashedPassword');
  });

  describe('createToken', () => {
    it('withRefreshToken', async () => {
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
      expect(tokens).toHaveProperty('token');
      expect(tokens).toHaveProperty('refreshToken');
    });

    it('withoutRefreshToken', async () => {
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
      const tokens = admin?.createTokens(false);
      expect(tokens).toHaveProperty('token');
      expect(tokens).not.toHaveProperty('refreshToken');
    });
  });

  it('authenticate', async () => {
    bcrypt.compare.mockImplementation(() => true);
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
    const tokens = await admin?.authenticate('123456');
    expect(tokens).toHaveProperty('token');
    expect(tokens).toHaveProperty('refreshToken');
  });
});
