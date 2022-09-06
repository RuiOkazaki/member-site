import { NextPage } from "next";
import { AdminLayout } from "src/components/layout/Layout";
import { AdminTeachingMaterial } from "src/components/page/Admin/TeachingMaterial";

const AdminTeachingMaterialPage: NextPage = () => {
  return (
    <AdminLayout>
      <AdminTeachingMaterial />
    </AdminLayout>
  );
};

export default AdminTeachingMaterialPage;
