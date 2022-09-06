import { Drawer, Text } from "@mantine/core";
import { FC } from "react";
import { Notification } from "../../utils/libs/firebase/index";

type Props = {
  bellOpened: boolean;
  setBellOpened: () => void;
  data: Notification | undefined;
};

export const NotificationDrawer: FC<Props> = ({ bellOpened, setBellOpened, data }) => {
  return (
    <Drawer
      opened={bellOpened}
      onClose={setBellOpened}
      position="right"
      overlayOpacity={0.55}
      overlayBlur={3}
      size="30%"
      transitionDuration={250}
    >
      <div className="pl-5">
        {data !== undefined ? (
          <></>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Text weight={700}>通知はありません</Text>
            <Text className="text-2xl" weight={700}>
              🦔
            </Text>
          </div>
        )}
      </div>
    </Drawer>
  );
};

// todo: 実装後回し
