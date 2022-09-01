import { Text } from "@mantine/core";
import { FC } from "react";

type StepCircleProps = {
  step: number;
};
export const StepCircle: FC<StepCircleProps> = ({ step }) => {
  const stepArray = [1, 2, 3, 4];
  return (
    <div className="flex items-center gap-1">
      {stepArray.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              step === item ? "text-bold h-8 w-8 bg-blue-500" : "h-5 w-5 bg-gray-300"
            } flex items-center justify-center rounded-full hover:cursor-pointer`}
          >
            <Text color="white">{item}</Text>
          </div>
        );
      })}
    </div>
  );
};
