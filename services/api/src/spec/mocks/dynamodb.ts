import { DynamoDB } from 'aws-sdk';

const query = jest.fn();
const putItem = jest.fn();
const batchWriteItem = jest.fn();

jest.mock('aws-sdk', () => {
  return {
    DynamoDB: jest.fn(() => ({
      query,
      putItem,
      batchWriteItem,
    })),
  };
});

class QueryMock {
  setup(response: DynamoDB.QueryOutput) {
    query.mockImplementation(() => {
      return {
        promise() {
          return Promise.resolve(response);
        },
      };
    });
  }
  mockReset() {
    query.mockReset();
  }

  getInstance() {
    return query;
  }
}

class PutItemMock {
  setup(response: DynamoDB.PutItemOutput) {
    putItem.mockImplementation(() => {
      return {
        promise() {
          return Promise.resolve(response);
        },
      };
    });
  }
  mockReset() {
    putItem.mockReset();
  }
  getInstance() {
    return putItem;
  }
}
class BatchWriteItemMock {
  setup(response: DynamoDB.BatchWriteItemOutput) {
    batchWriteItem.mockImplementation(() => {
      return {
        promise() {
          return Promise.resolve(response);
        },
      };
    });
  }
  mockReset() {
    batchWriteItem.mockReset();
  }
  getInstance() {
    return batchWriteItem;
  }
}

export const queryMock = new QueryMock();
export const putItemMock = new PutItemMock();
export const batchWriteItemMock = new BatchWriteItemMock();
