export type Event = {
  date: {
    seconds: number;
    nanoseconds: number;
  };
  field: string;
  materials: [
    {
      content: string;
      presenterUuid: string;
      title: string;
    }
  ];
  organizerUuid: string;
  participantsUuid: string[];
  photoUrl: string;
  title: string;
};
