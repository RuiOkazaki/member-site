import Router from "next/router";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Layout } from "src/components/layout";
import { db } from "src/components/utils/libs/firebase";
import { CurrentUser } from "src/global-states/atoms";
import { InterestGroup, ProfileImg } from "src/components/feature/MemberCard/MemberCard";

const MemberDetailPage = () => {
  const [user, setUser] = useState<CurrentUser>();
  const [isLoading, setIsLoading] = useState(true);

  const uid = Router.query.id;
  // todo この取得の仕方大丈夫そ？？
  useEffect(() => {
    try {
      const getUser = async () => {
        const docRef = doc(db, `users/${uid}`);
        const user = await (await getDoc(docRef)).data();
        setUser(user as CurrentUser);
      };
      getUser();
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, uid]);

  return (
    <Layout>
      <ProfileImg displayName={user?.displayName} photoURL={user?.photoURL} />
      <InterestGroup field={user?.field} fieldDetails={user?.fieldDetails} />
    </Layout>
  );
};
export default MemberDetailPage;

// uidのデータを取得してそのデータを表示する
