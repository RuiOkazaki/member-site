import Router from "next/router";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Layout } from "src/components/layout";
import { db } from "src/components/utils/libs/firebase";
import { CurrentUser } from "src/global-states/atoms";
import { InterestGroup, LinkComponent, ProfileImg, UniAndBio } from "src/components/feature/MemberCard/MemberCard";

const MemberDetailPage = () => {
  const [user, setUser] = useState<CurrentUser>();
  const [isLoading, setIsLoading] = useState(true);

  const uid = Router.query.id;
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
  }, [isLoading, uid, user]);
  return (
    <Layout>
      <ProfileImg displayName={user?.displayName} photoURL={user?.photoURL} />
      <InterestGroup field={user?.field} fieldDetails={user?.fieldDetails} />
      <LinkComponent github={user?.github} twitter={user?.twitter} instagram={user?.instagram} />
      <UniAndBio bio={user?.bio} university={user?.university} faculty={user?.faculty} grade={user?.grade} />
    </Layout>
  );
};
export default MemberDetailPage;
