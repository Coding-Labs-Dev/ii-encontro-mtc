declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'production' | 'development' | 'test';
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    DYNAMODB_ENDPOINT: string;
    DYNAMODB_TABLE: string;
    PAGSEGURO_EMAIL: string;
    PAGSEGURO_TOKEN: string;
    PAGSEGURO_NOTIFICATION: string;
    APP_KEY: string;
  }
}
