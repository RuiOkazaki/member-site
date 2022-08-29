import { FC } from "react";
import { Text } from "@mantine/core";
import Link from "next/link";
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
        <p className="text-8xl">🦔</p>
        <br />
        <br />
        <br />
        {/* ルートへ遷移するリンクを配置する */}
        <Link href="/">
          <a>
            <AppButton color="blue" radius="sm" size="sm" className="w-full" type="button">
              ルートへ
            </AppButton>
          </a>
        </Link>
        <br />
        <Text size="sm" color="red" className="text-center">
          承認されるまで、ルートに遷移することはできません🙏
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

// todo: slackに飛ばすボタンを追加する
