/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

type ProfileImgProps = {
  displayName: string | undefined;
  photoURL: string | undefined;
};

export const MemberProfileIcon: FC<ProfileImgProps> = ({ displayName, photoURL }) => {
  return (
    <div>
      <img src={photoURL} alt={`${displayName}の画像`} className="w-12 rounded-full" />
      <p className="pt-1 text-xs">{displayName}</p>
    </div>
  );
};
