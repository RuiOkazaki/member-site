import { Table } from "@mantine/core";
import { FC, useCallback, useEffect } from "react";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { useFetchUserList } from "src/hooks/user/useFetchUserList";

export const Admin: FC = () => {
  const { fetchUser, userList, isLoading } = useFetchUserList();

  useEffect(() => {
    fetchUser();
  }, []);

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

  if (userList == null || isLoading) return <AppLoading />;

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
        {userList.map((user) => {
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
