import { FC } from "react";
import { Text } from "@mantine/core";
import { useRouter } from "next/router";
import { AppButton } from "src/components/ui-libraries/AppButton";
import { useCurrentUser } from "src/global-states/atoms";

type Props = {
  step: number;
  setStep: (step: number) => void;
};
export const Step4: FC<Props> = ({ step, setStep }) => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const isDisabled = currentUser?.status === 0;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Text weight="bold" className="text-center" size="xl">
          お疲れ様でした👏
        </Text>
        <p className="text-8xl">🦔</p>
        <br />
        <br />
        <br />
        <AppButton
          color="blue"
          radius="sm"
          size="sm"
          className=""
          type="button"
          onClick={() => router.push("/")}
          disabled={isDisabled}
        >
          ルートへ
        </AppButton>
        <br />
        <Text size="sm" color="red" className="text-center">
          承認されると、ボタンが押せるようになります🫡
        </Text>
      </div>

      <div className="mt-auto flex items-center justify-center">
        <AppButton size="xs" type="button" color="gray" variant="light" radius="xs" onClick={() => setStep(step - 1)}>
          戻る
        </AppButton>
      </div>
    </>
  );
};
