import { NextPage } from "next";
import { AdminLayout } from "src/components/layout/Layout";
import { AdminQuestion } from "src/components/page/Admin/Qustion";

const AdminQuestionPage: NextPage = () => {
  return (
    <AdminLayout>
      <AdminQuestion />
    </AdminLayout>
  );
};

export default AdminQuestionPage;
