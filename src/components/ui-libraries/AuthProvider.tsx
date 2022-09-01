import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { useCurrentUser } from "src/global-states/atoms";
import { User } from "src/modules/user";
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

  if (isLoading) return <AppLoading />;

  // currentUserがない場合は、ログインしていないと判断して、loginにリダイレクト
  if (!currentUser) {
    router.push(LINKS.LOGIN);
    return null;
  }

  const isSignUpPage = router.pathname === LINKS.SIGNUP;
  const isAdminPage = router.pathname === LINKS.ADMIN;
  const isAdminIdPage = router.pathname === LINKS.ADMINID;

  const isNotAdminUser = currentUser?.position <= 1;
  const isApproved = currentUser?.status === 1;

  // 承認されていて、signUpページにいる場合は、ホーム画面にリダイレクト
  if (isApproved && isSignUpPage) {
    router.push(LINKS.HOME);
  }

  // 承認されてなくて、signUpページにいない場合は、signUpページにリダイレクト
  if (!isApproved && !isSignUpPage) {
    router.push(LINKS.SIGNUP);
  }

  // adminではないユーザーが、adminページ関連にいる場合は、ホーム画面にリダイレクト
  if (isNotAdminUser && (isAdminPage || isAdminIdPage)) {
    router.push(LINKS.HOME);
    // TODO: toast表示したいがレンダリン回数的に4つ表示してしまう
    console.log("管理者しか見れません");
    return null;
  }

  return <div>{children}</div>;
};
