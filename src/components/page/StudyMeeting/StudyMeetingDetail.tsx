import { Text } from "@mantine/core";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { FieldInterest } from "src/components/feature/Member/FieldInterest";
import { MemberProfileIcon } from "src/components/feature/Member/MemberProfileIcon";
import { AppLink } from "src/components/ui-libraries/AppLink";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { ChevronLeftIcon } from "src/components/ui-libraries/icon";
import { useFetchEventList } from "src/hooks/event/useFetchEventList";
import { useConvertTimeStamp } from "src/hooks/useConvertTimeStamp";
import { useFetchUserList } from "src/hooks/user/useFetchUserList";
import { Event } from "src/modules/event";
import { User } from "src/modules/user";

export const StudyMeetingDetail: FC = () => {
  const router = useRouter();
  const eventTitle = router.query.title;

  const { fetchEventList, eventList, isLoading } = useFetchEventList();
  const { fetchUser, userList } = useFetchUserList();

  const [thisEvent, setThisEvent] = useState<Event>();
  const { year, monthAndDate, time } = useConvertTimeStamp({ date: thisEvent?.date });

  useEffect(() => {
    fetchEventList();
    fetchUser();

    // todo recoilで管理した方がいいかもしれない
    const setThisEventFunc = () => {
      const thisEvent = eventList?.find((event) => event.title === eventTitle);
      setThisEvent(thisEvent);
    };
    setThisEventFunc();
  }, [eventList?.length]);

  const handleBackClick = () => {
    router.back();
  };

  if (!thisEvent) return null;
  if (isLoading || eventList == null) return <AppLoading />;

  return (
    <div className="mb-10">
      <button className="relative top-0 left-0 cursor-pointer py-2" onClick={handleBackClick}>
        <ChevronLeftIcon />
      </button>

      <div className="flex flex-col items-center justify-center gap-8">
        <div>
          <div>
            {thisEvent.photoUrl !== null && (
              <img src={thisEvent.photoUrl} alt={thisEvent.title} className="rounded-lg" />
            )}
          </div>

          <Text size="xl" weight="bold">
            {thisEvent?.title}
          </Text>

          <div className="flex gap-8">
            <Text size="sm" weight="bold" color="gray">
              {year}.{monthAndDate}.{time}
            </Text>
            <FieldInterest field={thisEvent?.field} />
          </div>
        </div>

        <div className="w-full rounded-md bg-gray-100 p-4">
          <Text size="lg" weight="bold">
            登壇者
          </Text>
          {thisEvent.materials.map((material, i) => {
            const presenter = userList?.find((user: User) => user.uid === material.presenterUuid);
            return (
              <div key={i} className={`py-6  ${i === thisEvent.materials.length - 1 ? "" : "border-b"} `}>
                <div className="flex">
                  <MemberProfileIcon displayName={presenter?.displayName} photoURL={presenter?.photoURL} />
                  <Text>{material.title}</Text>
                </div>
                <AppLink href={material.content}>{material.content}</AppLink>
              </div>
            );
          })}
        </div>

        <div className="w-full rounded-md bg-gray-100 p-4">
          <Text size="lg" weight="bold">
            参加者
          </Text>
          <div className="flex">
            {thisEvent.participantsUuid.map((participantUud, i) => {
              const user = userList?.find((user: User) => user.uid === participantUud);
              return <MemberProfileIcon key={i} displayName={user?.displayName} photoURL={user?.photoURL} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
