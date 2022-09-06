import { Badge, Text } from "@mantine/core";
import { FC } from "react";
import { interestData } from "src/components/utils/constants/field";

type Props = {
  field: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};
export const FieldInterest: FC<Props> = ({ field, size }) => {
  const backgroundColor = interestData.find((interest) => interest.value === field)?.color ?? "gray";
  return (
    <Badge className="box-content w-12 min-w-min whitespace-nowrap px-1 py-0.5" color={backgroundColor} size={size}>
      <Text weight="bold" size="sm">
        {field}
      </Text>
    </Badge>
  );
};
