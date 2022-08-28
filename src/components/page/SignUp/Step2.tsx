import { FC, useState } from "react";
import { Text, ScrollArea, Group, Avatar, TextInput, Select, MultiSelect } from "@mantine/core";
import { doc, DocumentReference, updateDoc } from "firebase/firestore";
import { facultyData, gradeData } from "src/components/utils/constants/university";
import { fieldDetailsData, interestData } from "src/components/utils/constants/field";
import { TwitterIcon, GitHubIcon, InstagramIcon } from "src/components/ui-libraries/icon";
import { useUploadProfileIcon } from "src/hooks/useUploadProfileIcon";
import { User } from "src/components/utils/libs/firebase/index";
import { db } from "src/components/utils/libs/firebase";
import { AppButton } from "src/components/ui-libraries/AppButton";

type Step2Props = {
  currentUser: User;
  setCurrentUser: (currentUser: User) => void;
  step: number;
  setStep: (step: number) => void;
};

export type FormData = Omit<User, "uid" | "createdAt" | "id" | "active">;

export const Step2: FC<Step2Props> = ({ currentUser, setCurrentUser, step, setStep }) => {
  const [formData, setFormData] = useState<FormData>({
    bio: currentUser.bio,
    displayName: currentUser.displayName,
    email: currentUser.email,
    faculty: currentUser.faculty,
    field: currentUser.field,
    fieldDetails: currentUser.fieldDetails,
    github: currentUser.github,
    grade: currentUser.grade,
    instagram: currentUser.instagram,
    photoURL: currentUser.photoURL,
    position: currentUser.position,
    status: currentUser.status,
    twitter: currentUser.twitter,
    university: currentUser.university,
  });
  const { file, setFile, percent, handleOnChange } = useUploadProfileIcon({ formData, setFormData });

  const {
    bio,
    displayName,
    email,
    faculty,
    field,
    fieldDetails,
    github,
    grade,
    instagram,
    photoURL,
    position,
    status,
    twitter,
    university,
  } = formData;

  const userRef = doc(db, "users", currentUser.uid) as DocumentReference<User>;

  const handleSaveAndNext = async () => {
    setCurrentUser({
      ...currentUser,
      bio: bio,
      displayName: displayName,
      email: email,
      faculty: faculty,
      field: field,
      fieldDetails: fieldDetails,
      github: github,
      grade: grade,
      instagram: instagram,
      photoURL: photoURL,
      position: position,
      status: status,
      twitter: twitter,
      university: university,
    });
    await updateDoc(userRef, formData);
    setFile(null);

    setStep(step + 1);
  };

  const uploadImage = () => {
    if (percent === null) return;
    if (percent !== 100) return <p className="rounded-full bg-slate-100 px-2 font-bold text-blue-300">{percent}%</p>;
    return file && <Avatar src={window.URL.createObjectURL(file) ?? currentUser.photoURL} radius="xl" size={40} />;
  };

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Text weight="bold" className="text-center">
        初期登録をしましょう！👍
      </Text>
      <Text size="xs" className="mt-2 text-center" color="red">
        ※ 本当にあなたがTech.Uniメンバーなのかを、管理メンバーが確認するため、本名で正しく登録してください。
      </Text>

      <ScrollArea className="px-4 pt-5" style={{ height: 400 }}>
        <Group>
          <Avatar
            radius="xl"
            size={30}
            src={currentUser.photoURL}
            alt={currentUser.displayName ? currentUser.displayName : "ゲスト"}
          />
          <p className="font-bold">→</p>
          {uploadImage()}
          <label htmlFor="settingImg" className="rounded-md border-2 border-dashed  p-2 hover:cursor-pointer">
            <p className="text-gray-400 hover:text-gray-500">ファイルを選ぶ</p>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              onChange={handleOnChange}
              id="settingImg"
            />
          </label>
        </Group>
        <TextInput
          required
          label="名前"
          placeholder="名前"
          value={displayName}
          onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
        />
        <TextInput
          required
          label="メールアドレス"
          placeholder="techuni@code.com"
          value={email ? email : ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-4"
        />
        <Group className="flex justify-between">
          <TextInput
            label="大学"
            placeholder="tech大学"
            className="mt-4"
            value={university}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
          />
          <Select
            label="学年"
            placeholder="code学年"
            data={gradeData}
            className="mt-4"
            value={grade}
            dropdownComponent="div"
            onChange={(e) => setFormData({ ...formData, grade: e })}
          />
          <Select
            label="学部"
            placeholder="code学部"
            data={facultyData}
            className="mt-4"
            value={faculty}
            dropdownComponent="div"
            onChange={(e) => setFormData({ ...formData, faculty: e })}
          />
        </Group>

        <Group className="flex justify-between">
          <TextInput
            required
            label="github"
            icon={<GitHubIcon />}
            placeholder="techuni"
            value={github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            className="mt-4"
          />
          <TextInput
            label="twitter"
            icon={<TwitterIcon />}
            placeholder="techuni"
            value={twitter}
            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
            className="mt-4"
          />
          <TextInput
            label="instagram"
            icon={<InstagramIcon />}
            placeholder="techuni"
            value={instagram}
            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            className="mt-4"
          />
        </Group>

        <Select
          required
          label="最も興味のある分野"
          placeholder="code学年"
          data={interestData}
          className="mt-4"
          value={field}
          dropdownComponent="div"
          onChange={(e) => setFormData({ ...formData, field: e })}
        />
        <MultiSelect
          label="よく使用する言語・フレームワーク・ライブラリー"
          placeholder="Next.js"
          searchable
          required
          nothingFound="見つかりませんでした。"
          data={fieldDetailsData}
          className="mt-4"
          value={fieldDetails}
          dropdownComponent="div"
          maxSelectedValues={3}
          onChange={(e) => setFormData({ ...formData, fieldDetails: [...e] })}
          dropdownPosition="top"
        />
        <TextInput
          label="一言"
          required
          placeholder="ex) サウナが好きです！ など、一言なんでもどうぞ😆"
          value={bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="mt-4 pb-2"
        />
        <Text size="xs" className="mt-2 text-center" color="red">
          必須項目は必ず入力してください。
        </Text>
      </ScrollArea>

      <div className="mt-auto flex items-center justify-center">
        <AppButton size="xs" type="button" color="gray" variant="light" radius="xs" onClick={() => setStep(step - 1)}>
          戻る
        </AppButton>
        <AppButton
          size="sm"
          type="button"
          color="blue"
          radius="sm"
          // requiredのついている項目が入力されていない場合はdisabledにする
          disabled={
            !formData.photoURL ||
            !formData.displayName ||
            !formData.email ||
            !formData.github ||
            !formData.field ||
            !formData.fieldDetails ||
            !formData.bio
          }
          className=""
          onClick={handleSaveAndNext}
        >
          保存して次へ
        </AppButton>
      </div>
    </>
  );
};
