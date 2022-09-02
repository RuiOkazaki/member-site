import { Table } from "@mantine/core";
import { FC, ReactNode, useEffect, useState } from "react";
import { MemberStatusEditContentsModal } from "src/components/feature/MemberStatusEditContentsModal";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { User } from "src/components/utils/libs/firebase/index";
import { useFetchMembers } from "src/hooks/user/useFetchUserList";

const TABLE_HEADER = {
  name: "Name",
  email: "Email",
  status: "Status",
};

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

type Props = {
  header: typeof TABLE_HEADER;
  body: {
    name: string;
    email: string;
    status: ReactNode;
  }[];
};

const TableComponent: FC<Props> = ({ header, body }) => {
  return (
    <Table>
      <thead>
        <tr>
          {Object.values(header).map((value) => {
            return <th key={value}>{value}</th>;
          })}
        </tr>
      </thead>

      <tbody>
        {body.map((obj, i) => {
          return (
            <tr key={i}>
              {Object.values(obj).map((value, i) => {
                return <td key={i}>{value}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export const Admin: FC = () => {
  const { fetchUser, userList, isLoading } = useFetchMembers();

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

  return (
    <>
      <TableComponent header={TABLE_HEADER} body={memberArray} />
    </>
  );
};
