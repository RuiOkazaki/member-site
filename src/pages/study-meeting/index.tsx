import { NextPage } from "next";
import { AppLayout } from "src/components/layout/Layout";
import { StudyMeeting } from "src/components/page/StudyMeeting";

const StudyMeetingPage: NextPage = () => {
  return (
    <AppLayout>
      <StudyMeeting />
    </AppLayout>
  );
};

export default StudyMeetingPage;
