import { DynamoDB } from 'aws-sdk';

const query = jest.fn();
const putItem = jest.fn();

jest.mock('aws-sdk', () => {
  return {
    DynamoDB: jest.fn(() => ({
      query,
      putItem,
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

export const queryMock = new QueryMock();
export const putItemMock = new PutItemMock();
