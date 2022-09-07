import { Text } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";
import { HomeIcon, UsersIcon, TextIcon, StudyIcon, MemberIcon, EventIcon, QuestionBoxIcon } from "../ui-libraries/icon";
import { ADMINLINKS, LINKS } from "../utils/constants/link";

type MenuType = {
  icon: JSX.Element;
  label: string;
  href: string;
}[];

const MENU: MenuType = [
  { icon: <HomeIcon />, label: "ホーム", href: LINKS.HOME },
  { icon: <MemberIcon />, label: "メンバー", href: LINKS.MEMBER },
  { icon: <QuestionBoxIcon />, label: "質問箱", href: LINKS.QUESTION },
  { icon: <EventIcon />, label: "イベント", href: LINKS.EVENT },
  { icon: <StudyIcon />, label: "勉強会", href: LINKS.STUDYMEETING },
  { icon: <TextIcon />, label: "教材", href: LINKS.TEACHINGMATERIAL },
  { icon: <UsersIcon />, label: "1on1", href: LINKS.ONEONONE },
];

const ADMINMENU: MenuType = [
  { icon: <HomeIcon color="white" />, label: "ホーム", href: ADMINLINKS.HOME },
  { icon: <MemberIcon color="white" />, label: "メンバー", href: ADMINLINKS.MEMBER },
  { icon: <QuestionBoxIcon color="white" />, label: "質問箱", href: ADMINLINKS.QUESTION },
  { icon: <EventIcon color="white" />, label: "イベント", href: ADMINLINKS.EVENT },
  { icon: <StudyIcon color="white" />, label: "勉強会", href: ADMINLINKS.STUDYMEETING },
  { icon: <TextIcon color="white" />, label: "教材", href: ADMINLINKS.TEACHINGMATERIAL },
  { icon: <UsersIcon color="white" />, label: "1on1", href: ADMINLINKS.ONEONONE },
];

export const SideBar: FC = () => {
  return (
    <div>
      <aside className="sticky top-10 flex h-[calc(100vh-3rem)] flex-col  justify-between border-r">
        <ul>
          {MENU.map((menu) => {
            return (
              <li key={menu.label}>
                <Link href={menu.href}>
                  <a className="flex items-center justify-start py-3 pl-2 pr-8 transition delay-75 ease-in hover:translate-x-1 hover:bg-gray-100">
                    {menu.icon}
                    <Text size="sm" weight={600} className="pl-2 text-gray-800 md:inline-block">
                      {menu.label}
                    </Text>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export const AdminSideBar: FC = () => {
  return (
    <div>
      <aside
        className="sticky top-10 flex h-[calc(100vh-3rem)]  flex-col justify-between border-r"
        style={{ backgroundColor: "#23282D" }}
      >
        <ul>
          {ADMINMENU.map((menu) => {
            return (
              <li key={menu.label}>
                <Link href={menu.href}>
                  <a className="flex items-center justify-start py-3 pl-2 pr-8 transition delay-75 ease-in hover:translate-x-1 hover:bg-zinc-900">
                    {menu.icon}
                    <Text size="sm" weight={500} className="pl-2 text-white md:inline-block">
                      {menu.label}
                    </Text>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};
