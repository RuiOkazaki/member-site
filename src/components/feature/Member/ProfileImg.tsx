import { Avatar } from "@mantine/core";
import { FC } from "react";

type Props = {
  displayName: string | undefined;
  photoURL: string | undefined;
};
export const ProfileImg: FC<Props> = ({ displayName, photoURL }) => {
  return (
    <div>
      <Avatar src={photoURL} radius="xl" size={44} className="hover:opacity-80" alt="ゲスト" />
      <p className="pt-1 text-xs ">{displayName}</p>
    </div>
  );
};
