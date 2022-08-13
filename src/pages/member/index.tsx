import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Text } from "@mantine/core";
import { ComitteeCard, MemberCard } from "src/components/feature/MemberCard/MemberCard";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { db } from "src/components/utils/libs/firebase";
import { CurrentUser } from "src/global-states/atoms";

const Member = () => {
  const [users, setUsers] = useState<CurrentUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // todo ここに、自分のデータのfieldを取得して入れる
  const myField = "フロントエンド";

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

  if (isLoading) return <AppLoading />;

  return (
    <Layout>
      <div className="flex flex-col flex-wrap gap-5 w-full">
        <div className="pt-5">
          <Text weight="bold">コミッティー</Text>
          <div className="flex flex-wrap gap-5">
            {users
              .filter((user) => user.position === 3 || user.position === 4 || user.position === 5)
              .map((user) => (
                <ComitteeCard key={user.displayName} {...user} />
              ))}
          </div>
        </div>
        <div>
          <Text weight="bold">{myField}を専門としているメンバー</Text>
          <div className="flex gap-2 py-6 px-4 font-bold text-center bg-white rounded-md shadow-md">
            {users
              .filter((user) => user.field === myField)
              .map((user) => {
                return <MemberCard key={user.displayName} data={user} />;
              })}
          </div>
        </div>

        <Text weight="bold">全員</Text>
        <div className="flex gap-2 py-6 px-4 font-bold text-center bg-white rounded-md shadow-md">
          {users.map((user, index) => {
            return (
              <div key={index}>
                <MemberCard data={user} />
              </div>
            );
          })}
        </div>
        <h1>Member</h1>
        <p>上に検索バー・分野・学年で絞れるようにする</p>
        <p>自分の興味のある分野を専門としているメンバー一覧</p>
        <p>それぞれ閉じるボタンをつけれるようにする。</p>
      </div>
    </Layout>
  );
};
export default Member;
