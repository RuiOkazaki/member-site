import Router from "next/router";
import { Layout } from "src/components/layout";

const MemberDetailPage = () => {
  const uid = Router.query.id;

  return (
    <Layout>
      <h1>MemberDetailPage</h1>
    </Layout>
  );
};
export default MemberDetailPage;

// uidのデータを取得してそのデータを表示する
