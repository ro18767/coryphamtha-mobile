import { Image, Pressable, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../ThemedView";

export default function IconButton({
  pressableProps,
  conteinerProps,
  imageProps,
}: {
  pressableProps?: React.ComponentProps<typeof Pressable>;
  conteinerProps?: React.ComponentProps<typeof ThemedView>;
  imageProps?: React.ComponentProps<typeof Image>;
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
        {
          backgroundColor: pressed ? "rgb(0, 0, 0)" : "",
        },
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
        <ThemedView {...conteinerProps}>
          <Image {...imageProps} />
        </ThemedView>
      </View>
    </Pressable>
  );
}
