import { NextPage } from "next";
import { Layout } from "src/components/layout";
import { Home } from "src/components/page/Home";

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default HomePage;
