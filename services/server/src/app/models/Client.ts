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

const schemaName = 'clients';

const schema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true,
      default: () => ulid(),
    },
    transactions: {
      type: Array,
      schema: [String],
    },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      index: {
        name: 'email',
        global: true,
      },
    },
    phone: { type: String, required: true },
    cpf: {
      type: String,
      required: true,
      // @ts-ignore Type Error
      set: (value: string) => {
        const regex = /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/;
        if (!regex.test(value)) {
          const raw = value.replace(/\D/g, '');
          return `${raw.substr(0, 3)}.${raw.substr(3, 3)}.${raw.substr(
            6,
            3
          )}-${raw.substr(9)}`;
        }
        return value;
      },
    },
    dob: Date,
    street: { type: String, required: true },
    number: { type: String, required: true },
    complement: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: {
      type: String,
      required: true,
      // @ts-ignore Type Error
      set: (value: string) => {
        const regex = /^[0-9]{5}-[0-9]{3}$/;
        if (!regex.test(value)) {
          const raw = value.replace(/\D/g, '');
          return `${raw.substr(0, 5)}-${raw.substr(5)}`;
        }
        return value;
      },
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
