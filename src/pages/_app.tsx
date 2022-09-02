import "src/styles/globals.css";

import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { FC, useEffect, useState } from "react";
import { AuthProvider } from "src/components/ui-libraries/AuthProvider";
import { AuthModal } from "src/components/feature/AuthModal";
import { TECH_UNI, LINKS } from "src/components/utils/constants/index";
import { Layout } from "src/components/layout";

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

  useEffect(() => {
    setPassword(localStorage.getItem(TECH_UNI));
    setOpened(true);
  }, [opened]);

  if (!password) return <AuthModal opened={opened} setOpened={setOpened} />;
  if (router.pathname === LINKS.LOGIN) return <Component {...pageProps} />;
  // if (currentUser?.status === 0 && router.pathname !== LINKS.SIGNUP && router.pathname !== LINKS.LOGIN) {
  //   return <h1>承認待ちです。</h1>;
  // }

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
