import { atom, useRecoilState } from "recoil";
import { CurrentUser } from "src/components/utils/libs/firebase/users";

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
