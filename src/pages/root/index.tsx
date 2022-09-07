import { NextPage } from "next";
import { AppLayout } from "src/components/layout/Layout";
import { Home } from "src/components/page/Home";

const HomePage: NextPage = () => {
  return (
    <AppLayout>
      <Home />
    </AppLayout>
  );
};

export default HomePage;
