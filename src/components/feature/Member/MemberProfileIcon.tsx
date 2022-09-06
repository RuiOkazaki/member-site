import { Avatar, Text } from "@mantine/core";
import { FC } from "react";

type Props = {
  displayName: string | undefined;
  photoURL: string | undefined;
  style?: string;
};
export const MemberProfileIcon: FC<Props> = ({ displayName, photoURL, style }) => {
  return (
    <div className={style}>
      <Avatar src={photoURL} radius="xl" size={44} className="hover:opacity-80" alt="ゲスト" />
      <Text size="sm" className="w-20  truncate pt-1 text-center">
        {displayName ?? "ゲスト"}
      </Text>
    </div>
  );
};
