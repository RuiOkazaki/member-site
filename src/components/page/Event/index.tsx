import { collection, getDocs } from "firebase/firestore";
import { Text } from "@mantine/core";
import { FC, Suspense, useEffect, useState } from "react";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { CurrentUser, EventType } from "src/components/utils/libs/firebase/index";
import { db } from "src/components/utils/libs/firebase";
import { useCurrentUser } from "src/global-states/atoms";
import { BoxWithText } from "src/components/ui-libraries/BoxWithText";
import { FieldInterest } from "src/components/feature/MemberCard/FieldInterest";
import { ProfileImg } from "src/components/feature/MemberCard/ProfileImg";

type EventCardProps = Omit<EventType, "materials" | "participantsUuid"> & { isEmpty?: boolean };
export const EventCard: FC<EventCardProps> = ({ date, field, organizerUuid, photoUrl, title, isEmpty }) => {
  const timeStamp = { date };
  const fullDate = new Date(timeStamp.date.seconds * 1000).toLocaleString("ja-JP");
  const year = fullDate.slice(0, 4);
  const monthAndDate = fullDate.slice(5, 8);
  const time = fullDate.slice(9, 14);

  // organizerの情報を取得
  const [organizer, setOrganizer] = useState<CurrentUser>();
  useEffect(() => {
    const getOrganizer = async () => {
      const colRef = collection(db, "users");
      const users = await getDocs(colRef);
      const organizer = users.docs.map((doc) => doc.data()).find((user) => user.uid === organizerUuid);
      setOrganizer(organizer as CurrentUser);
    };
    getOrganizer();
  }, [organizerUuid]);

  return (
    <BoxWithText
      title={title}
      content={
        <div>
          {isEmpty ?? <img src={photoUrl} alt={title} className="w-[25rem] rounded" />}
          <div className="flex gap-4">
            <Text size="sm" weight="bold" color="gray">
              {year}.{monthAndDate}.{time}
            </Text>
            <FieldInterest field={field} />
          </div>
          <div>
            <p>主催者</p>
            <ProfileImg displayName={organizer?.displayName} photoURL={organizer?.photoURL} />
          </div>
        </div>
      }
    />
  );
};

export const Event: FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentUser } = useCurrentUser();

  // currentUserのuidを取得
  // ・参加したイベント→participantsUuidにcurrentUserのuidがあれば、そのイベントを表示
  const myUuid = currentUser?.uid;

  // 勉強会資料を取得
  useEffect(() => {
    try {
      const getEvents = async () => {
        const colRef = collection(db, "study-meeting");
        const events = await getDocs(colRef);
        const newEvents = events.docs.map((doc) => doc.data() as EventType);
        setEvents(newEvents);
      };
      getEvents();
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <Layout>
      <Suspense fallback={<AppLoading />}></Suspense>
      <Text component="span" align="center" size="xl" weight={700}>
        イベント
      </Text>
      <div>
        {events.map((event, index) => {
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
    </Layout>
  );
};

// todo: firestoreに保存する時に、画像のレイアウトを整えてから保存する
