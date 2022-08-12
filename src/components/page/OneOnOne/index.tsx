import { FC, Suspense } from "react";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

export const OneOnOne: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<AppLoading />}>
        <h1>1on1</h1>
      </Suspense>
    </Layout>
  );
};
