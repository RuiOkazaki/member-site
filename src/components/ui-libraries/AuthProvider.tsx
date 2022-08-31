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
  if (!currentUser) {
    router.push(LINKS.LOGIN);
    return null;
  }

  const isNotAdminUser = currentUser?.position <= 1;
  const isAdminPage = router.pathname === LINKS.ADMIN;
  const isAdminIdPage = router.pathname === LINKS.ADMINID;
  if (isNotAdminUser && (isAdminPage || isAdminIdPage)) {
    router.push(LINKS.HOME);
    // TODO: ここをtoast表示させるようにしたいが今の状態だとレンダリン回数的に4つ表示させるようになってしまう。
    console.log("管理者しか見れません");
    return null;
  }

  return <div>{children}</div>;
};
