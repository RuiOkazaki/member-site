import { useRouter } from "next/router";
import { useEffect } from "react";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { MemberProfileIcon } from "src/components/feature/Member/MemberProfileIcon";
import { InterestGroup, MemberSNSLink } from "src/components/feature/Member/MemberCard";
import { useFetchUser } from "src/hooks/user/useFetchUser";

export const MemberDetail = () => {
  const { fetchUser, user, isLoading } = useFetchUser();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      fetchUser(router.query.id as string);
    }
  }, [router.query.id]);

  if (isLoading || user == null) return <AppLoading />;

  return (
    <>
      <MemberProfileIcon displayName={user.displayName} photoURL={user.photoURL} />
      <InterestGroup field={user?.field} fieldDetails={user?.fieldDetails} />
      <MemberSNSLink github={user?.github} twitter={user?.twitter} instagram={user?.instagram} />
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
      </div>
    </>
  );
};
