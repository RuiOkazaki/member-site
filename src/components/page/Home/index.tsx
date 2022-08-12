import { FC, Suspense } from "react";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

export const Home: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<AppLoading />}></Suspense>
    </Layout>
  );
};
