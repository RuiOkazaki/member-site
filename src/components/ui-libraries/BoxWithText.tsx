import { Text } from "@mantine/core";
import { FC, ReactNode } from "react";

type BoxWithTextProps = {
  title: string;
  content: ReactNode;
};
export const BoxWithText: FC<BoxWithTextProps> = ({ title, content }) => {
  return (
    <div className="my-4 rounded-lg bg-white p-4">
      <Text size="md" weight="bold">
        {title}
      </Text>
      {content}
    </div>
  );
};
