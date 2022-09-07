import { FC, Suspense } from "react";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { AppUnderConstruction } from "src/components/ui-libraries/AppUnderConstruction";

export const OneOnOne: FC = () => {
  return (
    <Suspense fallback={<AppLoading />}>
      <AppUnderConstruction className="flex h-full  flex-col items-center justify-center" />
    </Suspense>
  );
};
