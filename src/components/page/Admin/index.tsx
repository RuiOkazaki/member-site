import { Table } from "@mantine/core";
import { collection, getDocs } from "firebase/firestore";
import { FC, useCallback, useEffect, useState } from "react";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { db } from "src/components/utils/libs/firebase";
import { User } from "src/components/utils/libs/firebase/index";

export const Admin: FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const getUsers = async () => {
        const usersRef = collection(db, "users");
        const users = await getDocs(usersRef);
        setUsers(users.docs.map((doc) => doc.data() as User));
      };
      getUsers();
    } catch (error) {
      console.log(error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const memberStatus = useCallback((status: number) => {
    switch (status) {
      case 1:
        return "✅ 登録済み";
      case 2:
        return "❌ 退会";
      default:
        return "📝 未登録";
    }
  }, []);

  if (users == null || isLoading) return <AppLoading />;

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <>
              <tr>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{memberStatus(user.status)}</td>
              </tr>
            </>
          );
        })}
      </tbody>
    </Table>
  );
};
