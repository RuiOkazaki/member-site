import { FC } from "react";
import { List, Text } from "@mantine/core";
import { AppButton } from "src/components/ui-libraries/AppButton";

type Props = {
  step: number;
  setStep: (step: number) => void;
};
export const Step1: FC<Props> = ({ step, setStep }) => {
  return (
    <>
      <div className="text-center">
        <Text weight="bold">プログラミング研究会Tech.Uniへようこそ！👏</Text>
        <p className="text-8xl">🦔</p>

        <Text size="sm" weight="bold" className="mt-4">
          これは、Tech.Uniに所属しているメンバーのみが使えるサイトです。
        </Text>
        <br />
        <List withPadding listStyleType="disc" className="text-left text-sm">
          メンバーサイトでは
          <List.Item>自分の興味のあるメンバーを探す</List.Item>
          <List.Item>強強エンジニアに質問する</List.Item>
          <List.Item>1on1の申し込み</List.Item>
          <List.Item>今までの勉強会の資料を閲覧する</List.Item>
          <List.Item>イベントへの参加</List.Item>
          といったように様々なことができます。
        </List>
        <br />
        <Text size="sm">ぜひ有効活用してください！</Text>
      </div>

      <div className="mt-auto flex items-center justify-center">
        <AppButton size="sm" type="button" color="blue" radius="sm" className="" onClick={() => setStep(step + 1)}>
          次へ
        </AppButton>
      </div>
    </>
  );
};
