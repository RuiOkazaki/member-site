import { FC } from "react";

type ProfileImgProps = {
  displayName: string | undefined;
  photoURL: string | undefined;
  style: string;
};

export const MemberProfileIcon: FC<ProfileImgProps> = ({ displayName, photoURL, style }) => {
  return (
    <div className={style}>
      <img src={photoURL} alt={`${displayName}の画像`} className="w-12 rounded-full" />
      <p className="w-20 truncate pt-1 text-center text-xs">{displayName}</p>
    </div>
  );
};
