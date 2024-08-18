import { Image, Pressable, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "../ThemedView";

export default function IconButton({
  pressableProps,
  underlayProps,
  conteinerProps,
  imageProps,
}: {
  pressableProps?: React.ComponentProps<typeof Pressable>;
  underlayProps?: React.ComponentProps<typeof View>;
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
          position: "relative",
        },
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
          width: "100%",
          height: "100%",
          opacity: pressed ? 0.85 : 1,
        }}
      >
        <ThemedView colorName="none" {...conteinerProps}>
          <Image {...imageProps} />
        </ThemedView>
      </View>
    </Pressable>
  );
}
