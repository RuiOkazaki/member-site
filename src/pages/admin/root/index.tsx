import { NextPage } from "next";
import { AdminLayout } from "src/components/layout/Layout";
import { AdminHome } from "src/components/page/Admin/Home";

const AdminHomePage: NextPage = () => {
  return (
    <AdminLayout>
      <AdminHome />
    </AdminLayout>
  );
};

export default AdminHomePage;
