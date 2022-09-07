import { Text } from "@mantine/core";
import { FC } from "react";

export const Events: FC = () => {
  return (
    <>
      <Text component="span" align="center" size="xl" weight={700}>
        イベント
      </Text>
    </>
  );
};

// todo: firestoreに保存する時に、画像のレイアウトを整えてから保存する
