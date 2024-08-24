import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useState } from "react";
import IconButton from "../buttons/IconButton";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function EmailSubscribe() {
  const color = useThemeColor({}, "surface_text");
  const [text, onChangeText] = useState("");

  return (
    <ThemedView style={styles.container} colorName="secondary_background">
      <ThemedText style={styles.container__header} colorName="secondary_text">
        Підпишись та будь першим
      </ThemedText>
      <View style={styles.container__form}>
        <ThemedView
          style={styles.container__form__email_input__wrap}
          colorName="surface_background"
        >
          <TextInput
            style={[
              {
                color,
              },
              styles.container__form__email_input,
            ]}
            onChangeText={onChangeText}
            value={text}
            placeholder="Ваш e-mail"
            keyboardType="email-address"
          />
        </ThemedView>
        <IconButton
          pressableProps={{
            style: [styles.container__form__submit_button],
            onPress: () => {},
          }}
          conteinerProps={{
            style: styles.container__form__submit_button__container,
            colorName: "primary_background",
          }}
          imageProps={{
            style: styles.container__form__submit_button__image,
            source: require("@/assets/images/icons/email-icon.png"),
          }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 36,
    rowGap: 22
  },
  container__header: {
    fontWeight: 700,
    fontSize: 28,
    lineHeight: 32,
  },
  container__form: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  container__form__email_input__wrap: {
    flexGrow: 1,
    height: 48,
  },
  container__form__email_input: {
    paddingHorizontal: 16,
    width: "100%",
    height: "100%",
  },
  container__form__submit_button: {
    width: 64,
    height: 48,
  },
  container__form__submit_button__container: {
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container__form__submit_button__image: {
    height: 24,
    objectFit: "contain",
  },
});
