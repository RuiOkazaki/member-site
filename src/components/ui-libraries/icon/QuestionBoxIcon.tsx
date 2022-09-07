import { FC } from "react";

type Props = {
  color?: "white" | "black";
};

export const QuestionBoxIcon: FC<Props> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // これだけ敢えてw-6にしてあります
      className="h-5 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      color={color}
    >
      <polyline points="21 8 21 21 3 21 3 8"></polyline>
      <rect x="1" y="3" width="22" height="5"></rect>
      <line x1="10" y1="12" x2="14" y2="12"></line>
    </svg>
  );
};
