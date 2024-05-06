import "@tamagui/core/reset.css";

import { Button, TamaguiProvider, Theme, XStack, YStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

import config from "./tamagui.config";
import PizzaOrderApp from "./PizzaOrderApp";
import JsonViewer from "./JsonViewer";
import { useState } from "react";

export const Root = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleJsonDataChange = (data) => {
    setJsonData(data);
  };
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <Theme name="blue">
        <XStack f={1}>
          <YStack f={3} w="100%" bc="#14181F" jc="center" ai="center">
            <PizzaOrderApp onJsonDataChange={handleJsonDataChange} />
          </YStack>

          <YStack f={1} w="100%" bc="#1E1E1E" jc="center" ai="cente">
            <JsonViewer jsonData={jsonData} />
          </YStack>
        </XStack>
      </Theme>
    </TamaguiProvider>
  );
};
