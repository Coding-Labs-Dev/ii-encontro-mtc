import dynamoose from 'dynamoose';
import { ulid } from 'ulid';

import { DYNAMODB_ENDPOINT, DYNAMODB_TABLE } from 'config/constants';

if (process.env.NODE_ENV === 'development') {
  dynamoose.aws.ddb.local(DYNAMODB_ENDPOINT);
}

export interface Props {
  id: string;
  email: string;
  password: string;
  refreshTokens: string[];
  createdAt: string;
  updatedAt: string;
}

const { Schema } = dynamoose;

const schemaName = 'users';

const schema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true,
      default: ulid,
    },
    email: {
      type: String,
      required: true,
      index: {
        name: 'authentication',
        rangeKey: 'password',
        global: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    refreshTokens: {
      type: Array,
      schema: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Model = dynamoose.model(`${DYNAMODB_TABLE}-${schemaName}`, schema, {
  update: false,
});

export default Model;
