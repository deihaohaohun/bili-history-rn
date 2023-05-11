import { Button } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";

export function LoadingButton(props) {
  const [isLoading, setIsLoading] = useState(false);

  let { children, onPress } = props;

  const showTip = async func => {
    return new Promise(res => {
      Alert.alert("提示", "确定追一集?", [
        {
          text: "取消",
          onPress: () => res(true),
        },
        {
          text: "确定",
          onPress: async () => {
            await func();
            res(true);
            return true;
          },
        },
      ]);
    });
  };

  const onClicked = async () => {
    setIsLoading(true);

    try {
      await showTip(onPress);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      {...props}
      onPress={() => {
        onClicked();
      }}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
}
