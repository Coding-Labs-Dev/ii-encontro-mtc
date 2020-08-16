import Database from 'database/database';
import { DynamoDB } from 'aws-sdk';
import {
  ItemList,
  AttributeMap,
  BatchWriteItemInput,
} from 'aws-sdk/clients/dynamodb';

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

  async batchWrite(data: BatchWriteItemInput, iteration = 0, maxTries = 3) {
    try {
      const { UnprocessedItems } = await Model.DB.batchWriteItem(
        data
      ).promise();
      if (
        UnprocessedItems &&
        Object.keys(UnprocessedItems).length &&
        iteration < maxTries
      ) {
        return new Promise(() => {
          setTimeout(() => {
            this.batchWrite({ RequestItems: UnprocessedItems }, iteration + 1);
          }, iteration * 100);
        });
      }
      return true;
    } catch (e) {
      return false;
    }
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
