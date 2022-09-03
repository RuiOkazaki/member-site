import { FC, useEffect, useState } from "react";
import { MemberStatusEditContentsModal } from "src/components/feature/MemberStatusEditContentsModal";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { AppTable } from "src/components/ui-libraries/AppTable";
import { User } from "src/modules/user";
import { useFetchUserList } from "src/hooks/user/useFetchUserList";

const memberStatus = (status: number) => {
  switch (status) {
    case 1:
      return "✅ 登録済み";
    case 2:
      return "❌ 退会";
    default:
      return "📝 未登録";
  }
};

type StatusProps = {
  status: number;
  user: User;
};
const Status: FC<StatusProps> = ({ status, user }) => {
  const [statusModalOpened, setStatusModalOpened] = useState<boolean>(false);

  const handleOpen = () => {
    setStatusModalOpened(!statusModalOpened);
  };

  return (
    <>
      <div onClick={handleOpen}>{memberStatus(status)}</div>
      <MemberStatusEditContentsModal user={user} opened={statusModalOpened} setOpened={handleOpen} />
    </>
  );
};

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
      name: user.displayName ?? "",
      email: user.email ?? "",
      status: <Status status={user.status} user={user} />,
    };
  });

  if (memberArray === undefined) return <AppLoading />;
  if (isLoading || userList == null) return <AppLoading />;

  return <AppTable header={TABLE_HEADER} body={memberArray} />;
};
