import TextButton from "@/components/buttons/TextButton";
import ViewButton from "@/components/buttons/ViewButton";
import CartBlock from "@/components/Cart/ProductList/CartBlock";
import ProductList from "@/components/Cart/ProductList/ProductList";
import { ThemedText } from "@/components/ThemedText";
import { useAppContext } from "@/context/AppProvider";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

export default function CartPage() {
  const { user, setUser } = useAppContext();

  const borderColor = useThemeColor({}, "secondary_outline_text");
  const color = useThemeColor({}, "secondary_outline_text");
  const backgroundColor = useThemeColor(
    {
      light: "#CA9F141A",
      dark: "#CA9F141A",
    },
    "none"
  );

  const [editMode, setEditMode] = useState(true);
  const [fname, onChangeFname] = useState<string>(String(user?.firstName ?? ""));
  const [lname, onChangeLname] = useState<string>(String(user?.lastName ?? ""));
  const [phone, onChangePhone] = useState<string>(String(user?.phone ?? ""));
  const [email, onChangeEmail] = useState<string>(String(""));
  const [city, onChangeCity] = useState<string>("");
  const [street, onChangeStreet] = useState<string>("");
  const [home, onChangeHome] = useState<string>("");
  const [comment, onChangeComment] = useState<string>("");
  const [postOffice, onChangePostOffice] = useState<string>("");

  function updateUser() {
    if (user == null) return;
    if (!("id" in user)) return;
    if (user.id == null) return;

    const fd = new FormData();
    fd.append("fname", fname);
    fd.append("lname", lname);
    fd.append("phone", phone);
    fd.append("city", city);
    fd.append("street", street);
    fd.append("home", home);
    fd.append("comment", comment);
    fd.append("postOffice", comment);
  }
  return (
    <>
      <View style={styles.form_wrap}>
        <View style={styles.form_title_wrap}>
          <ThemedText
            style={styles.form_title}
            colorName="primary_outline_text"
          >
            Оформлення замовлення
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
            readOnly={!editMode}
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
            readOnly={!editMode}
          />
        </View>

        <View style={styles.form_section}>
          <ThemedText
            style={styles.container__input_label}
            colorName="surface_text"
          >
            Номер телефону
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
            readOnly
          />
        </View>

        <View style={styles.form_section}>
          <ThemedText
            style={styles.container__input_label}
            colorName="surface_text"
          >
            Ваш Email
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
            onChangeText={onChangeEmail}
            value={email}
            placeholder=""
            keyboardType="default"
            inputMode="text"
            readOnly={!editMode}
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
            readOnly={!editMode}
          />
        </View>

        <View style={styles.form_section}>
          <ThemedText
            style={styles.container__input_label}
            colorName="surface_text"
          >
            Відділення Нової Пошти
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
            onChangeText={onChangePostOffice}
            value={postOffice}
            placeholder=""
            keyboardType="default"
            inputMode="text"
            readOnly={!editMode}
          />
        </View>

        <View style={[styles.form_section, {
          paddingBottom: 40
        }]}>
          <ThemedText
            style={styles.container__input_label}
            colorName="surface_text"
          >
            Коментар до замовлення
          </ThemedText>
          <TextInput
            style={[
              {
                color,
                borderColor,
                backgroundColor,
              },
              styles.container__input,
              styles.container__input_textarea,
            ]}
            onChangeText={onChangeComment}
            value={comment}
            placeholder=""
            keyboardType="default"
            inputMode="text"
            readOnly={!editMode}
          />
        </View>
      </View>
      <ProductList />
      <View style={styles.form_wrap}>
        <View style={styles.container__form__submit_button_wrap_wrap}>
          <TextButton
            underlayProps={{
              style: styles.container__form__submit_button_wrap,
            }}
            pressableProps={{
              onPress: () => {
                updateUser();
                setEditMode(false);
              },
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
            Замовлення підтверджую
          </TextButton>
        </View>
      </View>
    </>
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
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12 - 1, // minus borderWidth
    paddingVertical: 16 - 1, // minus borderWidth
    borderRadius: 4,
    borderWidth: 1,
  },
  container__input_textarea: {
    height: 180,
  },
  form_section: {},
  form_title_wrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    gap: 16,
  },
  form_title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: 700,
  },
  form_wrap: {
    gap: 8,
    paddingHorizontal: 24,
  },

  container__form__submit_button_wrap_wrap: {
    paddingTop: 20,
    paddingBottom: 40,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container__form__submit_button_wrap: {
    borderRadius: 4,
  },
  container__form__submit_button: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 16,
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
  form_title_icon_wrap: {},
  form_title_icon: {
    width: 28,
    height: 28,
  },
  edit_button_pressable_wrap: {},
  edit_button_conteiner_wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  edit_button_text: {},
  edit_button_text_icon_wrap: {},
  edit_button_wrap: {
    paddingTop: 20,
    flexDirection: "row-reverse",
  },
});
