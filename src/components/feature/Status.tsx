import { FC, useState } from "react";
import { MemberStatusEditContentsModal } from "src/components/feature/MemberStatusEditContentsModal";
import { User } from "src/modules/user";

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

type Props = {
  status: number;
  user: User;
  setUserList: (user: User) => User[];
};
export const Status: FC<Props> = ({ status, user, setUserList }) => {
  const [statusModalOpened, setStatusModalOpened] = useState<boolean>(false);

  const handleOpen = () => {
    setStatusModalOpened(!statusModalOpened);
  };

  return (
    <>
      <div onClick={handleOpen}>{memberStatus(status)}</div>
      <MemberStatusEditContentsModal
        user={user}
        opened={statusModalOpened}
        setOpened={handleOpen}
        setUserList={setUserList}
      />
    </>
  );
};
