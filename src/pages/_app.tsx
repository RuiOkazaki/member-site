import "src/styles/globals.css";

import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { FC, useEffect, useState } from "react";
import { AuthProvider } from "src/components/ui-libraries/AuthProvider";
import { AuthModal } from "src/components/feature/AuthModal";
import { LINKS, TECH_UNI } from "src/components/utils/constants/index";

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
  }, []);

  if (!password) return <AuthModal opened={opened} setOpened={setOpened} />;

  if (router.pathname === LINKS.LOGIN) {
    return <Component {...pageProps} />;
  }

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;

// 承認待ちのコンポーネントを条件分岐で表示
