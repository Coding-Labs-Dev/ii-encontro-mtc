export type Dates = Array<{
  id: string;
  location: string;
  date: string;
}>;

export type Schedule = Array<{
  id: string;
  startTime: string;
  endTime?: string;
  speaker?: string;
  description:
    | string
    | Array<{
        id: string;
        location: string;
        description: string;
        speaker: string;
      }>;
}>;

export interface Props {
  dates: Dates;
  schedule: Schedule;
}
