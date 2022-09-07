import { NextPage } from "next";
import { AppLayout } from "src/components/layout/Layout";
import { Member } from "src/components/page/Member";

const MemberPage: NextPage = () => {
  return (
    <AppLayout>
      <Member />
    </AppLayout>
  );
};

export default MemberPage;
