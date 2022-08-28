import { FC, useState } from "react";

import { useCurrentUser } from "src/global-states/atoms";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { StepCircle } from "./StepCircle";

export const SignUp: FC = () => {
  const [step, setStep] = useState<number>(1);
  const { currentUser, setCurrentUser } = useCurrentUser();
  if (!currentUser) return null;

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex w-4/5 flex-col items-center rounded  bg-gray-50 p-4 lg:w-2/5">
          <StepCircle step={step} />

          {/* h-[30rem]・flex-col・AppButtonのmt-autoでボタンを下に配置している */}
          <div className="mt-4 flex h-[32rem] flex-col">
            {step === 1 && <Step1 step={step} setStep={setStep} />}
            {step === 2 && (
              <Step2 currentUser={currentUser} setCurrentUser={setCurrentUser} setStep={setStep} step={step} />
            )}
            {step === 3 && <Step3 step={step} setStep={setStep} />}
            {step === 4 && <Step4 step={step} setStep={setStep} />}
          </div>
        </div>
      </div>
    </>
  );
};
