import { Events } from "src/components/page/Events";
import { Layout } from "src/components/layout";
import type { NextPage } from "next";

const EventsPage: NextPage = () => {
  return (
    <Layout>
      <Events />
    </Layout>
  );
};

export default EventsPage;
