import EmailSubscribe from "@/components/EmailSubscribe/EmailSubscribe";
import { Image, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TextButton from "@/components/buttons/TextButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { usePopupContext } from "@/context/PopupContext";
import { usePopoverContext } from "@/context/PopoverContext";
import IconButton from "@/components/buttons/IconButton";
import { mainScrollViewRef } from "@/hooks/mainScrollViewRef";
import { updateCartItems, useAppContext } from "@/context/AppProvider";
import { URL_BASE } from "@/constants/glabals";

export default function ProductPage() {
  return (
    <>
      <ProductDisplay />
      <EmailSubscribe />
    </>
  );
}

export function ProductDisplay() {
  const { product_id } = useLocalSearchParams<{
    product_id: string;
  }>();

  const borderColor = useThemeColor({}, "secondary_outline_text");
  const backgroundColor = useThemeColor({}, "secondary_outline_text");

  const popoverContext = usePopoverContext();
  const popupContext = usePopupContext();

  const { products, setCartItems, user } = useAppContext();
  const [showThankYouPopover, setShowThankYouPopover] = useState(false);

  const product = products.find((p) => +p.id === +product_id);

  if (!popoverContext) return;
  if (!popupContext) return;

  const { popupComponentName, setPopupData, setPopupVisible } = popupContext;
  const { popoverComponentName, setPopoverData, setPopoverVisible } =
    popoverContext;

  if (product == null) return;

  const { id, title, price, availability, description, vendor_code } = product;

  const image_link = product.iamge_link
    ? `${URL_BASE}${product.iamge_link}`
    : null;
  const product_code = vendor_code;

  let najavnist = "Немає в наявності";
  if (+availability === 1) najavnist = "Тимчасово немає";
  if (+availability === 2) najavnist = "Закінчується";
  if (+availability === 3) najavnist = "Є в наявності";

  const tag_array: [string, string][] = [
    ["Колір", "Сірий"],
    ["Матеріал", "Вельвет"],
    ["Подія", "Новий рік"],
  ];

  function addCartItem(product_id: number) {
    if (user == null) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      return;
    }
    const fd = new FormData();
    fd.append("user_id", String(user.id));
    fd.append("product_id", String(product_id));
    fd.append("quantity", "1");

    fetch(`${URL_BASE}/api/cartItems/create`, {
      method: "post",
      body: fd,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        updateCartItems(setCartItems);

        setPopupVisible(false);
        popupComponentName.current = "PopupCart";
        setPopupData({});
        setPopupVisible(true);
      });
  }
  return (
    <>
      <ThemedView style={styles.main_wrap} colorName="surface_background">
        <ThemedText style={styles.title} colorName="primary_outline_text">
          {title}
        </ThemedText>
        <View style={styles.product__top_info}>
          <ThemedText style={styles.product_code_wrap} colorName="surface_text">
            Артикул: {product_code}
          </ThemedText>
          <ThemedText
            style={styles.product_najavnist_wrap}
            colorName="surface_text"
          >
            {najavnist}
          </ThemedText>
        </View>
        <View style={styles.product_img_wrap}>
          <Image
            style={styles.product__preview__img}
            source={{
              uri: image_link,
            }}
            // source={{
            //   uri: imageUrl.toString(),
            // }}
          />
        </View>
        <View style={styles.product_price_wrap}>
          <ThemedText
            style={styles.product__price}
            colorName="secondary_outline_text"
          >
            {price}₴
          </ThemedText>
        </View>
        <View style={styles.product_bottom_wrap}>
          <View style={styles.product__bottom_buttons_wrap}>
            <TextButton
              underlayProps={{
                style: styles.product__bottom_buttons_button_wrap,
              }}
              pressableProps={{
                onPress: () => {
                  router.navigate("/return_polisy");
                  mainScrollViewRef.current?.scrollTo({
                    y: 0,
                    animated: false,
                  });
                },
              }}
              conteinerProps={{
                style: [
                  styles.product__bottom_buttons_button,
                  {
                    borderColor,
                    borderWidth: 1,
                  },
                ],
                colorName: "secondary_outline_background",
              }}
              textProps={{
                style: styles.product__bottom_buttons_button_text,
                colorName: "primary_outline_text",
              }}
            >
              Гарантія
            </TextButton>
            <TextButton
              underlayProps={{
                style: styles.product__bottom_buttons_button_wrap,
              }}
              pressableProps={{
                onPress: () => {
                  router.navigate("/payments");
                  mainScrollViewRef.current?.scrollTo({
                    y: 0,
                    animated: false,
                  });
                },
              }}
              conteinerProps={{
                style: [
                  styles.product__bottom_buttons_button,
                  {
                    borderColor,
                    borderWidth: 1,
                  },
                ],
                colorName: "secondary_outline_background",
              }}
              textProps={{
                style: styles.product__bottom_buttons_button_text,
                colorName: "primary_outline_text",
              }}
            >
              Варіанти оплати
            </TextButton>
            <TextButton
              underlayProps={{
                style: styles.product__bottom_buttons_button_wrap,
              }}
              pressableProps={{
                onPress: () => {
                  router.navigate("/delivery_across_ukraine");
                  mainScrollViewRef.current?.scrollTo({
                    y: 0,
                    animated: false,
                  });
                },
              }}
              conteinerProps={{
                style: [
                  styles.product__bottom_buttons_button,
                  {
                    borderColor,
                    borderWidth: 1,
                  },
                ],
                colorName: "secondary_outline_background",
              }}
              textProps={{
                style: styles.product__bottom_buttons_button_text,
                colorName: "primary_outline_text",
              }}
            >
              Доставка по Україні
            </TextButton>
          </View>
          <View style={styles.product__bottom_info}>
            <View style={styles.product__bottom_info_col}>
              <ThemedText
                style={styles.product__bottom_info_col_title}
                colorName="secondary_outline_text"
              >
                Характеристики
              </ThemedText>
              <View style={styles.product__bottom_info_col_content}>
                {tag_array.map(([tag_title, tag_value], i) => {
                  return (
                    <View
                      key={i}
                      style={styles.product__bottom_info_col_content_block}
                    >
                      <ThemedText
                        style={styles.product__bottom_info_col_content_text}
                        colorName="secondary_outline_text"
                      >
                        {tag_title}
                      </ThemedText>
                      <ThemedText
                        style={styles.product__bottom_info_col_content_text}
                        colorName="surface_text"
                      >
                        {tag_value}
                      </ThemedText>
                    </View>
                  );
                })}
              </View>
            </View>
            <View
              style={[styles.product__bottom_info_divider, { backgroundColor }]}
            ></View>
            <View style={styles.product__bottom_info_col}>
              <ThemedText
                style={styles.product__bottom_info_col_title}
                colorName="secondary_outline_text"
              >
                Опис
              </ThemedText>
              <View style={styles.product__bottom_info_col_content}>
                <ThemedText
                  style={styles.product__bottom_info_col_content_text}
                  colorName="surface_text"
                >
                  {description}
                </ThemedText>
              </View>
            </View>
          </View>
          <View style={styles.container__form__submit_button_block_wrap}>
            <View
              style={styles.container__form__submit_button_block_wrap_unwrap}
            >
              <TextButton
                underlayProps={{
                  style: styles.container__form__submit_button_wrap,
                }}
                pressableProps={{
                  onPress: () => {
                    addCartItem(+product.id)
                  },
                }}
                conteinerProps={{
                  style: styles.container__form__submit_button,
                  colorName: "primary_background",
                }}
                textProps={{
                  style: styles.container__form__submit_button_text,
                  colorName: "primary_text",
                }}
              >
                КУПИТИ
              </TextButton>
              <TextButton
                underlayProps={{
                  style: styles.container__form__submit_button_wrap,
                }}
                pressableProps={{
                  onPress: () => {
                    setPopupVisible(false);
                    popupComponentName.current = "PopupBuy";
                    setPopupData({
                      successCallback: () => {
                        setShowThankYouPopover(true);
                      },
                    });
                    setPopupVisible(true);
                  },
                }}
                conteinerProps={{
                  style: [
                    styles.container__form__submit_button,
                    {
                      borderColor,
                      borderWidth: 1,
                    },
                  ],
                  colorName: "secondary_outline_background",
                }}
                textProps={{
                  style: styles.container__form__submit_button_text,
                  colorName: "secondary_outline_text",
                }}
              >
                ШВИДКА ПОКУПКА
              </TextButton>
              {showThankYouPopover ? (
                <ThemedView
                  style={styles.filter__popup_container}
                  colorName="secondary_outline_background"
                >
                  <ThemedText
                    style={[styles.filter__popup__text]}
                    colorName="surface_text"
                  >
                    Дякуємо за замовлення! Менеджер скоро зв'яжеться з вами.
                  </ThemedText>
                  <IconButton
                    pressableProps={{
                      style: [styles.filter__popup_close_button_icon],
                      onPress: () => {
                        setShowThankYouPopover(false);
                      },
                    }}
                    conteinerProps={{
                      style: styles.filter__popup_close_button__container,
                      colorName: "surface_background",
                    }}
                    imageProps={{
                      resizeMode: "contain",
                      style: styles.filter__popup_close_button__image,
                      source: require("@/assets/images/icons/close-filter-icon.png"),
                    }}
                  />
                </ThemedView>
              ) : null}
            </View>
          </View>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  main_wrap: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 700,
  },
  product__top_info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  product_najavnist_wrap: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 400,
  },
  product_code_wrap: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 400,
  },
  product_img_wrap: {
    width: "100%",
    maxWidth: 500,
    aspectRatio: 1 / 1,
    marginLeft: "auto",
    marginRight: "auto",
  },
  product__preview__img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  product_price_wrap: {},
  product__price: {
    lineHeight: 40,
    fontSize: 32,
    fontWeight: 600,
  },
  container__form__submit_button_wrap: {
    borderRadius: 4,
    marginVertical: 8,
  },
  container__form__submit_button: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 4,
    marginVertical: 8,
  },
  container__form__submit_button_text: {
    textAlign: "center",
  },
  product__bottom_info: {
    flexDirection: "row",
    gap: 16,
  },
  product__bottom_info_col: {
    flexBasis: 1,
    flexGrow: 1,
    gap: 8,
  },
  product__bottom_info_divider: {
    width: 1,
  },
  product__bottom_info_col_title: {
    lineHeight: 24,
    fontSize: 20,
    fontWeight: 400,
  },
  product__bottom_info_col_content: {
    gap: 28,
  },
  product__bottom_info_col_content_text: {
    lineHeight: 20,
    fontSize: 16,
    fontWeight: 500,
  },
  product__bottom_info_col_content_block: {
    gap: 2,
  },
  product__bottom_buttons_wrap: {
    gap: 12,
  },

  product__bottom_buttons_button_wrap: {},

  product__bottom_buttons_button: {
    height: 56,
    paddingHorizontal: 32,
    justifyContent: "center",
  },

  product__bottom_buttons_button_text: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 700,
  },
  container__form__submit_button_block_wrap: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
  },
  container__form__submit_button_block_wrap_unwrap: {
    width: "100%",
    alignSelf: "center",
    margin: 4,
  },
  product_bottom_wrap: {
    gap: 16,
    paddingBottom: 4,
    flexDirection: "column-reverse",
  },
  filter__popup_close_button_icon: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 8,
    right: 8,
  },
  filter__popup_close_button__container: {
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  filter__popup_close_button__image: {
    height: 24,
    objectFit: "contain",
  },
  filter__popup__text: {},
  filter__popup_container: {
    width: "100%",
    position: "absolute",
    top: "100%",
    padding: 24,
    left: 0,
    right: 0,
    shadowOffset: { width: -8, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 28,
  },
});
