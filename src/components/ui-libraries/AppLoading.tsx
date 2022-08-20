import { Loader } from "@mantine/core";
import { FC } from "react";

export const AppLoading: FC = () => {
  return (
    <div className="mt-4 flex h-screen justify-center">
      <Loader />
    </div>
  );
};
