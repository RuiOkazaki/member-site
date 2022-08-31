import { NextPage } from "next";
import { Layout } from "src/components/layout";
import { OneOnOne } from "src/components/page/OneOnOne";

const OneOnOnePage: NextPage = () => {
  return (
    <Layout>
      <OneOnOne />
    </Layout>
  );
};

export default OneOnOnePage;
