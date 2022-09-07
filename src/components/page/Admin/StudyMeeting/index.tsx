import { Text } from "@mantine/core";
import { FC } from "react";
import { AppUnderConstruction } from "src/components/ui-libraries/AppUnderConstruction";

export const AdminStudyMeeting: FC = () => {
  return (
    <>
      <Text weight="bold">勉強会</Text>
      <AppUnderConstruction className="flex h-full flex-col items-center justify-center" />
    </>
  );
};
