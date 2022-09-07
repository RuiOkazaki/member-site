import { NextPage } from "next";
import { StudyMeetingDetail } from "src/components/page/StudyMeeting/StudyMeetingDetail";
import { Layout } from "src/components/layout";

const StudyMeetingDetailPage: NextPage = () => {
  return (
    <Layout>
      <StudyMeetingDetail />
    </Layout>
  );
};
export default StudyMeetingDetailPage;
