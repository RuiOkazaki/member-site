import { FC } from "react";
import { Text } from "@mantine/core";
import { AppButton } from "src/components/ui-libraries/AppButton";

type Step4Props = {
  step: number;
  setStep: (step: number) => void;
};
export const Step4: FC<Step4Props> = ({ step, setStep }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Text weight="bold" className="text-center" size="xl">
          お疲れ様でした👏
        </Text>
        <br />
        <br />
        <br />
        <p className="text-8xl">🦔</p>
      </div>

      <div className="mt-auto flex items-center justify-center">
        <AppButton size="xs" type="button" color="gray" variant="light" radius="xs" onClick={() => setStep(step - 1)}>
          戻る
        </AppButton>
      </div>
    </>
  );
};

// todo: slackに飛ばすボタンを追加する
