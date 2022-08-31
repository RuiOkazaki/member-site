import { FC, Suspense } from "react";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

export const StudyMeeting: FC = () => {
  return (
    <Suspense fallback={<AppLoading />}>
      <h1>勉強会</h1>
    </Suspense>
  );
};
