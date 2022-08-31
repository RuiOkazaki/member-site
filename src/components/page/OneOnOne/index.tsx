import { FC, Suspense } from "react";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

export const OneOnOne: FC = () => {
  return (
    <Suspense fallback={<AppLoading />}>
      <h1>1on1</h1>
    </Suspense>
  );
};
