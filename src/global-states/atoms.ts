import { atom, useRecoilState } from "recoil";
import { User } from "src/components/utils/libs/firebase/users";

export const currentUserState = atom<User | null>({
  key: "currentUserState",
  default: null,
});

type UseCurrentUserType = {
  currentUser: User | null;
  setCurrentUser: (currentUser: User | null) => void;
};

export const useCurrentUser = (): UseCurrentUserType => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  return { currentUser, setCurrentUser };
};
