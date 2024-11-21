import { usePopupContext } from "@/context/PopupContext";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useState } from "react";
import IconButton from "../buttons/IconButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import TextButton from "../buttons/TextButton";
import { Sizes } from "@/constants/Sizes";
import React from "react";
import { URL_BASE } from "@/constants/glabals";
import { useAppContext } from "@/context/AppProvider";
import ViewButton from "../buttons/ViewButton";

export default function PopupSignIn() {
  const popupContext = usePopupContext();
  if (!popupContext) return;

  const { popupComponentName, setPopupData, setPopupVisible } = popupContext;
  const borderColor = useThemeColor(
    {
      light: "#D9D9D9",
      dark: "#D9D9D9",
    },
    "surface_outline_background"
  );
  const color = useThemeColor({}, "surface_text");
  const [phone, onChangePhone] = useState("+380");
  const [confirmCode, onChangeConfirmCode] = useState("");
  const [isCoonfirmation, setIsConfirmation] = useState(false);
  const { user, setUser } = useAppContext();

  function login() {
    const fd = new FormData();
    fd.append("phone", phone);

    fetch(`${URL_BASE}/api/users/login_by_phone`, {
      method: "post",
      body: fd,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  function verifyLogin() {
    const fd = new FormData();
    fd.append("phone", phone);
    fd.append("code", confirmCode);

    fetch(`${URL_BASE}/api/users/verify_login`, {
      method: "post",
      body: fd,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === "Phone error") return;
        setUser(data.user);
        if (!data.user.address_id) {
        }

        setPopupVisible(false);
      });
  }
  return (
    <>
      <ViewButton
        pressableProps={{
          style: {
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            opacity: 0.2
          },
          onPress: () => {
            setPopupVisible(false);
          },
        }}
      />
      <View style={styles.backdrop} />
      <ThemedView style={styles.container} colorName="surface_background">
        <ThemedText
          style={styles.container__header}
          colorName="secondary_outline_text"
        >
          Авторизація
        </ThemedText>

        {!isCoonfirmation ? (
          <>
            <View>
              <ThemedText
                style={styles.container__input_label}
                colorName="secondary_outline_text"
              >
                Ваш телефон
              </ThemedText>
              <TextInput
                style={[
                  {
                    color,
                    borderColor,
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
            <TextButton
              underlayProps={{
                style: styles.container__form__submit_button_wrap,
              }}
              pressableProps={{
                onPress: () => {
                  login();
                  setIsConfirmation(true);
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
              Увійти
            </TextButton>
            <TextButton
              underlayProps={{
                style: styles.container__form__submit_button_wrap,
              }}
              pressableProps={{
                onPress: () => {
                  setPopupVisible(false);
                  popupComponentName.current = "PopupSignUp";
                  setPopupData({});
                  setPopupVisible(true);
                },
              }}
              conteinerProps={{
                style: styles.container__form__submit_button,
                colorName: "secondary_outline_background",
              }}
              textProps={{
                style: styles.container__form__submit_button_text,
                colorName: "secondary_outline_text",
              }}
            >
              Реєстрація
            </TextButton>
          </>
        ) : (
          <>
            <View>
              <ThemedText
                style={styles.container__input_label}
                colorName="secondary_outline_text"
              >
                Пароль із смс
              </ThemedText>
              <TextInput
                style={[
                  {
                    color,
                    borderColor,
                  },
                  styles.container__input,
                ]}
                onChangeText={onChangeConfirmCode}
                value={confirmCode}
                placeholder=""
                keyboardType="number-pad"
                inputMode="numeric"
              />
            </View>
            <TextButton
              underlayProps={{
                style: styles.container__form__submit_button_wrap,
              }}
              pressableProps={{
                onPress: () => {
                  verifyLogin();
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
              Підтвердити
            </TextButton>
            <TextButton
              underlayProps={{
                style: styles.container__form__submit_button_wrap,
              }}
              pressableProps={{
                onPress: () => {
                  setPopupVisible(false);
                  popupComponentName.current = "PopupSignUp";
                  setPopupData({});
                  setPopupVisible(true);
                },
              }}
              conteinerProps={{
                style: styles.container__form__submit_button,
                colorName: "secondary_outline_background",
              }}
              textProps={{
                style: styles.container__form__submit_button_text,
                colorName: "secondary_outline_text",
              }}
            >
              Реєстрація
            </TextButton>
          </>
        )}

        <IconButton
          pressableProps={{
            style: [styles.container__form__close_button_pressable],
            onPress: () => {
              setPopupVisible(false);
            },
          }}
          conteinerProps={{
            style: [styles.container__form__close_button],
            colorName: "surface_background",
          }}
          imageProps={{
            style: [styles.container__form__close_button_image],
            source: require("@/assets/images/icons/popup-close-icon.png"),
          }}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: Sizes.HEADER_HEIGHT,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "#000000",
    opacity: 0.2,
    pointerEvents: "none",
  },
  container: {
    position: "absolute",
    top: Sizes.HEADER_HEIGHT,
    right: 0,
    left: 0,

    borderRadius: 8,
    shadowOffset: { width: -8, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 28,
    rowGap: 16,
    paddingHorizontal: 40,
    paddingVertical: 32,
  },
  container__header: {
    fontWeight: 500,
    fontSize: 24,
    lineHeight: 32,
  },
  container__input_label: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
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
  container__form: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  container__form__submit_button_wrap: {
    borderRadius: 4,
  },
  container__form__submit_button: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 4,
  },
  container__form__submit_button_text: {
    textAlign: "center",
  },
  container__form__close_button_pressable: {
    position: "absolute",
    top: 12,
    right: 12,
    height: 24,
    width: 24,
  },
  container__form__close_button: {
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container__form__close_button_image: {
    height: 24,
    objectFit: "contain",
  },
});
