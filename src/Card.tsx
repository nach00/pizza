import { Stack, XStack } from "tamagui";
import React from "react";
import { LinearGradient } from "tamagui/linear-gradient";

export type HomeCardTypes = {
  children?: any;
};

export function MainCard({ children }: HomeCardTypes) {
  return (
    <LinearGradient
      colors={["#0F0F2D", "#182E5E"]}
      start={[0, -10]}
      end={[-10, 0]}
      backgroundColor="#0F0F2D"
      padding={24}
      paddingBottom={48}
      // borderColor="$color4"
      // borderWidth="$1"
      borderRadius="$10"
      width={500}
      style={{
        boxShadow:
          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      }}
    >
      {children}
    </LinearGradient>
  );
}

export function IconContainer({ children }: HomeCardTypes) {
  return (
    <Stack
      col="$color11"
      bc="#2F5592"
      // boc="$color5"
      // bw="$1"
      ai="center"
      w={60}
      h={60}
      gap="$2"
      jc="center"
      br="$12"
    >
      {children}
    </Stack>
  );
}
