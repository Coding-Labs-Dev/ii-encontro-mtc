export interface Props {
  title: string;
  description: string;
  og?: {
    title: string;
    description: string;
    url: string;
    image: string;
  };
}
