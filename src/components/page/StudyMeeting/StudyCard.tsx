import { collection, getDocs } from "firebase/firestore";
import { Card, Group, Text } from "@mantine/core";
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
      <Card shadow="sm" p="sm" radius="md" withBorder className="flex flex-col hover:cursor-pointer">
        <Card.Section className="flex items-center justify-center">
          <img src={photoUrl} alt={title} className="h-[10rem]" />
        </Card.Section>

        <div>
          <Group mt="md" mb="xs" className="block">
            <Text weight={500} className="w-full truncate">
              {title}
            </Text>
          </Group>

          <Group position="apart" mb="xs">
            <Text size="sm" weight={500} color="gray">
              {year}.{monthAndDate}.{time}
            </Text>
            <FieldInterest field={field} size="xs" />
          </Group>

          <Group className="flex">
            <Text size="sm" weight={500} color="gray" className="hidden sm:block">
              主催者
            </Text>
            <ProfileImg displayName={organizer?.displayName} photoURL={organizer?.photoURL} />
          </Group>
        </div>
      </Card>
    </Link>
  );
};
