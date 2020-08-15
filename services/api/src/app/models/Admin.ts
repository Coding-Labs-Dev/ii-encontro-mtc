import { QueryInput, PutItemInput } from 'aws-sdk/clients/dynamodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { APP_KEY } from 'config/constants';
import { Model, Instance } from 'database/model';

const KeyPrefix = 'ADMIN';

const attributesMap = {
  PK: 'email',
  SK: 'hashedPassword',
};

class Admin extends Model {
  public async getAdmin(email: string) {
    const params: QueryInput = {
      TableName: Admin.Table,
      KeyConditionExpression: '#pk = :email and begins_with(#sk, :prefix)',
      ExpressionAttributeNames: {
        '#pk': 'PK',
        '#sk': 'SK',
      },
      ExpressionAttributeValues: {
        ':email': { S: this.withPrefix(email) },
        ':prefix': { S: Admin.PREFIX },
      },
    };

    const data = await Admin.DB.query(params).promise();
    if (!data.Count) return null;
    return new AdminInstance(data, attributesMap);
  }

  public async createAdmin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const params: PutItemInput = {
      TableName: Admin.Table,
      Item: {
        PK: {
          S: this.withPrefix(email),
        },
        SK: {
          S: this.withPrefix(hashedPassword),
        },
      },
    };

    const data = await Admin.DB.putItem(params).promise();
    return new AdminInstance(data, attributesMap);
  }
}

export default new Admin(KeyPrefix);

class AdminInstance extends Instance {
  public static Model: Admin;
  public static json: {
    email: string;
    hashedPassword: string;
  };

  public constructor(data, attributes: typeof Instance.RawAttributes) {
    super();
    AdminInstance.Model = new Admin(KeyPrefix);
    AdminInstance.Data = data;
    AdminInstance.RawAttributes = attributes;
    AdminInstance.json = this.toJSON();
  }

  public createTokens(withRefreshToken = true) {
    const email = AdminInstance.json.email;
    const token = jwt.sign({ email }, APP_KEY, {
      algorithm: 'HS256',
      expiresIn: '1h',
    });

    if (!withRefreshToken) return { token };

    const refreshToken = jwt.sign({ email }, APP_KEY, {
      algorithm: 'HS256',
    });
    return { token, refreshToken };
  }

  public toJSON() {
    const data = AdminInstance.parseItem(AdminInstance.Data.Items[0]);
    const result = {};
    Object.keys(data).reduce((obj, key) => {
      obj[AdminInstance.RawAttributes[key]] = AdminInstance.Model.withoutPrefix(
        data[key]
      );
      return obj;
    }, result);
    return result as typeof AdminInstance.json;
  }

  public async authenticate(password: string) {
    const hashedPassword = AdminInstance.json.hashedPassword;
    const auth = await bcrypt.compare(password, hashedPassword);
    if (auth) {
      return this.createTokens();
    }
    return false;
  }
}
