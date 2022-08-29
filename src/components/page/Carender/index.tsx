import { FC, Suspense } from "react";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

export const Calender: FC = () => {
  return (
    <Suspense fallback={<AppLoading />}>
      <h1>Calendar</h1>
    </Suspense>
  );
};
