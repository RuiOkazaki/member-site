import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InterestGroup } from "src/components/feature/Member/MemberCard";
import { MemberProfileIcon } from "src/components/feature/Member/MemberProfileIcon";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { MemberStatusEditContentsModal } from "src/components/feature/MemberStatusEditContentsModal";
import { useFetchUser } from "src/hooks/user/useFetchUser";
import { MemberSNSLinks } from "src/components/feature/Member";

export const AdminDetail: FC = () => {
  const { fetchUser, user, isLoading } = useFetchUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleOpen = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (router.isReady) {
      fetchUser(router.query.id as string);
    }
  }, [router.query.id]);

  if (isLoading || user == null) return <AppLoading />;

  const status = () => {
    switch (user.status) {
      case 1:
        return "登録済み";
      case 2:
        return "退会";
      default:
        return "未登録";
    }
  };

  return (
    <>
      <MemberStatusEditContentsModal user={user} opened={isOpen} setOpened={handleOpen} />
      <MemberProfileIcon
        displayName={user.displayName}
        photoURL={user.photoURL}
        style={"flex flex-col items-center justify-center"}
      />
      <InterestGroup field={user.field} fieldDetails={user.fieldDetails} />
      <MemberSNSLinks github={user.github} twitter={user.twitter} instagram={user?.instagram} />
      <div className="rounded-lg py-1 px-2">
        <div className="flex">
          <div className="flex flex-col">
            <p className="font-bold text-gray-400">uni</p>
            <p>{user.university}</p>
          </div>
          <div className="px-2">
            <p className="font-bold text-gray-400">faculty</p>
            <p>{user.faculty}</p>
          </div>
          <div className="px-2">
            <p className="font-bold text-gray-400">grade</p>
            <span>{user.grade}</span>
          </div>
        </div>
        <div className="mt-2">
          <p className="font-bold text-gray-400">自己紹介</p>
          <p className="w-full truncate">{user.bio}</p>
        </div>
        <div
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {status()}
        </div>
      </div>
    </>
  );
};
