import { FC, useEffect } from "react";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { AppTable } from "src/components/ui-libraries/AppTable";
import { useFetchUserList } from "src/hooks/user/useFetchUserList";
import { Status } from "src/components/feature/Status";

const TABLE_HEADER = {
  name: "Name",
  email: "Email",
  status: "Status",
};

export const Admin: FC = () => {
  const { fetchUser, userList, isLoading } = useFetchUserList();

  useEffect(() => {
    fetchUser();
  }, []);

  const memberArray = userList?.map((user) => {
    return {
      name: user.displayName,
      email: user.email,
      status: <Status status={user.status} user={user} />,
    };
  });

  if (memberArray === undefined) return <AppLoading />;
  if (isLoading || userList == null) return <AppLoading />;

  return <AppTable header={TABLE_HEADER} body={memberArray} />;
};
