import "src/styles/globals.css";

import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { FC, useEffect, useState } from "react";
import { AuthProvider } from "src/components/ui-libraries/AuthProvider";
import { AuthModal } from "src/components/feature/AuthModal";
import { TECH_UNI } from "src/components/utils/constants/tokens";
import { LINKS } from "src/components/utils/constants/link";
import { Layout } from "src/components/layout";
import { useCurrentUser } from "src/global-states/atoms";

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  return (
    <RecoilRoot>
      <AppPage Component={Component} pageProps={pageProps} router={router} />
      <Toaster />
    </RecoilRoot>
  );
};

const AppPage: FC<AppProps> = ({ Component, pageProps, router }) => {
  const [opened, setOpened] = useState(false);
  const [password, setPassword] = useState<string | null>(null);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    setPassword(localStorage.getItem(TECH_UNI));
    setOpened(true);
  }, []);

  if (!password) return <AuthModal opened={opened} setOpened={setOpened} />;
  if (router.pathname === LINKS.LOGIN) return <Component {...pageProps} />;
  // if (currentUser?.status !== 2 && router.pathname !== LINKS.SIGNUP && router.pathname !== LINKS.LOGIN) {
  //   return <h1>承認待ちです。</h1>;
  // }

  const isNotAdminUser = currentUser?.position !== 2;
  const isAdminPage = router.pathname === LINKS.ADMIN;
  const isAdminIdPage = router.pathname === LINKS.ADMINID;
  if (isNotAdminUser && (isAdminPage || isAdminIdPage)) {
    router.push(LINKS.HOME);
    // TODO: ここをtoast表示させるようにしたいが今の状態だとレンダリン回数的に4つ表示させるようになってしまう。
    console.log("管理者しか見れません");
  }

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default App;

// 承認待ちのコンポーネントを条件分岐で表示
