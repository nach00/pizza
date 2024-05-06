import React from "react";
import { Platform, Text } from "react-native";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import { Paragraph, YStack } from "tamagui";

function JsonViewer({ jsonData }) {
  const fontFamily = Platform.OS === "ios" ? "Courier New" : "monospace";

  return (
    <YStack>
      <YStack margin="auto">
        <Paragraph size="$6">
          <JsonView src={jsonData} enableClipboard={true} dark={true} />
        </Paragraph>
      </YStack>
    </YStack>
  );
}

export default JsonViewer;
