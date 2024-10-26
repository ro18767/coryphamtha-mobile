import { StyleSheet, Text, TextInput, View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import IconButton from "@/components/buttons/IconButton";
import TextButton from "@/components/buttons/TextButton";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import ViewButton from "../buttons/ViewButton";

export default function PageContent() {
  const borderColor = useThemeColor({}, "secondary_outline_text");
  const color = useThemeColor({}, "secondary_outline_text");
  const backgroundColor = useThemeColor(
    {
      light: "#CA9F141A",
      dark: "#CA9F141A",
    },
    "none"
  );
  const [fname, onChangeFname] = useState("Анна");
  const [lname, onChangeLname] = useState("Галян");
  const [phone, onChangePhone] = useState("+380");
  const [city, onChangeCity] = useState("Одеса");
  const [street, onChangeStreet] = useState("Балківська");
  const [home, onChangeHome] = useState("150А");
  const [bday, onChangeBday] = useState("");
  const [gender, onChangeGender] = useState("");

  return (
    <View style={styles.form_wrap}>
      <View style={styles.form_title_wrap}>
        <ThemedText
          style={styles.form_title}
          colorName="secondary_outline_text"
        >
          Персональні дані
        </ThemedText>
      </View>
      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Ім'я
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangeFname}
          value={fname}
          placeholder=""
          keyboardType="default"
          inputMode="text"
        />
      </View>

      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Прізвище
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangeLname}
          value={lname}
          placeholder=""
          keyboardType="default"
          inputMode="text"
        />
      </View>

      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Ваш телефон
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangePhone}
          value={phone}
          placeholder=""
          keyboardType="phone-pad"
          inputMode="tel"
        />
      </View>

      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Місто
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangeCity}
          value={city}
          placeholder=""
          keyboardType="default"
          inputMode="text"
        />
      </View>

      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Вулиця
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangeStreet}
          value={street}
          placeholder=""
          keyboardType="default"
          inputMode="text"
        />
      </View>

      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Номер будинку / квартири
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangeHome}
          value={home}
          placeholder=""
          keyboardType="default"
          inputMode="text"
        />
      </View>

      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Дата народження
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangeBday}
          value={bday}
          placeholder=""
          keyboardType="default"
          inputMode="text"
        />
      </View>

      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Стать
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangeGender}
          value={gender}
          placeholder=""
          keyboardType="default"
          inputMode="text"
        />
      </View>

      <View style={styles.container__form__submit_button_wrap_wrap}>
        <TextButton
          underlayProps={{
            style: styles.container__form__submit_button_wrap,
          }}
          pressableProps={{
            onPress: () => {},
          }}
          conteinerProps={{
            style: styles.container__form__submit_button,
            colorName: "secondary_background",
          }}
          textProps={{
            style: styles.container__form__submit_button_text,
            colorName: "secondary_text",
          }}
        >
          Зберегти
        </TextButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container__input_label: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  container__input: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12 - 1, // minus borderWidth
    paddingVertical: 16 - 1, // minus borderWidth
    borderRadius: 4,
    borderWidth: 1,
  },
  form_section: {},
  form_title_wrap: {},
  form_title: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 500,
  },
  form_wrap: {
    gap: 8,
    paddingHorizontal: 24,
  },

  container__form__submit_button_wrap_wrap: {
    paddingTop: 20,
    paddingBottom: 48,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  container__form__submit_button_wrap: {
    borderRadius: 4,
  },
  container__form__submit_button: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 80,
    paddingVertical: 16,
    borderRadius: 4,
  },
  container__form__submit_button_text: {
    textAlign: "center",
    
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
  },
  container__form__close_button_pressable: {
    position: "absolute",
    top: 12,
    right: 12,
    height: 24,
    width: 24,
  },
});
