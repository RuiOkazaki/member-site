import { FC, useState } from "react";
import { Avatar, Group, Modal as MantineModal, MultiSelect, Select, Tabs, TextInput, Text } from "@mantine/core";
import { doc, DocumentReference, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useUploadProfileIcon } from "src/hooks/useUploadProfileIcon";
import { User } from "src/modules/user";
import { AppLink } from "src/components/ui-libraries/AppLink";
import { AppUnderConstruction } from "src/components/ui-libraries/AppUnderConstruction";
import { auth, db } from "../../utils/libs/firebase";
import { facultyData, gradeData, fieldDetailsData, interestData, LINKS, UID } from "../../utils/constants/index";
import { GitHubIcon, InfoIcon, InstagramIcon, LogoutIcon, SettingIcon, TwitterIcon } from "../../ui-libraries/icon";
import { AppButton } from "../../ui-libraries/AppButton";

type Props = {
  currentUser: User;
  setCurrentUser: (currentUser: User) => void;
  opened: boolean;
  setOpened: () => void;
};

export type FormData = Omit<User, "uid" | "createdAt" | "id" | "active">;

export const ProfileEditContentsModal: FC<Props> = ({ currentUser, setCurrentUser, opened, setOpened }) => {
  const router = useRouter();
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

  const handleSave = async () => {
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
    setOpened();
  };

  const uploadImage = () => {
    if (percent === null) return;
    if (percent !== 100) return <p className="rounded-full bg-slate-100 px-2 font-bold text-blue-300">{percent}%</p>;
    return file && <Avatar src={window.URL.createObjectURL(file) ?? currentUser.photoURL} radius="xl" size={40} />;
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem(UID);
        toast.success("??????????????????");
        router.push(LINKS.LOGIN);
      })
      .catch((error) => {
        // ?????????????????????????????????slack?????????
        console.error(error);
      });
  };

  return (
    <MantineModal
      opened={opened}
      onClose={setOpened}
      title="??????"
      size="xl"
      overlayOpacity={0.55}
      overlayBlur={3}
      overflow="inside"
      radius={10}
      transitionDuration={250}
    >
      <Tabs defaultValue="???????????????">
        <Tabs.List>
          <Tabs.Tab value="???????????????" icon={<InfoIcon />}>
            ???????????????
          </Tabs.Tab>
          <Tabs.Tab value="?????????" icon={<SettingIcon />}>
            ?????????
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="???????????????">
          <Group className="pt-4">
            <Avatar
              radius="xl"
              size={40}
              src={currentUser.photoURL}
              alt={currentUser.displayName ? currentUser.displayName : "?????????"}
            />
            <p className="font-bold">???</p>
            {uploadImage()}
            <label htmlFor="settingImg" className="rounded-md border-2 border-dashed  p-2 hover:cursor-pointer">
              <p className="text-gray-400 hover:text-gray-500">?????????????????????</p>
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
            label="??????"
            placeholder="??????"
            value={displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
          />
          <TextInput
            required
            label="?????????????????????"
            placeholder="techuni@code.com"
            value={email ? email : ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-4"
          />
          <Group className="flex justify-between">
            <TextInput
              label="??????"
              placeholder="tech??????"
              className="mt-4"
              value={university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            />
            <Select
              label="??????"
              placeholder="code??????"
              data={gradeData}
              className="mt-4"
              value={grade}
              dropdownComponent="div"
              onChange={(e) => setFormData({ ...formData, grade: e })}
            />
            <Select
              label="??????"
              placeholder="code??????"
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
            label="???????????????????????????"
            placeholder="code??????"
            data={interestData}
            className="mt-4"
            value={field}
            dropdownComponent="div"
            onChange={(e) => setFormData({ ...formData, field: e })}
          />
          <MultiSelect
            label="?????????????????????????????????????????????????????????????????????"
            required
            placeholder="Next.js"
            searchable
            nothingFound="?????????????????????????????????"
            data={fieldDetailsData}
            className="mt-4"
            value={fieldDetails}
            dropdownComponent="div"
            maxSelectedValues={3}
            onChange={(e) => setFormData({ ...formData, fieldDetails: [...e] })}
          />
          <TextInput
            label="??????"
            required
            placeholder="?????????????????????"
            value={bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="mt-4"
          />
          <div className="mt-5 w-full text-center">
            <AppButton
              type="button"
              color="blue"
              size="md"
              radius="md"
              variant="filled"
              className=""
              onClick={handleSave}
            >
              ??????
            </AppButton>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="?????????">
          {/* <Text weight="bold">???????????????</Text> */}
          <div className="pt-4">
            <Text weight="bold">????????????????????????</Text>
            <AppButton
              type="button"
              color="red"
              size="xs"
              radius="md"
              variant="subtle"
              onClick={handleLogout}
              className="my-2 mx-auto mb-5"
            >
              <LogoutIcon />
              ???????????????
            </AppButton>

            <Text weight="bold">??????????????????</Text>
            <AppUnderConstruction ImageWidht={100} ImageHeight={60} textSize="xs" className="max-w-fit items-start" />
            {/* ??????????????????????????????????????????????????? */}
            {/* <AppButton type="button" color="red" size="xs" radius="md" variant="subtle" className="mx-auto mb-5"> 
              <DeleteIcon />
              ????????????????????????
            </AppButton> */}
          </div>

          <Text weight="bold">Tech.Uni HP???????????????????????????????????????????</Text>
          <AppLink href="https://techuni.org/">techuni.org</AppLink>

          <div className="pt-2">
            <Text weight="bold">Tech.Uni???????????????</Text>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdqkpL8X24cfDlVvFlthBwoQhwZwcHJ64L7XzIM27IoegJH3w/viewform?embedded=true"
              width="640"
              height="700"
            ></iframe>
          </div>
        </Tabs.Panel>
      </Tabs>
    </MantineModal>
  );
};
