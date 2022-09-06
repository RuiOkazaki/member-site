import { NextPage } from "next";
import { AdminLayout } from "src/components/layout/Layout";
import { AdminOneOnOne } from "src/components/page/Admin/OneOnOne";

const AdminOneOnOnePage: NextPage = () => {
  return (
    <AdminLayout>
      <AdminOneOnOne />
    </AdminLayout>
  );
};

export default AdminOneOnOnePage;
