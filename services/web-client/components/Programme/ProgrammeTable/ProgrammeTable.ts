export type Dates = Array<{
  location: string;
  date: string;
}>;

export type Schedule = Array<{
  startTime: string;
  endTime?: string;
  speaker?: string;
  description:
    | string
    | Array<{
        location: string;
        description: string;
        speaker: string;
      }>;
}>;

export interface Props {
  dates: Dates;
  schedule: Schedule;
}
