export interface Props {
  values: { value: number; singlePayment: boolean }[];
  location: {
    id: string;
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
      name?: string;
      url?: string;
      phone?: string;
      address?: string;
    };
  };
}
