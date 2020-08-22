export interface Speaker {
  id: string;
  name: string;
  description: string;
  international: boolean;
  image: string;
  instagram?: string;
}

export type Speakers = Speaker[];

export interface Programme {
  days: string[];
  dates: Array<Array<{ id: string; location: string; date: string }>>;
  schedule: Array<
    Array<{
      id: string;
      startTime: string;
      endTime: string;
      description:
        | string
        | Array<{
            id: string;
            location: string;
            description: string;
            speaker: string;
          }>;
      speaker?: string;
    }>
  >;
}

export interface Subscriptions {
  values: { value: number; singlePayment: boolean }[];
  installments: {
    date: string;
    utc: string;
    before: number;
    after: number;
  };
  coupon: string;
  locations: Array<{
    id: string;
    slug: string;
    location: string;
    dates: string[];
    hotel?: {
      name: string;
      url: string;
      address: string;
      phone: string;
    };
    event?: {
      atHotel?: boolean;
      name: string;
      url: string;
      phone: string;
      address: string;
    };
  }>;
}

export type Institutes = string[];
export type Sponsors = string[];
