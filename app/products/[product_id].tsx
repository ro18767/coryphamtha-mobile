import EmailSubscribe from "@/components/EmailSubscribe/EmailSubscribe";
import { Image, StyleSheet, View } from "react-native";
import { useLocalSearchParams, useGlobalSearchParams } from "expo-router";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TextButton from "@/components/buttons/TextButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import PopupBuy from "@/components/Popup/PopupBuy";
import { usePopupContext } from "@/context/PopupContext";

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
  const popupContext = usePopupContext();
  if (!popupContext) return;

  const { popupComponentRef, setPopupData, setPopupVisible } = popupContext;

  const borderColor = useThemeColor({}, "secondary_outline_text");
  const backgroundColor = useThemeColor({}, "secondary_outline_text");
  const title = "Бантик оксамитовий сірий";
  const product_code = "111156";
  const najavnist = "Є в наявності";
  const price = "268";
  const description =
    "Бантик оксамитовий сірий 23 х 25 см, вроблений з матеріалу вельвет у магазині Ботаніка по кращій ціні. \nВеликий асортимент товарів у категорії Бантики з доставкою по Україні.";
  const tag_array: [string, string][] = [
    ["Колір", "Сірий"],
    ["Матеріал", "Вельвет"],
    ["Подія", "Новий рік"],
  ];

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
            source={require("@/assets/images/example/image 58.png")}
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
        <View>
          <TextButton
            underlayProps={{
              style: styles.container__form__submit_button_wrap,
            }}
            pressableProps={{
              onPress: () => {},
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
              onPress: () => {console.log('test');
              
                popupComponentRef.current = PopupBuy;
                setPopupData({});
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
        <View style={styles.product__bottom_buttons_wrap}>
          <TextButton
            underlayProps={{
              style: styles.product__bottom_buttons_button_wrap,
            }}
            pressableProps={{
              onPress: () => {},
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
              onPress: () => {},
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
              onPress: () => {},
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
    aspectRatio: 1 / 1,
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
});
