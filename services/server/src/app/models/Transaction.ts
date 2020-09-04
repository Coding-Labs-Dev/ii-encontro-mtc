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

const schemaName = 'transactions';

const schema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      required: true,
      default: ulid,
    },
    code: {
      type: String,
      required: true,
      index: {
        name: 'transaction-code',
        global: true,
      },
    },
    client: { type: String, required: true },
    location: { type: String, required: true },
    reference: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        'Aguardando',
        'Em análise',
        'Paga',
        'Disponível',
        'Em disputa',
        'Devolvida',
        'Cancelada',
      ],
    },
    date: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['creditCard', 'bankTicket'],
    },
    paymentLink: String,
    grossAmount: Number,
    feeAmount: Number,
    netAmount: Number,
    extraAmount: Number,
    installmentCount: Number,
    history: {
      type: Array,
      schema: [
        {
          type: Object,
          schema: {
            status: String,
            date: Date,
          },
        },
      ],
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
