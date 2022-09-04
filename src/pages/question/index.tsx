import { NextPage } from "next";
import { Layout } from "src/components/layout";
import { Question } from "src/components/page/Question/index";

const QuestionPage: NextPage = () => {
  return (
    <Layout>
      <Question />
    </Layout>
  );
};

export default QuestionPage;
