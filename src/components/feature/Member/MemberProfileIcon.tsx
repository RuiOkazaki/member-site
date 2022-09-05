/* eslint-disable @next/next/no-img-element */
import { Avatar, Text } from "@mantine/core";
import { FC } from "react";

type Props = {
  displayName: string | undefined;
  photoURL: string | undefined;
};

export const MemberProfileIcon: FC<Props> = ({ displayName, photoURL }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Avatar src={photoURL} radius="xl" size={44} className="hover:opacity-80" alt="ゲスト" />
      <Text size="sm" className="w-20  truncate pt-1 text-center">
        {displayName ?? "ゲスト"}
      </Text>
    </div>
  );
};
