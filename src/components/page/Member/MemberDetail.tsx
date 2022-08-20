import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Layout } from "src/components/layout";
import { db } from "src/components/utils/libs/firebase";
import { CurrentUser } from "src/components/utils/libs/firebase/index";
import { InterestGroup, MemberSNSLink, UniAndBio } from "src/components/feature/MemberCard/MemberCard";
import { ProfileImg } from "src/components/feature/MemberCard/ProfileImg";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

export const MemberDetail = () => {
  const [user, setUser] = useState<CurrentUser>();
  const [isLoading, setIsLoading] = useState(true);

  const uid = useRouter().query.id;

  useEffect(() => {
    try {
      const getUser = async () => {
        const docRef = doc(db, `users/${uid}`);
        const user = (await getDoc(docRef)).data();
        setUser(user as CurrentUser);
      };
      getUser();
    } finally {
      setIsLoading(false);
    }
  }, [uid]);

  if (isLoading || user == null) return <AppLoading />;
  return (
    <Layout>
      <ProfileImg displayName={user?.displayName} photoURL={user?.photoURL} />
      <InterestGroup field={user?.field} fieldDetails={user?.fieldDetails} />
      <MemberSNSLink github={user?.github} twitter={user?.twitter} instagram={user?.instagram} />
      <UniAndBio bio={user?.bio} university={user?.university} faculty={user?.faculty} grade={user?.grade} />
    </Layout>
  );
};
