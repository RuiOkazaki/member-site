import { FC } from "react";

type Props = {
  displayName: string | undefined;
  photoURL: string | undefined;
};
export const ProfileImg: FC<Props> = ({ displayName, photoURL }) => {
  return (
    <div>
      <img src={photoURL} alt={`${displayName}の画像`} className={`h-12 w-12 rounded-full`} />
      <p className="pt-1 text-xs ">{displayName}</p>
    </div>
  );
};
