/* eslint-disable @next/next/no-img-element */
import { FC, memo } from "react";
import Link from "next/link";
import { GitHubIcon, TwitterIcon, InstagramIcon } from "src/components/ui-libraries/icon";
import { CurrentUser, useCurrentUser } from "src/global-states/atoms";
import { fieldDetailsData } from "src/components/utils/constants/field";

type UniAndBioProps = {
  bio: string | undefined;
  university: string | undefined;
  faculty: string | undefined | null;
  grade: string | undefined | null;
};
export const UniAndBio: FC<UniAndBioProps> = ({ bio, university, faculty, grade }) => {
  return (
    <div className="py-1 px-2  rounded-lg">
      <div className="flex">
        <div className="flex flex-col">
          <p className="font-bold text-gray-400">uni</p>
          <p>{university}</p>
        </div>
        <div className="px-2">
          <p className="font-bold text-gray-400">faculty</p>
          <p>{faculty}</p>
        </div>
        <div className="px-2">
          <p className="font-bold text-gray-400">grade</p>
          <span>{grade}</span>
        </div>
      </div>

      <div className="mt-2">
        <p className="font-bold text-gray-400">自己紹介</p>
        <p className="w-full truncate">{bio}</p>
      </div>
    </div>
  );
};

type FieldInterestProps = {
  field: string;
};
const FieldInterest: FC<FieldInterestProps> = ({ field }) => {
  return (
    <div className="py-0.5 px-1 w-28 text-sm font-bold text-center text-white  whitespace-nowrap bg-yellow-500 rounded-full">
      <p>{field}</p>
    </div>
  );
};

type InterestGroupProps = {
  field: string | null | undefined;
  fieldDetails: string[] | undefined;
};
export const InterestGroup: FC<InterestGroupProps> = ({ field, fieldDetails }) => {
  if (!field || !fieldDetails) return null;

  return (
    <div>
      <FieldInterest field={field} />
      <div className="flex flex-wrap items-center mt-1 w-48">
        {fieldDetails.map((fieldDetail, index) => {
          return (
            <div className="flex justify-center items-center" key={index}>
              {fieldDetailsData.map((fieldDetailData) => {
                if (fieldDetailData.value === fieldDetail) {
                  return (
                    <span
                      className="flex justify-center items-center mx-1 w-2 h-2 rounded-full"
                      key={fieldDetailData.value}
                      style={{ backgroundColor: fieldDetailData.color }}
                    ></span>
                  );
                }
              })}
              <p className="p-1">{fieldDetail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type LinkComponentProps = {
  github: string | undefined;
  twitter?: string;
  instagram?: string;
};
export const LinkComponent: FC<LinkComponentProps> = ({ github, twitter, instagram }) => {
  return (
    <div className="flex justify-between px-2 w-[120px]">
      <Link href={`https://github.com/${github}`}>
        <a>
          <GitHubIcon />
        </a>
      </Link>
      <Link href={`https://twitter.com/${twitter}`}>
        <a>
          <TwitterIcon />
        </a>
      </Link>
      <Link href={`https://instagram.com/${instagram}`}>
        <a>
          <InstagramIcon />
        </a>
      </Link>
    </div>
  );
};

type RibbonProps = { position: number };
const Ribbon: FC<RibbonProps> = ({ position }) => {
  const positionTitle = (position: number) => {
    if (position === 3) return "副代表";
    if (position === 4) return "代表";
    if (position === 5) return "副会長";
    if (position === 6) return "会長";
  };
  return (
    <>
      <div className="w-24 text-center bg-gradient-to-r from-pink-200 via-yellow-200 to-green-200">
        <h1 className="font-serif text-lg font-extrabold">{positionTitle(position)}</h1>
      </div>
    </>
  );
};

type ProfileProps = { size: number; isAdmin?: boolean };
const Profile: FC<ProfileProps> = memo(({ size, isAdmin }) => {
  const { currentUser } = useCurrentUser();
  return (
    <div className="flex flex-col justify-center items-center">
      {isAdmin ? (
        <>
          <div className="flex justify-center items-center p-1 bg-gradient-to-r from-pink-200 via-yellow-200 to-green-200 rounded-full">
            <img
              src={currentUser?.photoURL}
              alt={`${currentUser?.displayName}の画像`}
              className={`rounded-full w-${size} h-${size}`}
            />
          </div>
          <p className="pt-1 text-lg font-bold text-center">{currentUser?.displayName}</p>
        </>
      ) : (
        <>
          <img
            src={currentUser?.photoURL}
            alt={`${currentUser?.displayName}の画像`}
            className={`rounded-full w-${size}`}
          />
          <p className="pt-1 text-sm font-bold text-center">{currentUser?.displayName}</p>
        </>
      )}
    </div>
  );
});
Profile.displayName = "Profile";

type ProfileImgProps = {
  displayName: string | undefined;
  photoURL: string | undefined;
};
export const ProfileImg: FC<ProfileImgProps> = ({ displayName, photoURL }) => {
  return (
    <div>
      <img src={photoURL} alt={`${displayName}の画像`} className={`rounded-full w-12`} />
      <p className="pt-1 text-xs ">{displayName}</p>
    </div>
  );
};

type AdminCardProps = Omit<CurrentUser, "uid" | "createdAt" | "email">;

export const ComitteeCard: FC<AdminCardProps> = memo(({ field, position, fieldDetails }) => {
  return (
    <div className="relative py-6 px-4 bg-white hover:bg-slate-50 rounded-md shadow-md hover:cursor-pointer">
      <div className="flex flex-col justify-center items-center">
        <Ribbon position={position} />
        <div className="items-center pt-2">
          <Profile size={24} isAdmin />
        </div>
      </div>
      <div className="px-2">
        <InterestGroup field={field} fieldDetails={fieldDetails} />
      </div>
    </div>
  );
});
ComitteeCard.displayName = "ComitteeCard";

export const ActiveMemberCard = () => {
  return (
    <div className="relative py-6 px-4  w-[36em] bg-white hover:bg-gray-50 rounded-md shadow-md">
      <div className="grid grid-cols-5 grid-flow-row">
        <div className="flex flex-col justify-between items-center">
          <Profile size={16} isAdmin={false} />
          <FieldInterest field="フロントエンド" />
        </div>
      </div>
    </div>
  );
};

type MemberCardProps = { data: Pick<CurrentUser, "displayName" | "photoURL" | "uid"> };
export const MemberCard: FC<MemberCardProps> = ({ data }) => {
  if (!data) return null;
  return (
    <Link href={`member/${data.uid}`} className="cursor-pointer">
      <a>
        <ProfileImg displayName={data.displayName} photoURL={data?.photoURL} />
      </a>
    </Link>
  );
};
