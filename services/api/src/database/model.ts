import Database from 'database/database';
import { DynamoDB } from 'aws-sdk';
import { ItemList, AttributeMap } from 'aws-sdk/clients/dynamodb';

export abstract class Model {
  static PREFIX: string;
  static DB: DynamoDB;
  static Table: string;

  public constructor(prefix: string) {
    Model.PREFIX = prefix;
    Model.DB = Database;
    Model.Table = process.env.DYNAMODB_TABLE || '';
  }

  withPrefix(data: string) {
    return `${Model.PREFIX}#${data}`;
  }

  withoutPrefix(data: string) {
    return data.substr(Model.PREFIX.length + 1);
  }
}

export abstract class Instance {
  public static RawAttributes: {
    PK: string;
    SK: string;
  };
  public static Data: AttributeMap;

  public static parseItem(data: AttributeMap) {
    const result = {} as typeof Instance['RawAttributes'];
    Object.keys(data).reduce((obj, key) => {
      const value = Object.values(data[key])[0];
      obj[key] = value;
      return obj;
    }, result);
    return result;
  }

  public static parseItems(data: ItemList) {
    return data.map(item => this.parseItem(item));
  }
}
