import { NextPage } from "next";
import { AppLayout } from "src/components/layout/Layout";
import { Question } from "src/components/page/Question/index";

const QuestionPage: NextPage = () => {
  return (
    <AppLayout>
      <Question />
    </AppLayout>
  );
};

export default QuestionPage;
