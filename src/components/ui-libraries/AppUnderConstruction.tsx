import { Text } from "@mantine/core";
import Image from "next/image";
import { FC } from "react";

type Props = {
  ImageWidht?: number;
  ImageHeight?: number;
  textSize?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
};

export const AppUnderConstruction: FC<Props> = ({ ImageWidht, ImageHeight, textSize, className }) => {
  return (
    <div className={`text-center opacity-80 ${className}`}>
      <Text size={textSize || "xl"} weight={600}>
        開発中です🛠
      </Text>
      <Image
        src={"/other/under_construction.svg"}
        alt="現在このページは使用することができません。"
        width={ImageWidht || 700}
        height={ImageHeight || 430}
      />
    </div>
  );
};
