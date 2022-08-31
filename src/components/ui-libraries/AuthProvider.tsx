import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { useCurrentUser } from "src/global-states/atoms";
import { User } from "src/components/utils/libs/firebase/index";
import { LINKS } from "../utils/constants/link";
import { UID } from "../utils/constants/tokens";
import { db } from "../utils/libs/firebase";
import { AppLoading } from "./AppLoading";

type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const uid: string | null = localStorage.getItem(UID);
    if (!uid) {
      // uidがない場合は、ログインしていないと判断して、ログイン画面にリダイレクトする
      router.push(LINKS.LOGIN);
      return;
    }
    const docRef = doc(db, "users", uid);
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          setCurrentUser(doc.data() as User);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSignUpPage = router.pathname === LINKS.SIGNUP;
  const isApproved = currentUser?.status === 1;
  if (isApproved && isSignUpPage) {
    router.push(LINKS.HOME);
  }
  if (!isApproved && !isSignUpPage) {
    router.push(LINKS.SIGNUP);
  }

  if (isLoading) return <AppLoading />;
  if (!currentUser) {
    // currentUserがない場合は、ログインしていないと判断して、ログイン画面にリダイレクトする
    router.push(LINKS.LOGIN);
    return null;
  }

  return <div>{children}</div>;
};
