import { NextPage } from "next";
import { AppLayout } from "src/components/layout/Layout";
import { OneOnOne } from "src/components/page/OneOnOne";

const OneOnOnePage: NextPage = () => {
  return (
    <AppLayout>
      <OneOnOne />
    </AppLayout>
  );
};

export default OneOnOnePage;
