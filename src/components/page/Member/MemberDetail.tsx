import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Layout } from "src/components/layout";
import { db } from "src/components/utils/libs/firebase";
import { CurrentUser } from "src/global-states/atoms";
import { InterestGroup, MemberSNSLink } from "src/components/feature/MemberCard/MemberCard";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { MemberProfileIcon } from "src/components/feature/MemberCard/MemberProfileIcon";

export const MemberDetail = () => {
  const [user, setUser] = useState<CurrentUser>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      try {
        const getUser = async () => {
          const docRef = doc(db, `users/${router.query.id}`);
          const user = (await getDoc(docRef)).data();
          setUser(user as CurrentUser);
        };
        getUser();
      } finally {
        setIsLoading(false);
      }
    }
  }, [router.query.id]);

  if (isLoading || user == null) return <AppLoading />;

  return (
    <Layout>
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
    </Layout>
  );
};
