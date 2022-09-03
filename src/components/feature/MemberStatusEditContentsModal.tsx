import { FC, useState } from "react";
import { Modal as MantineModal, Select } from "@mantine/core";
import { User } from "src/modules/user";
import { statusData } from "../utils/constants/index";
import { AppButton } from "../ui-libraries/AppButton";

type Props = {
  user: User;
  opened: boolean;
  setOpened: (open: boolean) => void;
  onSave: (uid: string, status: number) => Promise<void>;
};

export type FormData = Omit<User, "uid" | "createdAt" | "id" | "active">;

export const MemberStatusEditContentsModal: FC<Props> = ({ user, opened, setOpened, onSave }) => {
  const [status, setStatus] = useState<number>(user.status);

  return (
    <MantineModal
      opened={opened}
      onClose={() => setOpened(false)}
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
        }}
      />

      <div className="mt-5 w-full text-center">
        <AppButton
          type="button"
          color="blue"
          size="md"
          radius="md"
          variant="filled"
          className=""
          onClick={() => {
            onSave(user.uid, status);
            setOpened(false);
          }}
        >
          保存
        </AppButton>
      </div>
    </MantineModal>
  );
};
