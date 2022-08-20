import { FC, Suspense } from "react";
import { Center } from "@mantine/core";
import { Layout } from "src/components/layout";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

export const Home: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<AppLoading />}></Suspense>
      <Center>
        <iframe
          className="h-[50rem] w-2/3 rounded-xl border-2 border-gray-200"
          src="https://v1.embednotion.com/embed/0a314bb6e00d4766a808bbda9136aea1"
        ></iframe>
      </Center>
    </Layout>
  );
};
