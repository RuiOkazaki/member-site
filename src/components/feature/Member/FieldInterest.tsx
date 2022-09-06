import { FC } from "react";

type Props = {
  field: string | null;
};
export const FieldInterest: FC<Props> = ({ field }) => {
  return (
    <div className="w-28 whitespace-nowrap rounded-full bg-yellow-500 py-0.5 px-1 text-center  text-sm font-bold text-white">
      <p>{field}</p>
    </div>
  );
};
