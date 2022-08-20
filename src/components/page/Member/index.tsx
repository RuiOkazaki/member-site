import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect, FC, Suspense } from "react";
import { Text } from "@mantine/core";
import { ComitteeCard, MemberCard } from "src/components/feature/MemberCard/MemberCard";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { db } from "src/components/utils/libs/firebase";
import { CurrentUser, useCurrentUser } from "src/global-states/atoms";

export const Member: FC = () => {
  const [users, setUsers] = useState<CurrentUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useCurrentUser();
  const myField = currentUser?.field;

  useEffect(() => {
    try {
      const getUsers = async () => {
        const colRef = collection(db, "users");
        const users = await getDocs(colRef);
        setUsers(users.docs.map((doc) => doc.data() as CurrentUser));
      };
      getUsers();
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <Layout>
      <Suspense fallback={<AppLoading />}></Suspense>
      <div className="flex w-full flex-col flex-wrap gap-5">
        <div className="pt-5">
          <Text weight="bold">コミッティー</Text>
          <div className="flex flex-wrap gap-5">
            {users
              .filter((user) => {
                const isDistinctLeaderPosition = user.position === 3 || user.position === 4 || user.position === 5;
                return isDistinctLeaderPosition;
              })
              .map((user) => (
                <ComitteeCard key={user.displayName} {...user} />
              ))}
          </div>
        </div>
        <div>
          {myField && (
            <>
              <Text weight="bold">{myField}を専門としているメンバー</Text>
              <div className="flex gap-2 rounded-md bg-white py-6 px-4 text-center font-bold shadow-md">
                {users
                  .filter((user) => user.field === myField && user.uid !== currentUser.uid)
                  .map((user) => {
                    return <MemberCard key={user.displayName} data={user} />;
                  })}
              </div>
            </>
          )}
        </div>

        <Text weight="bold">全員</Text>
        <div className="flex gap-2 rounded-md bg-white py-6 px-4 text-center font-bold shadow-md">
          {users.map((user, index) => {
            return <MemberCard data={user} key={index} />;
          })}
        </div>
      </div>
    </Layout>
  );
};
