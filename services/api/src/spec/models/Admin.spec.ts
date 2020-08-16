import bcrypt from 'bcryptjs';

import Admin from 'models/Admin';
import { queryMock, putItemMock } from '../mocks/dynamodb';

describe('Models: Admin', () => {
  beforeEach(() => {
    queryMock.mockReset();
    putItemMock.mockReset();
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
    putItemMock.setup({
      Attributes: {
        PK: {
          S: 'ADMIN#admin@admin.com',
        },
        SK: {
          S: 'ADMIN#123456',
        },
      },
    });

    const admin = await Admin.createAdmin({
      email: 'admin@admin.com',
      password: '123456',
    });

    expect(putItemMock.getInstance()).toHaveBeenCalledWith(
      expect.objectContaining({
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          PK: {
            S: 'ADMIN#admin@admin.com',
          },
          SK: {
            S: expect.stringMatching('ADMIN#'),
          },
        },
        ReturnValues: 'ALL_OLD',
      })
    );

    expect(admin?.toJSON()).toEqual(
      expect.objectContaining({
        email: 'admin@admin.com',
      })
    );
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
    const hashedPassword = bcrypt.hashSync('123456', 8);
    queryMock.setup({
      Items: [
        {
          PK: {
            S: 'ADMIN#admin@admin.com',
          },
          SK: {
            S: `ADMIN#${hashedPassword}`,
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
