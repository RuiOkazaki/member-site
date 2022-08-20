export type EventType = {
  date: {
    seconds: number;
    nanoseconds: number;
  };
  field: string;
  materials: {
    content: string;
    presenterUuid: string;
    title: string;
  };
  organizerUuid: string;
  participantsUuid: [];
  photoUrl: string;
  title: string;
};
