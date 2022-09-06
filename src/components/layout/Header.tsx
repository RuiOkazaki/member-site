/* eslint-disable @next/next/no-img-element */
import { FC, memo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, Button, Text } from "@mantine/core";
import { useCurrentUser } from "src/global-states/atoms";
import { ADMINLINKS, LINKS } from "../utils/constants/index";
import { ProfileEditContentsModal } from "../feature/HeaderNavItem/ProfileEditContentsModal";

export const NavItem: FC = memo(() => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [settingOpened, setSettingOpened] = useState(false);

  if (!currentUser) return null;

  const handleSettingModal = () => {
    setSettingOpened(!settingOpened);
  };

  return (
    <div className="flex items-center gap-5">
      {/* //todo: 実装後回し
        <button onClick={handleNotificationModal} className="bg-white hover:text-gray-700">
        <BellIcon />
      </button> */}
      {/* <button className="bg-white hover:text-gray-700">
        <CalendarIcon />
      </button> */}
      <button onClick={handleSettingModal} className="rounded-full hover:opacity-90">
        {currentUser.photoURL ? (
          <Avatar
            radius="xl"
            size={40}
            className="hover:opacity-80"
            src={currentUser.photoURL}
            alt={currentUser.displayName ? currentUser.displayName : "ゲスト"}
          />
        ) : (
          <Avatar src={null} radius="xl" size={40} className="hover:opacity-80" alt="ゲスト" />
        )}
      </button>
      <ProfileEditContentsModal
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        opened={settingOpened}
        setOpened={handleSettingModal}
      />
      {/*//todo: 実装後回し
        <NotificationDrawer
        bellOpened={notificationOpened}
        setBellOpened={handleNotificationModal}
        data={notifications}
      /> */}
    </div>
  );
});
NavItem.displayName = "NavItem";

export const Header: FC = memo(() => {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b  px-2">
      <Link href={LINKS.HOME}>
        <Image src={"/favicons/favicon-32x32.png"} width={22.5} height={22.5} alt="Tech.Uniアイコン" />
      </Link>
      <NavItem />
    </header>
  );
});
Header.displayName = "Header";

export const AdminHeader: FC = memo(() => {
  return (
    <header
      className="sticky top-0 z-10 flex h-12 items-center justify-between border-b px-2"
      style={{ backgroundColor: "#23282D" }}
    >
      <div className="flex gap-4">
        <Link href={ADMINLINKS.HOME}>
          <Image src={"/favicons/favicon-32x32.png"} width={22.5} height={22.5} alt="Tech.Uniアイコン" />
        </Link>
        <Text color="white" weight={500} size="sm">
          管理画面
        </Text>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/">
          <a className="text-white hover:opacity-90">
            <Button color="gray" variant="light" size="xs" compact className="hover:bg-gray-100">
              メンバーサイトへ
            </Button>
          </a>
        </Link>

        <NavItem />
      </div>
    </header>
  );
});
AdminHeader.displayName = "AdminHeader";
