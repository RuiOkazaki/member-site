import { NextPage } from "next";
import { Layout } from "src/components/layout";
import { Admin } from "src/components/page/Admin";

const AdminPage: NextPage = () => {
  return (
    <Layout>
      <Admin />
    </Layout>
  );
};

export default AdminPage;
