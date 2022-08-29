import { FC } from "react";
import { Text } from "@mantine/core";
import { AppButton } from "src/components/ui-libraries/AppButton";

type Props = {
  step: number;
  setStep: (step: number) => void;
};
export const Step3: FC<Props> = ({ step, setStep }) => {
  return (
    <>
      <Text weight="bold" className="text-center">
        ユーザー登録が完了しました！👏
      </Text>

      <div className="flex h-full  flex-col items-center justify-center pl-5">
        <Text>本当にあなたがTech.Uniメンバーかどうかを、管理者が確認しています。</Text>
        <Text weight="bold">🙇承認されるまで、しばらくお待ちください🙇</Text>
        <br />
        <Text size="sm" color="red">
          ※ 承認に最大1日かかる場合があります。
          <br />
          もし、すぐに承認が欲しい場合、slackで <span className="text-blue-400">@Shin Yamamoto @Yoshiki Naruo</span>
          にメンションを送ってください。
        </Text>
        <br />
        <Text>承認されたら、自動的に画面を見れるようになります！👍</Text>
      </div>

      <div className="mt-auto flex items-center justify-center">
        <AppButton size="xs" type="button" color="gray" variant="light" radius="xs" onClick={() => setStep(step - 1)}>
          戻る
        </AppButton>
        <AppButton size="sm" type="button" color="blue" radius="sm" className="" onClick={() => setStep(4)}>
          次へ
        </AppButton>
      </div>
    </>
  );
};
