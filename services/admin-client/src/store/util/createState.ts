import { Map } from 'immutable';

type AllowedMap<DataType> = {
  [K in keyof DataType]: any;
};

// @ts-ignore
export interface TypedMap<DataType extends AllowedMap<DataType>>
  extends Map<string, any> {
  toJS(): DataType;
  get<K extends keyof DataType>(key: K, notSetValue?: DataType[K]): DataType[K];
  set<K extends keyof DataType>(key: K, value: DataType[K]): this;

  merge<K extends keyof DataType>(
    ...collections: Array<
      Partial<{ [key in keyof AllowedMap<DataType>]: DataType[K] }>
    >
  ): this;
}

function createState<T>(data: T): TypedMap<T> {
  return Map(data as any) as any;
}

export default createState;
