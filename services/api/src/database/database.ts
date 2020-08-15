import { DynamoDB, Endpoint } from 'aws-sdk';

class Database {
  private static instance: DynamoDB;

  private constructor() {
    const dynamoDb = new DynamoDB();
    if (process.env.DYNAMODB_ENDPOINT) {
      dynamoDb.endpoint = new Endpoint(process.env.DYNAMODB_ENDPOINT);
    }
    return dynamoDb;
  }

  public static getInstance(): DynamoDB {
    if (!Database.instance) {
      Database.instance = new Database() as DynamoDB;
    }
    return Database.instance;
  }
}

export default Database.getInstance();
