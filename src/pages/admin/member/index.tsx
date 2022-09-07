import { NextPage } from "next";
import { AdminLayout } from "src/components/layout/Layout";
import { AdminMember } from "src/components/page/Admin/Member";

const AdminMemberPage: NextPage = () => {
  return (
    <AdminLayout>
      <AdminMember />
    </AdminLayout>
  );
};

export default AdminMemberPage;
