import Link from "next/link";
import { FC } from "react";
import { HomeIcon, UsersIcon, TextIcon, StudyMeetingIcon, MemberIcon } from "../ui-libraries/icon";
import { LINKS } from "../utils/constants/link";

type MenuType = {
  icon: JSX.Element;
  label: string;
  href: string;
}[];

const MENU: MenuType = [
  { icon: <HomeIcon />, label: "ホーム", href: LINKS.HOME },
  { icon: <MemberIcon />, label: "メンバー", href: LINKS.MEMBER },
  { icon: <TextIcon />, label: "教材", href: LINKS.TEACHINGMATERIAL },
  { icon: <StudyMeetingIcon />, label: "勉強会", href: LINKS.STUDYMEETING },
  { icon: <UsersIcon />, label: "1on1", href: LINKS.ONEONONE },
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
                  <a className="flex items-center justify-center py-3 transition delay-75 ease-in hover:translate-x-1 hover:bg-gray-100 md:justify-start md:pl-2">
                    {menu.icon}
                    <span className="hidden md:inline-block md:pr-8 md:pl-2 md:font-bold">{menu.label}</span>
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
