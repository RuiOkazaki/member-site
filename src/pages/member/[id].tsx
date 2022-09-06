import { NextPage } from "next";
import { AppLayout } from "src/components/layout/Layout";
import { MemberDetail } from "src/components/page/Member/MemberDetail";

const MemberDetailPage: NextPage = () => {
  return (
    <AppLayout>
      <MemberDetail />
    </AppLayout>
  );
};
export default MemberDetailPage;
