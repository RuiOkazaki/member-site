import { NextPage } from "next";
import { AdminLayout } from "src/components/layout/Layout";
import { AdminStudyMeeting } from "src/components/page/Admin/StudyMeeting";

const AdminStudyMeetingPage: NextPage = () => {
  return (
    <AdminLayout>
      <AdminStudyMeeting />
    </AdminLayout>
  );
};

export default AdminStudyMeetingPage;
