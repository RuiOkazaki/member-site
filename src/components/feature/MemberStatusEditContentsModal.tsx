import { FC, useState } from "react";
import { Modal as MantineModal, Select } from "@mantine/core";
import { doc, DocumentReference, updateDoc } from "firebase/firestore";
import { User } from "src/modules/user";
import { db } from "../utils/libs/firebase";
import { statusData } from "../utils/constants/field";
import { AppButton } from "../ui-libraries/AppButton";

type Props = {
  user: User;
  opened: boolean;
  setOpened: () => void;
};

export type FormData = Omit<User, "uid" | "createdAt" | "id" | "active">;

export const MemberStatusEditContentsModal: FC<Props> = ({ user, opened, setOpened }) => {
  const [status, setStatus] = useState<number>(user.status);

  const userRef = doc(db, "users", user.uid) as DocumentReference<User>;

  const handleSave = async () => {
    await updateDoc(userRef, { status });
    setOpened();
  };

  const statusBody = () => {
    switch (user.status) {
      case 1:
        return { status: 1, message: "登録済み" };
      case 2:
        return { status: 2, message: "退会済み" };
      default:
        return { status: 0, message: "未登録" };
    }
  };

  return (
    <MantineModal
      opened={opened}
      onClose={setOpened}
      title="設定"
      size="xl"
      overlayOpacity={0.55}
      overlayBlur={3}
      overflow="inside"
      radius={10}
    >
      <Select
        required
        label="Statusを変更"
        placeholder="選択してください"
        data={statusData}
        className="mt-4"
        value={String(statusBody().status)}
        dropdownComponent="div"
        onChange={(e) => {
          setStatus(Number(e));
        }}
      />

      <div className="mt-5 w-full text-center">
        <AppButton type="button" color="blue" size="md" radius="md" variant="filled" className="" onClick={handleSave}>
          保存
        </AppButton>
      </div>
    </MantineModal>
  );
};

// todo: 最も興味のある分野を選んだら、fieldDetailsが連動するようにする
