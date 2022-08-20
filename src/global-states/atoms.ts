import { atom, useRecoilState } from "recoil";

export type CurrentUser = {
  active: boolean | undefined;
  bio: string;
  createdAt: Date;
  displayName: string | undefined;
  email: string | undefined;
  faculty: string | null;
  field: string | null;
  fieldDetails: Array<string> | undefined;
  github: string | undefined;
  grade: string | null;
  instagram: string | undefined;
  photoURL: string;
  position: number;
  status: number;
  twitter: string | undefined;
  uid: string;
  university: string;
};

export const currentUserState = atom<CurrentUser | null>({
  key: "currentUserState",
  default: null,
});

type UseCurrentUserType = {
  currentUser: CurrentUser | null;
  setCurrentUser: (currentUser: CurrentUser | null) => void;
};

export const useCurrentUser = (): UseCurrentUserType => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  return { currentUser, setCurrentUser };
};
