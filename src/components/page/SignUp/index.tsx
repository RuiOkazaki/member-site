import { FC, useState, Suspense } from "react";
import { Layout } from "src/components/layout";
import { useCurrentUser } from "src/global-states/atoms";
import { AppLoading } from "src/components/ui-libraries/AppLoading";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { StepCircle } from "./StepCircle";

export const SignUp: FC = () => {
  const [step, setStep] = useState<number>(1);
  const { currentUser, setCurrentUser } = useCurrentUser();

  if (!currentUser) return null;

  const switchDisplayStep = (step: number) => {
    switch (step) {
      case 1:
        return <Step1 step={step} setStep={setStep} />;
      case 2:
        return <Step2 currentUser={currentUser} setCurrentUser={setCurrentUser} setStep={setStep} step={step} />;
      case 3:
        return <Step3 step={step} setStep={setStep} />;
      case 4:
        return <Step4 step={step} setStep={setStep} />;
    }
  };

  return (
    <Layout>
      <Suspense fallback={<AppLoading />}>
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex w-4/5 flex-col items-center rounded  bg-gray-50 p-4 lg:w-2/5">
            <StepCircle step={step} />

            {/* h-[30rem]・flex-col・AppButtonのmt-autoでボタンを下に配置している */}
            <div className="mt-4 flex h-[32rem] flex-col">{switchDisplayStep(step)}</div>
          </div>
        </div>
      </Suspense>
    </Layout>
  );
};
