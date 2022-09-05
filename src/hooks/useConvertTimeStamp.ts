type Props = {
  date:
    | {
        seconds: number;
        nanoseconds: number;
      }
    | undefined;
};

type Response = {
  year: string;
  monthAndDate: string;
  time: string;
};

export const useConvertTimeStamp = ({ date }: Props): Response => {
  // todo: StudyMeetingDetailから、undefinedが来るので、それ対策としてした一行を書いたが、これでいいか微妙
  if (date === undefined) return { year: "2021", monthAndDate: "0101", time: "0000" };

  const fullDate = new Date(date.seconds * 1000).toLocaleString("ja-JP");
  const year = fullDate.slice(0, 4);
  const monthAndDate = fullDate.slice(5, 8);
  const time = fullDate.slice(9, 14);

  return { year, monthAndDate, time };
};
