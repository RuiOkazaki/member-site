/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

type ProfileImgProps = {
  displayName: string | undefined;
  photoURL: string | undefined;
};

export const MemberProfileIcon: FC<ProfileImgProps> = ({ displayName, photoURL }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={photoURL} alt={`${displayName}の画像`} className="h-12 w-12  rounded-full" />
      <p className="w-20  truncate pt-1 text-center text-xs">{displayName}</p>
    </div>
  );
};
