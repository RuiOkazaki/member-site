import { Text } from "@mantine/core";
import { FC, Suspense, useEffect } from "react";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { useCurrentUser } from "src/global-states/atoms";
import { useFetchEventList } from "src/hooks/event/useFetchEventList";
import { StudyCard } from "./StudyCard";

export const StudyMeeting: FC = () => {
  const { fetchEventList, eventList, isLoading } = useFetchEventList();
  const { currentUser } = useCurrentUser();

  // currentUserのuidを取得
  // ・参加したイベント→participantsUuidにcurrentUserのuidがあれば、そのイベントを表示
  const myUuid = currentUser?.uid;

  // 勉強会資料を取得
  useEffect(() => {
    fetchEventList();
  }, []);

  if (isLoading || eventList == null) return <AppLoading />;
  return (
    <Suspense fallback={<AppLoading />}>
      <Text component="span" align="center" size="xl" weight={700}>
        勉強会
      </Text>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {eventList.map((event, i) => {
          return (
            <div key={i} className="col-span-2">
              <StudyCard
                date={event.date}
                field={event.field}
                organizerUuid={event.organizerUuid}
                photoUrl={event.photoUrl}
                title={event.title}
              />
            </div>
          );
        })}
      </div>
    </Suspense>
  );
};
