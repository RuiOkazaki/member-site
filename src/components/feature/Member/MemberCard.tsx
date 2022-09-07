/* eslint-disable @next/next/no-img-element */
import { FC, memo } from "react";
import Link from "next/link";
import { fieldDetailsData } from "src/components/utils/constants/index";
import { User } from "src/modules/user";
import { FieldInterest } from "./FieldInterest";
import { MemberProfileIcon } from "./MemberProfileIcon";

type UniAndBioProps = {
  bio: string;
  university: string;
  faculty: string | null;
  grade: string | null;
};
export const UniAndBio: FC<UniAndBioProps> = ({ bio, university, faculty, grade }) => {
  return (
    <div className="rounded-lg py-1  px-2">
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

type InterestGroupProps = {
  field: string | null | undefined;
  fieldDetails: string[] | undefined;
};
export const InterestGroup: FC<InterestGroupProps> = ({ field, fieldDetails }) => {
  if (!field || !fieldDetails) return null;

  return (
    <div className="flex flex-col items-center justify-center">
      <FieldInterest field={field} />
      <div className="mt-1 flex w-44 flex-wrap items-center">
        {fieldDetails.map((fieldDetail, index) => {
          return (
            <div className="flex items-center justify-center" key={index}>
              {fieldDetailsData.map((fieldDetailData) => {
                if (fieldDetailData.value === fieldDetail) {
                  return (
                    <span
                      className="mx-1 flex h-2 w-2 items-center justify-center rounded-full"
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

type RibbonProps = { position: number };
const Ribbon: FC<RibbonProps> = ({ position }) => {
  const positionTitle = (position: number) => {
    switch (position) {
      case 3:
        return "副会長";
      case 4:
        return "代表";
      case 5:
        return "副代表";
      case 6:
        return "会長";
    }
  };
  return (
    <>
      <div className="w-24 bg-gradient-to-r from-pink-200 via-yellow-200 to-green-200 text-center">
        <h1 className="font-serif text-lg font-extrabold">{positionTitle(position)}</h1>
      </div>
    </>
  );
};

type ProfileProps = { size: string; isAdmin?: boolean } & Pick<User, "photoURL" | "displayName">;
const Profile: FC<ProfileProps> = memo(({ size, isAdmin, photoURL, displayName }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {isAdmin ? (
        <>
          <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-pink-200 via-yellow-200 to-green-200 p-1">
            <img src={photoURL} alt={`${displayName}の画像`} className={`rounded-full ${size}`} />
          </div>
          <p className="pt-1 text-center text-lg font-bold">{displayName}</p>
        </>
      ) : (
        <>
          <img src={photoURL} alt={`${displayName}の画像`} className={`rounded-full ${size}`} />
          <p className="pt-1 text-center text-sm font-bold">{displayName}</p>
        </>
      )}
    </div>
  );
});
Profile.displayName = "Profile";

type AdminCardProps = Omit<User, "uid" | "createdAt" | "email">;

export const ComitteeCard: FC<AdminCardProps> = memo(({ field, position, fieldDetails, photoURL, displayName }) => {
  return (
    <div className="relative rounded-md bg-white py-6 px-4 shadow-md hover:cursor-pointer hover:bg-slate-50">
      <div className="flex flex-col items-center justify-center">
        <Ribbon position={position} />
        <div className="items-center pt-2">
          <Profile size={"w-24 h-24"} isAdmin photoURL={photoURL} displayName={displayName} />
        </div>
      </div>
      <div className="px-2">
        <InterestGroup field={field} fieldDetails={fieldDetails} />
      </div>
    </div>
  );
});
ComitteeCard.displayName = "ComitteeCard";

type MemberCardProps = {
  data: Pick<User, "displayName" | "photoURL" | "uid">;
};

export const MemberCard: FC<MemberCardProps> = ({ data }) => {
  return (
    <Link href={`member/${data.uid}`} className="cursor-pointer">
      <a>
        <MemberProfileIcon
          displayName={data.displayName}
          photoURL={data?.photoURL}
          style={"flex flex-col items-center justify-center"}
        />
      </a>
    </Link>
  );
};
