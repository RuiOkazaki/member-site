import { FC, useState } from "react";
import { User } from "src/modules/user";
import { MemberStatusEditContentsModal } from "./MemberStatusEditContentsModal";

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
  onSave: (uid: string, status: number) => Promise<void>;
};
export const Status: FC<Props> = ({ status, user, onSave }) => {
  const [statusModalOpened, setStatusModalOpened] = useState<boolean>(false);

  const handleOpen = () => {
    setStatusModalOpened(!statusModalOpened);
  };

  return (
    <>
      <div onClick={handleOpen}>{memberStatus(status)}</div>
      <MemberStatusEditContentsModal user={user} opened={statusModalOpened} setOpened={handleOpen} onSave={onSave} />
    </>
  );
};
