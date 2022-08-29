import { NextPage } from "next";
import { Layout } from "src/components/layout";
import { TeachingMaterial } from "src/components/page/TeachingMaterial";

const TeachingMaterialPage: NextPage = () => {
  return (
    <Layout>
      <TeachingMaterial />
    </Layout>
  );
};

export default TeachingMaterialPage;
