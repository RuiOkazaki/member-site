import { AdminHeader } from "../Header";
import { AdminSideBar } from "../Sidebar";
import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AdminLayout: FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className="min-h-screen">
      <AdminHeader />
      <div className="flex">
        <AdminSideBar />
        <main className="w-0 flex-1 bg-gray-50 px-5">{children}</main>
      </div>
    </div>
  );
};
