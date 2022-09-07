import { NextPage } from "next";
import { AdminLayout } from "src/components/layout/Layout";
import { AdminEvent } from "src/components/page/Admin/Event";

const AdminEventPage: NextPage = () => {
  return (
    <AdminLayout>
      <AdminEvent />
    </AdminLayout>
  );
};

export default AdminEventPage;
