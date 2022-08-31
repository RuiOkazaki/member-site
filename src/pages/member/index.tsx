import { NextPage } from "next";
import { Layout } from "src/components/layout";
import { Member } from "src/components/page/Member";

const MemberPage: NextPage = () => {
  return (
    <Layout>
      <Member />
    </Layout>
  );
};

export default MemberPage;
