import TextButton from "@/components/buttons/TextButton";
import ViewButton from "@/components/buttons/ViewButton";
import CartBlock from "@/components/Cart/ProductList/CartBlock";
import ProductList from "@/components/Cart/ProductList/ProductList";
import { ThemedText } from "@/components/ThemedText";
import { URL_BASE } from "@/constants/glabals";
import {
  useAppContext,
  updateCartItems,
  updateOrders,
  updateOrdersItems,
} from "@/context/AppProvider";
import { usePopupContext } from "@/context/PopupContext";
import { mainScrollViewRef } from "@/hooks/mainScrollViewRef";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

export default function CartPage() {
  const {
    loading,
    user,
    cartItems,
    setCartItems,
    setOrders,
    setOrderItems,
    products,
  } = useAppContext();

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
  const [fname, onChangeFname] = useState<string>(String(""));
  const [lname, onChangeLname] = useState<string>(String(""));
  const [phone, onChangePhone] = useState<string>(String(""));
  const [email, onChangeEmail] = useState<string>(String(""));
  const [city, onChangeCity] = useState<string>("");
  const [street, onChangeStreet] = useState<string>("");
  const [home, onChangeHome] = useState<string>("");
  const [comment, onChangeComment] = useState<string>("");
  const [postOffice, onChangePostOffice] = useState<string>("");

  const popupContext = usePopupContext();

  useEffect(() => {
    if (loading) return;
    if (!popupContext) return;

    const { popupComponentName, setPopupData, setPopupVisible } = popupContext;

    if (user == null) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      setTimeout(() => {
        router.navigate("/(home)");
        mainScrollViewRef.current?.scrollTo({
          y: 0,
          animated: false,
        });
      }, 0);
      return;
    }
    if (!("id" in user)) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      setTimeout(() => {
        router.navigate("/(home)");
        mainScrollViewRef.current?.scrollTo({
          y: 0,
          animated: false,
        });
      }, 0);
      return;
    }

    onChangeFname(user.firstName);
    onChangeLname(user.lastName);
    onChangePhone(user.phone);
    onChangeEmail(user.email ?? "");
  }, [loading]);

  if (!popupContext) return;
  if (user == null) return;

  const { popupComponentName, setPopupData, setPopupVisible } = popupContext;
  function createOrder() {
    if (user == null) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      return;
    }
    if (!("id" in user)) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      return;
    }
    if (user.id == null) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      return;
    }

    const fd = new FormData();
    fd.append("user_id", String(user.id));
    fd.append("user_phone", String(user.phone));

    fetch(`${URL_BASE}/api/Orders/create`, {
      method: "post",
      body: fd,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.data.id) {
          const order_id = data.data.id;

          Promise.allSettled(
            cartItems
              .filter((cartItem) => cartItem.user_id === user.id)
              .map((cartItem) => {
                const fd = new FormData();
                fd.append("order_id", String(order_id));
                fd.append("product_id", String(cartItem.product_id));
                fd.append("quantity", String(1));
                return fetch(`${URL_BASE}/api/OrderItems/create`, {
                  method: "post",
                  body: fd,
                })
                  .then((res) => {
                    return res.json();
                  })
                  .then((data) => {
                    console.log(data);
                  });
              })
          )
            .then(() => {
              return Promise.allSettled(
                cartItems
                  .filter((cartItem) => cartItem.user_id === user.id)
                  .map((cartItem) => {
                    return fetch(
                      `${URL_BASE}/api/cartItems/delete/${cartItem.id}`
                    )
                      .then((res) => {
                        return res.json();
                      })
                      .then((data) => {
                        console.log(data);
                      });
                  })
              );
            })
            .then(() => {
              return Promise.allSettled([
                updateCartItems(setCartItems),
                updateOrders(setOrders),
                updateOrdersItems(setOrderItems),
              ]);
            })
            .finally(()=>{
              router.navigate('/thank_you')
              mainScrollViewRef.current?.scrollTo({
                y: 0,
                animated: false,
              });
            });
        }
      });
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
            defaultValue={fname}
            key="fname"
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
            defaultValue={lname}
            key="lname"
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
            defaultValue={phone}
            key="phone"
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
            defaultValue={email}
            key="email"
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
            defaultValue={city}
            key="city"
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
            defaultValue={postOffice}
            key="postOffice"
            placeholder=""
            keyboardType="default"
            inputMode="text"
            readOnly={!editMode}
          />
        </View>

        <View
          style={[
            styles.form_section,
            {
              paddingBottom: 40,
            },
          ]}
        >
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
            defaultValue={comment}
            key="comment"
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
                createOrder();
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
