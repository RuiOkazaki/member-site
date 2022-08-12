import { FC, Suspense } from "react";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

export const Calender: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<AppLoading />}>
        <h1>Calendar</h1>
      </Suspense>
    </Layout>
  );
};
