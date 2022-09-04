import { Center, Text } from "@mantine/core";
import { Suspense } from "react";
import { AppLoading } from "src/components/ui-libraries/AppLoading";

export const Question = () => {
  return (
    <Suspense fallback={<AppLoading />}>
      <div className="pt-5">
        <Text weight="bold">匿名質問</Text>
        <Center mb={10}>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeVVpFC1qpxgiXvUQhMu-9z2xFksxGX3QYny1lg_KzX9EBbDw/viewform?embedded=true"
            width="640"
            height="800"
          ></iframe>
        </Center>
      </div>

      <Text weight="bold">今までの質問一覧</Text>
    </Suspense>
  );
};
