import { NextPage } from "next";
import { AppLayout } from "src/components/layout/Layout";
import { TeachingMaterial } from "src/components/page/TeachingMaterial";

const TeachingMaterialPage: NextPage = () => {
  return (
    <AppLayout>
      <TeachingMaterial />
    </AppLayout>
  );
};

export default TeachingMaterialPage;
