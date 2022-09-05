import { collection, getDocs } from "firebase/firestore";
import { Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { db } from "src/components/utils/libs/firebase";
import { useCurrentUser } from "src/global-states/atoms";
import { BoxWithText } from "src/components/ui-libraries/BoxWithText";
import { FieldInterest } from "src/components/feature/Member/FieldInterest";
import { ProfileImg } from "src/components/feature/Member/ProfileImg";
import { useFetchEventList } from "src/hooks/event/useFetchEventList";
import { User } from "src/modules/user";
import { Event } from "src/modules/event";

type EventCardProps = Omit<Event, "materials" | "participantsUuid">;
export const EventCard: FC<EventCardProps> = ({ date, field, organizerUuid, photoUrl, title }) => {
  const [loading, setLoading] = useState<boolean>(true);
  // todo: timestamp変換処理リファクタ
  const timeStamp = { date };
  const fullDate = new Date(timeStamp.date.seconds * 1000).toLocaleString("ja-JP");
  const year = fullDate.slice(0, 4);
  const monthAndDate = fullDate.slice(5, 8);
  const time = fullDate.slice(9, 14);

  // organizerの情報を取得
  const [organizer, setOrganizer] = useState<User>();
  useEffect(() => {
    const getOrganizer = async () => {
      const colRef = collection(db, "users");
      const users = await getDocs(colRef);
      const organizer = users.docs.map((doc) => doc.data()).find((user) => user.uid === organizerUuid);
      setOrganizer(organizer as User);
    };
    getOrganizer();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <BoxWithText
      title={title}
      content={
        <div>
          <div className="">
            {photoUrl !== null && <img src={photoUrl} alt={title} className="w-[25rem] rounded" />}
          </div>
          <div className="flex gap-4">
            <Text size="sm" weight="bold" color="gray">
              {year}.{monthAndDate}.{time}
            </Text>
            <FieldInterest field={field} />
          </div>
          <div>
            <Text weight="bold">主催者</Text>
            <ProfileImg displayName={organizer?.displayName} photoURL={organizer?.photoURL} />
          </div>
        </div>
      }
    />
  );
};

export const Events: FC = () => {
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
    <>
      <Text component="span" align="center" size="xl" weight={700}>
        イベント
      </Text>
      <div>
        {eventList.map((event, index) => {
          return (
            <EventCard
              key={index}
              date={event.date}
              field={event.field}
              organizerUuid={event.organizerUuid}
              photoUrl={event.photoUrl}
              title={event.title}
            />
          );
        })}
      </div>
    </>
  );
};

// todo: firestoreに保存する時に、画像のレイアウトを整えてから保存する
