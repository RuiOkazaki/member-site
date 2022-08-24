import { doc, getDoc } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { InterestGroup, MemberSNSLink } from "src/components/feature/Member/MemberCard";
import { MemberProfileIcon } from "src/components/feature/Member/MemberProfileIcon";
import { db } from "src/components/utils/libs/firebase";
import { User } from "src/components/utils/libs/firebase/index";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { Layout } from "src/components/layout";
import { MemberStatusEditContentsModal } from "src/components/feature/MemberStatusEditContentsModal";

export const AdminDetail: FC = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleOpen = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (router.isReady) {
      try {
        const getUser = async () => {
          const docRef = doc(db, `users/${router.query.id}`);
          const user = await getDoc(docRef);
          setUser(user.data() as User);
        };
        getUser();
      } finally {
        setIsLoading(false);
      }
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
      <Layout>
        <MemberProfileIcon displayName={user.displayName} photoURL={user.photoURL} />
        <InterestGroup field={user.field} fieldDetails={user.fieldDetails} />
        <MemberSNSLink github={user.github} twitter={user.twitter} instagram={user?.instagram} />
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
      </Layout>
    </>
  );
};
