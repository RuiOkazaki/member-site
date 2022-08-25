import { FC, useState } from "react";
import { Button, List, Text, Select, Group, Avatar, TextInput, MultiSelect, ScrollArea } from "@mantine/core";
import { TwitterIcon, GitHubIcon, InstagramIcon } from "src/components/ui-libraries/icon";
import { AppButton } from "src/components/ui-libraries/AppButton";
import { useCurrentUser } from "src/global-states/atoms";
import { facultyData, gradeData } from "src/components/utils/constants/university";
import { fieldDetailsData, interestData } from "src/components/utils/constants/field";

type StepCircleProps = {
  step: number;
};
const StepCircle: FC<StepCircleProps> = ({ step }) => {
  const stepArray = [1, 2, 3, 4];
  return (
    <div className="flex items-center gap-1">
      {stepArray.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              step === item ? "text-bold h-8 w-8 bg-blue-500" : "h-5 w-5 bg-gray-300"
            } flex items-center justify-center rounded-full`}
          >
            <Text color="white">{item}</Text>
          </div>
        );
      })}
    </div>
  );
};

const Step1 = () => {
  return (
    <div className="text-center">
      <Text weight="bold">プログラミング研究会Tech.Uniへようこそ！👏</Text>
      <p className="text-8xl">🦔</p>
      <Text size="sm" className="mt-4">
        これは、Tech.Uniに所属しているメンバーのみが使えるサイトです。
      </Text>

      <br />

      <List withPadding listStyleType="disc" className="text-left text-sm">
        メンバーサイトでは
        <List.Item>自分の興味のあるメンバーを探す</List.Item>
        <List.Item>強強エンジニアに質問する</List.Item>
        <List.Item>1on1の申し込み</List.Item>
        <List.Item>今までの勉強会の資料を閲覧する</List.Item>
        <List.Item>イベントへの参加 etc...</List.Item>
        といったように様々なことができます！
      </List>
    </div>
  );
};

const Step2 = () => {
  const { currentUser } = useCurrentUser();

  const handleSave = () => {
    return;
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <Text weight="bold" className="text-center">
        初回登録をしましょう！👍
      </Text>

      <ScrollArea className="px-4 pt-5" style={{ height: 450 }}>
        <Group>
          <Avatar
            radius="xl"
            size={30}
            src={currentUser.photoURL}
            alt={currentUser.displayName ? currentUser.displayName : "ゲスト"}
          />
          <p className="font-bold">→</p>
          {/* {uploadImage()} */}
          <label htmlFor="settingImg" className="rounded-md border-2 border-dashed  p-2 hover:cursor-pointer">
            <p className="text-gray-400 hover:text-gray-500">ファイルを選ぶ</p>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              // onChange={handleOnChange}
              id="settingImg"
            />
          </label>
        </Group>
        <TextInput
          required
          label="名前"
          placeholder="名前"
          // value={displayName}
          // onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
        />
        <TextInput
          required
          label="メールアドレス"
          placeholder="techuni@code.com"
          // value={email ? email : ""}
          // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-4"
        />
        <Group className="flex justify-between">
          <TextInput
            label="大学"
            placeholder="tech大学"
            className="mt-4"
            // value={university}
            // onChange={(e) => setFormData({ ...formData, university: e.target.value })}
          />
          <Select
            label="学年"
            placeholder="code学年"
            data={gradeData}
            className="mt-4"
            // value={grade}
            dropdownComponent="div"
            // onChange={(e) => setFormData({ ...formData, grade: e })}
          />
          <Select
            label="学部"
            placeholder="code学部"
            data={facultyData}
            className="mt-4"
            // value={faculty}
            dropdownComponent="div"
            // onChange={(e) => setFormData({ ...formData, faculty: e })}
          />
        </Group>

        <Group className="flex justify-between">
          <TextInput
            required
            label="github"
            icon={<GitHubIcon />}
            placeholder="techuni"
            // value={github}
            // onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            className="mt-4"
          />
          <TextInput
            required
            label="twitter"
            icon={<TwitterIcon />}
            placeholder="techuni"
            // value={twitter}
            // onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
            className="mt-4"
          />
          <TextInput
            required
            label="instagram"
            icon={<InstagramIcon />}
            placeholder="techuni"
            // value={instagram}
            // onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            className="mt-4"
          />
        </Group>

        <Select
          required
          label="最も興味のある分野"
          placeholder="code学年"
          data={interestData}
          className="mt-4"
          // value={field}
          dropdownComponent="div"
          // onChange={(e) => setFormData({ ...formData, field: e })}
        />
        <MultiSelect
          label="よく使用する言語・フレームワーク・ライブラリー"
          placeholder="Next.js"
          searchable
          nothingFound="見つかりませんでした。"
          data={fieldDetailsData}
          className="mt-4"
          // value={fieldDetails}
          dropdownComponent="div"
          maxSelectedValues={3}
          // onChange={(e) => setFormData({ ...formData, fieldDetails: [...e] })}
        />
        <TextInput
          label="一言"
          placeholder="はじめまして！"
          // value={bio}
          // onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="mt-4"
        />

        {/* //todo: ここどうするか決める */}
        <Select
          label="1on1について"
          color="gray"
          placeholder="はい or いいえ"
          data={[
            { value: "はい", label: "はい" },
            { value: "いいえ", label: "いいえ" },
          ]}
          className="mt-4"
        />

        <div className="mt-5 w-full text-center">
          <AppButton
            type="button"
            color="blue"
            size="xs"
            radius="xs"
            variant="filled"
            className=""
            onClick={handleSave}
          >
            保存
          </AppButton>
        </div>
      </ScrollArea>
    </div>
  );
};

export const SignUp: FC = () => {
  // stepは1・2・3・4の4つのみの型を持つ、次へボタンを押したら、stepが+1される。それに応じて、表示するコンポーネントを変える。
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    setStep(step + 1);
  };
  // step1: welcome
  // step2: 説明文
  // メンバーサイトは、Tech.Uniに所属しているメンバーのみが使えるサイトです。
  // 自分の興味のあるメンバーを探せたり、1on1の申し込み・今までの勉強会資料を閲覧、イベントへの参加など、Tech.Uniに関する活動を行うことができます。
  // step3: ではユーザー登録しましょう！→ユーザー登録をする
  // step4: ユーザー登録完了しました。Tech.Uniのコミッティーが本当にあなたがTech.Uniメンバーか確認しています。承認されるまで、しばらくお待ちください。
  return (
    <>
      <div className="flex h-screen  flex-col items-center justify-center">
        <div className="flex h-2/3 w-2/3 flex-col items-center  rounded bg-gray-50 px-4 py-8">
          <StepCircle step={step} />

          <div className="mt-4">
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
          </div>
        </div>

        <Button onClick={handleNext} className="mt-4">
          次へ
        </Button>
      </div>
    </>
  );
};
