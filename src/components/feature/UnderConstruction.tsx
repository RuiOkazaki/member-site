import { Text } from "@mantine/core";
import Image from "next/image";
import { FC } from "react";

export const UnderConstruction: FC = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <Text size="xl" weight="bold">
        開発中です🛠
      </Text>
      <Image
        src={"/other/under_construction.svg"}
        alt="現在このページは使用することができません。"
        width={700}
        height={430}
      />
    </div>
  );
};
