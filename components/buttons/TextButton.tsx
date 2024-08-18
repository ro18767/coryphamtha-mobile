import { Image, Pressable, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

export default function TextButton({
  pressableProps,
  underlayProps,
  conteinerProps,
  textProps,
  children,
}: {
  pressableProps?: React.ComponentProps<typeof Pressable>;
  underlayProps?: React.ComponentProps<typeof View>;
  conteinerProps?: React.ComponentProps<typeof ThemedView>;
  textProps?: React.ComponentProps<typeof ThemedText>;
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
        { position: "relative" },
        typeof pressableProps?.style === "function"
          ? pressableProps.style(state)
          : pressableProps?.style,
      ]}
    >
      {pressed && (
        <View
          {...underlayProps}
          style={[
            {
                 position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "auto",
              height: "auto",
              backgroundColor: "rgb(0, 0, 0)",
            },
            underlayProps?.style,
          ]}
        />
      )}
      <View
        style={{
          opacity: pressed ? 0.85 : 1,
        }}
      >
        <ThemedView colorName="none" {...conteinerProps}>
          <ThemedText {...textProps}>{children}</ThemedText>
        </ThemedView>
      </View>
    </Pressable>
  );
}
