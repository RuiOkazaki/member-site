import { Header } from "./Header";
import { SideBar } from "./Sidebar";
import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <SideBar />
        <main className="w-0 flex-1 bg-gray-50 px-5">{children}</main>
      </div>
    </div>
  );
};
