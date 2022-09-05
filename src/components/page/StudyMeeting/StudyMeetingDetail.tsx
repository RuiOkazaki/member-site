import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { ChevronLeftIcon } from "src/components/ui-libraries/icon";
import { useFetchEventList } from "src/hooks/event/useFetchEventList";
import { useConvertTimeStamp } from "src/hooks/useConvertTimeStamp";
import { Event } from "src/modules/event";

export const StudyMeetingDetail: FC = () => {
  const router = useRouter();
  const { fetchEventList, eventList, isLoading } = useFetchEventList();
  const [thisEvent, setThisEvent] = useState<Event>();
  const { year, monthAndDate, time } = useConvertTimeStamp({ date: thisEvent?.date });

  useEffect(() => {
    fetchEventList();
    const eventTitle = router.query.title;
    const event = eventList?.find((event: Event) => event.title === eventTitle);
    setThisEvent(event);
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  if (isLoading || eventList == null) return <AppLoading />;

  return (
    <>
      <button className="relative top-0 left-0 cursor-pointer py-2" onClick={handleBackClick}>
        <ChevronLeftIcon />

        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">{thisEvent?.title}</div>
          <div>
            {year}
            {monthAndDate}
            {time}
          </div>
          <div className="text-lg">{thisEvent?.field}</div>
        </div>
      </button>
    </>
  );
};
