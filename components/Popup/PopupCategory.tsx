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
import { Link, router } from "expo-router";
import { useAppContext } from "@/context/AppProvider";
type ProductCategory = {
  title: string;
  link: string;
  source?: ImageSourcePropType;
  children?: ProductCategory[];
};



export default function PopupCategory() {
  const popoverContext = usePopoverContext();
  if (!popoverContext) return;

  const { categories } = useAppContext();

  const level0 = categories.filter((c) => +c.level === 0);
  const level1 = categories.filter((c) => +c.level === 1);
  const level2 = categories.filter((c) => +c.level === 2);

  const item_list_data = level0.map((pc) => {
    const children = level1
      .filter((cc) => pc.id === cc.main)
      .map((pc) => {
        const children = level2
          .filter((cc) => pc.id === cc.main)
          .map((pc) => {
            const children: any[] = [];

            return {
              category_item: pc,
              children: children.length ? children : undefined,
            };
          });

        return {
          category_item: pc,
          children: children.length ? children : undefined,
        };
      });
    return {
      category_item: pc,
      children: children.length ? children : undefined,
    };
  });
  console.log({ item_list_data });

  const { setPopoverData, setPopoverVisible } = popoverContext;

  const [openCatArr, setOpenCatArr] = useState(
    [] satisfies number[] as number[]
  );

  useEffect(() => {
    console.log({ openCatArr });
  }, [openCatArr]);
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
          {item_list_data.map((item_data, i) => {
            return (
              <PopupCategoryItem
                key={`${0}:${i}`}
                item_data={item_data}
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
  item_data,
  level = 0,
  openCatArr,
  setOpenCatArr,
}: {
  item_data: any;
  level?: number;
  openCatArr: any;
  setOpenCatArr: any;
}) {
  const popoverContext = usePopoverContext();
  if (!popoverContext) return;

  const { popoverComponentName, setPopoverData, setPopoverVisible } =
    popoverContext;

  const { category_item, children } = item_data;

  let item = null;
  let link = "/";
  let params = {};
  if (category_item) {
    item = category_item;
    link = `/filter`;
    params = {
      category: `${item.id}`,
    };
  }
  if (item == null) return;
  const { title, source } = item;
  const opened = useMemo(() => {
    return openCatArr[level] === item;
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
        <ViewButton
          conteinerProps={{
            style: styles.link_row_wrap,
            colorName: "secondary_outline_background",
          }}
          pressableProps={{
            onPress: () => {
              setPopoverVisible(false);
              router.navigate(link);
              router.setParams(params);
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
          </View>
        </ViewButton>
      )}

      {opened && children && children.length > 0
        ? children.map((sub_item_data, i) => {
            return (
              <View style={styles.level_pading} key={`${+level + 1}:${i}`}>
                <PopupCategoryItem
                  item_data={sub_item_data}
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
