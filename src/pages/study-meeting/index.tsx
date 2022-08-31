import { NextPage } from "next";
import { Layout } from "src/components/layout";
import { StudyMeeting } from "src/components/page/StudyMeeting";

const StudyMeetingPage: NextPage = () => {
  return (
    <Layout>
      <StudyMeeting />
    </Layout>
  );
};

export default StudyMeetingPage;
