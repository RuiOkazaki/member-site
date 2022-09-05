import { Text } from "@mantine/core";
import { FC } from "react";
import { interestData } from "src/components/utils/constants/field";

type Props = {
  field: string;
};
export const FieldInterest: FC<Props> = ({ field }) => {
  const backgroundColor = interestData.find((interest) => interest.value === field)?.color ?? "gray";
  return (
    <div
      className="box-content w-12 min-w-min whitespace-nowrap rounded-full px-3 py-1 text-center"
      style={{ backgroundColor: backgroundColor }}
    >
      <Text color="white" weight="bold" size="sm">
        {field}
      </Text>
    </div>
  );
};
