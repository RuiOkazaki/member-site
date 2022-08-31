import { NextPage } from "next";
import { Layout } from "src/components/layout";
import { MemberDetail } from "src/components/page/Member/MemberDetail";

const MemberDetailPage: NextPage = () => {
  return (
    <Layout>
      <MemberDetail />
    </Layout>
  );
};
export default MemberDetailPage;
