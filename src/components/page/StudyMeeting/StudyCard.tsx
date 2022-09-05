import { collection, getDocs } from "firebase/firestore";
import { Text } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { db } from "src/components/utils/libs/firebase";
import { FieldInterest } from "src/components/feature/Member/FieldInterest";
import { ProfileImg } from "src/components/feature/Member/ProfileImg";
import { User } from "src/modules/user";
import { Event } from "src/modules/event";
import { useConvertTimeStamp } from "src/hooks/useConvertTimeStamp";

type Props = Omit<Event, "materials" | "participantsUuid">;
export const StudyCard: FC<Props> = ({ date, field, organizerUuid, photoUrl, title }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const { year, monthAndDate, time } = useConvertTimeStamp({ date });

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
    <Link href={`/study-meeting/${title}`}>
      <div className="my-4 rounded-lg bg-white shadow-md hover:cursor-pointer hover:opacity-80">
        <div>{photoUrl !== null && <img src={photoUrl} alt={title} className="w-[25rem] rounded" />}</div>

        <div className="flex flex-col gap-2 p-4">
          <Text size="md" weight="bold">
            {title}
          </Text>

          <div className="flex justify-between">
            <Text size="sm" weight="bold" color="gray">
              {year}.{monthAndDate}.{time}
            </Text>
            <FieldInterest field={field} />
          </div>

          <div className="flex items-center gap-4">
            <Text weight="bold" color="gray">
              主催者
            </Text>
            <ProfileImg displayName={organizer?.displayName} photoURL={organizer?.photoURL} />
          </div>
        </div>
      </div>
    </Link>
  );
};
