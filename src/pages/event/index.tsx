import { Events } from "src/components/page/Events";
import { AppLayout } from "src/components/layout/Layout";
import type { NextPage } from "next";

const EventsPage: NextPage = () => {
  return (
    <AppLayout>
      <Events />
    </AppLayout>
  );
};

export default EventsPage;
