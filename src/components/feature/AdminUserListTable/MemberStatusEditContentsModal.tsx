import { FC, useState } from "react";
import { Modal as MantineModal, Select } from "@mantine/core";
import { doc, DocumentReference, updateDoc } from "firebase/firestore";
import { User } from "src/modules/user";
import { db } from "src/components/utils/libs/firebase";
import { statusData } from "src/components/utils/constants";
import { AppButton } from "src/components/ui-libraries/AppButton";

type Props = {
  user: User;
  opened: boolean;
  setOpened: () => void;
  onSave: (uid: string, status: number) => Promise<void>;
};

export type FormData = Omit<User, "uid" | "createdAt" | "id" | "active">;

export const MemberStatusEditContentsModal: FC<Props> = ({ user, opened, setOpened, onSave }) => {
  const [status, setStatus] = useState<number>(user.status);

  const userRef = doc(db, "users", user.uid) as DocumentReference<User>;

  const handleSave = async () => {
    await updateDoc(userRef, { status });
    setStatus(status);
    setOpened();
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
        value={String(status)}
        dropdownComponent="div"
        onChange={(e) => {
          setStatus(Number(e));
          onSave(user.uid, Number(e));
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
