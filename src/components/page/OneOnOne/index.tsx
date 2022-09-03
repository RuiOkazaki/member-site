import { FC, Suspense } from "react";
import { UnderConstruction } from "src/components/feature/UnderConstruction";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

export const OneOnOne: FC = () => {
  return (
    <Suspense fallback={<AppLoading />}>
      <UnderConstruction />
    </Suspense>
  );
};
