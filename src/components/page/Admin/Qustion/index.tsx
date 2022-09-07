import { Text } from "@mantine/core";
import { FC } from "react";
import { AppUnderConstruction } from "src/components/ui-libraries/AppUnderConstruction";

export const AdminQuestion: FC = () => {
  return (
    <>
      <Text weight="bold">質問箱</Text>
      <AppUnderConstruction className="flex h-full flex-col items-center justify-center" />
    </>
  );
};
