import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import IconButton from "@/components/buttons/IconButton";
import TextButton from "@/components/buttons/TextButton";
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import ViewButton from "../buttons/ViewButton";

type PopularProduct = {
  title: string;
  source: ImageSourcePropType;
};

const item_list_data: PopularProduct[] = [
  {
    title: "Свічки та аромати",
    source: require("@/assets/images/example/image 58.png"),
  },
  {
    title: "LED лампи",
    source: require("@/assets/images/example/image 54.png"),
  },
  {
    title: "Стакани",
    source: require("@/assets/images/example/image 56.png"),
  },
  {
    title: "Кошики для зберігання",
    source: require("@/assets/images/example/image 87.png"),
  },
  {
    title: "Посуд з нової колекції",
    source: require("@/assets/images/example/image 55.png"),
  },
];

export default function HomePopularProductsList() {
  // const color = useThemeColor({}, "surface_text");
  // const borderColor = useThemeColor(
  //   {
  //     light: "#D9D9D9",
  //     dark: "#D9D9D9",
  //   },
  //   "surface_outline_background"
  // );
  return (
    <View style={[styles.conteiner]}>
      <ThemedText colorName="primary_outline_text" style={[styles.header_text]}>
        Сенсації сезону
      </ThemedText>
      <View style={[styles.items_wrap]}>
        {item_list_data.map((item_data, i) => (
          <HomePopularProduct key={i} data={item_data} />
        ))}
      </View>
    </View>
  );
}

function HomePopularProduct({ data }: { data: PopularProduct }) {
  const { title, source } = data;
  const borderColor = useThemeColor({}, "secondary_outline_text");
  return (
    <View style={[styles.product_wrap, { borderColor }]}>
      <View style={[styles.product_image_wrap_pos]}>
        <Image source={source} style={[styles.product_image]} />
      </View>
      <View style={[styles.product_wrap_button_wrap]}>
        <ThemedText
          colorName="primary_outline_text"
          style={[styles.product_header_text]}
        >
          {title}
        </ThemedText>

        <ViewButton
          pressableProps={{
            style: styles.product_button_pressable_wrap,
            onPress: () => {},
          }}
          conteinerProps={{
            colorName: "secondary_background",
            style: styles.product_button_conteiner_wrap,
          }}
        >
          <View style={[styles.product_button_text_wrap]}>
            <ThemedText
              colorName="secondary_text"
              style={[styles.product_button_text]}
            >
              До каталогу
            </ThemedText>
            <View style={[styles.product_button_text_icon_wrap]}>
              <Image
                source={require("@/assets/images/icons/folow-link-button-icon.png")}
              />
            </View>
          </View>
        </ViewButton>
      </View>
      <View style={[styles.product_image_wrap]}></View>
    </View>
  );
}

//folow-link-button-icon
//require("@/assets/images/icons/folow-link-button-icon.png")
const styles = StyleSheet.create({
  conteiner: {
    width: "100%",
    minHeight: 300,
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 24,
    position: "relative",
    padding: 24,
  },
  header_text: {
    fontWeight: 700,
    fontSize: 28,
    lineHeight: 36,
  },
  items_wrap: {
    width: "100%",
    gap: 16,
  },

  product_wrap: {
    // width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 24,
    overflow: "hidden",
  },
  product_wrap_button_wrap: {
    alignItems: "flex-start",
    gap: 12,
  },
  product_header_text: {
    fontSize: 28,
    lineHeight: 36,
  },
  product_image_wrap: {
    height: 200,
    width: "100%",
  },
  product_image_wrap_pos: {
    position: "absolute",
    right: 0,
    bottom: 0,
    maxHeight: "100%",
    maxWidth: "100%",
  },
  product_image: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  product_button_pressable_wrap: {
    borderRadius: 4,
    overflow: "hidden",
  },
  product_button_conteiner_wrap: {
    padding: 12,
  },
  product_button_text_wrap: {
    fontSize: 16,
    lineHeight: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  product_button_text: {},
  product_button_text_icon_wrap: {},
  product_button_text_icon: {},
});
