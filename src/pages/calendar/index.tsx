import { NextPage } from "next";
import { Layout } from "src/components/layout";
import { Calender } from "src/components/page/Carender";

const Calendar: NextPage = () => {
  return (
    <Layout>
      <Calender />
    </Layout>
  );
};

export default Calendar;
