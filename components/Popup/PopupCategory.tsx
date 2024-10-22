import { usePopupContext } from "@/context/PopupContext";
import { ThemedView } from "@/components/ThemedView";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { useEffect, useMemo, useState } from "react";
import IconButton from "../buttons/IconButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import TextButton from "../buttons/TextButton";
import ViewButton from "../buttons/ViewButton";
import { Sizes } from "@/constants/Sizes";
import PopupSignIn from "./PopupSignIn";
import React from "react";
import { usePopoverContext } from "@/context/PopoverContext";
import { Link } from "expo-router";
type ProductCategory = {
  title: string;
  link: string;
  source?: ImageSourcePropType;
  children?: ProductCategory[];
};

const item_list_data: ProductCategory[] = [
  {
    title: "Новий Рік та Різдво",
    link: "/404",
    source: require("@/assets/images/category-icons-example/new-icon.png"),
    children: [
      {
        title: "Ялинкові прикраси",
        link: "/404",
        children: [
          {
            title: "Бантики",
            link: "/404",
          },
          {
            title: "Верхівки для ялинок",
            link: "/404",
          },
          {
            title: "Ялинкові набори",
            link: "/404",
          },
          {
            title: "Новорічні підвіски",
            link: "/404",
          },
          {
            title: "Ялинкові кулі",
            link: "/404",
          },
        ],
      },
      {
        title: "Гірлянди новорічні",
        link: "/404",
        children: [],
      },
      {
        title: "Гірлянди новорічні",
        link: "/404",
        children: [],
      },
      {
        title: "Гірлянди новорічні",
        link: "/404",
        children: [],
      },
      {
        title: "Квіти та гілки новорічні",
        link: "/404",
        children: [],
      },
      {
        title: "Декор новорічний",
        link: "/404",
        children: [],
      },
      {
        title: "Штучні ялинки",
        link: "/404",
        children: [],
      },
      {
        title: "Прикраси новорічні",
        link: "/404",
        children: [],
      },
      {
        title: "Свічники новорічні",
        link: "/404",
        children: [],
      },
      {
        title: "Посуд новорічний",
        link: "/404",
        children: [],
      },
      {
        title: "Подарунки новорічні",
        link: "/404",
        children: [],
      },
      {
        title: "Снігові кулі",
        link: "/404",
        children: [],
      },
      {
        title: "Свічки новорічні",
        link: "/404",
        children: [],
      },
    ],
  },
  {
    title: "New",
    link: "/404",
    source: require("@/assets/images/category-icons-example/new-icon.png"),
    children: [],
  },
  {
    title: "Посуд і сервіровка",
    link: "/404",
    source: require("@/assets/images/category-icons-example/new-icon.png"),
    children: [],
  },
  {
    title: "Свічки і аромати",
    link: "/404",
    source: require("@/assets/images/category-icons-example/new-icon.png"),
    children: [],
  },
  {
    title: "Предмети інтер'єру",
    link: "/404",
    source: require("@/assets/images/category-icons-example/new-icon.png"),
    children: [],
  },
  {
    title: "Освітлення",
    link: "/404",
    source: require("@/assets/images/category-icons-example/new-icon.png"),
    children: [],
  },
  {
    title: "Все для зберігання",
    link: "/404",
    source: require("@/assets/images/category-icons-example/new-icon.png"),
    children: [],
  },
  {
    title: "Канцелярія і гаджети",
    link: "/404",
    source: require("@/assets/images/category-icons-example/new-icon.png"),
    children: [],
  },
  {
    title: "Гід по Декору",
    link: "/404",
    source: require("@/assets/images/category-icons-example/new-icon.png"),
    children: [],
  },
  {
    title: "Ідеї подарунків",
    link: "/404",
    source: require("@/assets/images/category-icons-example/new-icon.png"),
    children: [],
  },
  {
    title: "Подарункові Карти",
    link: "/404",
    source: require("@/assets/images/category-icons-example/new-icon.png"),
    children: [],
  },
];

export default function PopupCategory() {
  const popoverContext = usePopoverContext();
  if (!popoverContext) return;

  const { popoverComponentRef, setPopoverData, setPopoverVisible } =
    popoverContext;
  const [openCatArr, setOpenCatArr] = useState(
    [] satisfies number[] as number[]
  );
  return (
    <>
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          setPopoverVisible(false);
        }}
      />
      <ScrollView
        style={[styles.scroll_container, { flexShrink: 1 }]}
        contentContainerStyle={{ flexShrink: 1 }}
      >
        <ThemedView
          style={styles.container}
          colorName="secondary_outline_background"
        >
          {item_list_data.map((item, i) => {
            return (
              <PopupCategoryItem
                key={i}
                item={item}
                openCatArr={openCatArr}
                setOpenCatArr={setOpenCatArr}
              />
            );
          })}
        </ThemedView>
      </ScrollView>
    </>
  );
}

function PopupCategoryItem({
  item,
  level = 0,
  openCatArr,
  setOpenCatArr,
}: {
  item: ProductCategory;
  level?: number;
  openCatArr: any;
  setOpenCatArr: any;
}) {
  const { link, title, source, children } = item;
  const opened = useMemo(() => openCatArr[level] === item, [openCatArr]);
  useEffect(() => {
    console.log(opened);
  }, [opened]);
  useEffect(() => {
    console.log(openCatArr);
  }, [openCatArr]);
  return (
    <>
      {children && children.length > 0 ? (
        <ViewButton
          conteinerProps={{
            style: styles.link_row_wrap,
            colorName: "secondary_outline_background",
          }}
          pressableProps={{
            onPress: () => {
              if (opened) {
                setOpenCatArr(openCatArr.toSpliced(level));
              } else {
                setOpenCatArr(openCatArr.toSpliced(level, Infinity, item));
              }
            },
          }}
        >
          <View style={[styles.link_row]}>
            <View style={[styles.icon_wrap]}>
              <Image source={source} style={[styles.icon]} />
            </View>
            <ThemedText
              style={styles.link_text}
              colorName="secondary_outline_text"
            >
              {title}
            </ThemedText>
            <View style={[styles.fold_icon_wrap]}>
              <Image
                source={require("@/assets/images/icons/category-fold-icon.png")}
                style={[styles.fold_icon]}
              />
            </View>
          </View>
        </ViewButton>
      ) : (
        <Link href={link} style={styles.link_row_wrap}>
          <View style={[styles.link_row]}>
            <View style={[styles.icon_wrap]}>
              <Image source={source} style={[styles.icon]} />
            </View>
            <ThemedText
              style={styles.link_text}
              colorName="secondary_outline_text"
            >
              {title}
            </ThemedText>
          </View>
        </Link>
      )}

      {opened && children && children.length > 0
        ? children.map((sub_item, i) => {
            return (
              <View style={styles.level_pading}>
                <PopupCategoryItem
                  key={i}
                  item={sub_item}
                  level={level + 1}
                  openCatArr={openCatArr}
                  setOpenCatArr={setOpenCatArr}
                />
              </View>
            );
          })
        : null}
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  scroll_container: {
    position: "absolute",
    top: Sizes.HEADER_HEIGHT,
    right: 0,
    left: 0,
    bottom: 0,
    height: "auto",
  },
  container: {
    borderRadius: 4,
    shadowOffset: { width: -8, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 28,
    rowGap: 8,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  link_row_wrap: {
    display: "flex",
    flexDirection: "column",
  },
  link_row: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
    flexDirection: "row",
  },
  link_text: {
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  icon_wrap: {
    width: 30,
    height: 30,
  },
  icon: {},
  fold_icon_wrap: {
    width: 24,
    height: 24,
  },
  fold_icon: {},
  level_pading: {
    paddingLeft: 10,
  },
});
