import { NextPage } from "next";
import { Layout } from "src/components/layout";
import { AdminDetail } from "src/components/page/Admin/AdminDetail";

const AdminDetailPage: NextPage = () => {
  return (
    <Layout>
      <AdminDetail />
    </Layout>
  );
};

export default AdminDetailPage;
