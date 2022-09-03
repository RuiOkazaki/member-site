import { FC } from "react";
import { Center } from "@mantine/core";

export const Home: FC = () => {
  return (
    <>
      <Center>
        <iframe
          className="h-[50rem] w-2/3 rounded-xl border-2 border-gray-200"
          src="https://v1.embednotion.com/embed/0a314bb6e00d4766a808bbda9136aea1"
        ></iframe>
      </Center>
    </>
  );
};
