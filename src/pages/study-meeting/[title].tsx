import { NextPage } from "next";
import { AppLayout } from "src/components/layout/Layout";
import { StudyMeetingDetail } from "src/components/page/StudyMeeting/StudyMeetingDetail";

const StudyMeetingDetailPage: NextPage = () => {
  return (
    <AppLayout>
      <StudyMeetingDetail />
    </AppLayout>
  );
};
export default StudyMeetingDetailPage;
