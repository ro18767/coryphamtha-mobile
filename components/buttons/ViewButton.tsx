import { Image, Pressable, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

export default function ViewButton({
  pressableProps,
  conteinerProps,
  children,
}: {
  pressableProps?: React.ComponentProps<typeof Pressable>;
  conteinerProps?: React.ComponentProps<typeof ThemedView>;
  children?: React.ComponentProps<typeof ThemedText>["children"];
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      {...pressableProps}
      onPressOut={(event) => {
        setPressed(false);
        pressableProps?.onPressOut?.(event);
      }}
      onPressIn={(event) => {
        setPressed(true);
        pressableProps?.onPressIn?.(event);
      }}
      style={(state) => [
        pressed
          ? {
              backgroundColor: "rgb(0, 0, 0)",
              userSelect: "none",
            }
          : undefined,
        typeof pressableProps?.style === "function"
          ? pressableProps.style(state)
          : pressableProps?.style,
      ]}
    >
      <View
        style={{
          opacity: pressed ? 0.85 : 1,
          width: "100%",
          height: "100%",
        }}
      >
        <ThemedView {...conteinerProps}>{children}</ThemedView>
      </View>
    </Pressable>
  );
}
