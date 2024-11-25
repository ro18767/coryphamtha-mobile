import { StyleSheet, View, Button, SafeAreaView, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import TextButton from "../buttons/TextButton";
import React from "react";
import ViewButton from "../buttons/ViewButton";

function AccordionItem({
  title,
  children,
}: {
  title: React.ComponentProps<typeof ThemedText>["children"];
  children?: React.ComponentProps<typeof View>["children"];
}) {
  const duration = 500;
  const isExpanded = useSharedValue(false);
  const onPress = () => {
    isExpanded.value = !isExpanded.value;
  };

  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    })
  );
  const bodyStyle = useAnimatedStyle(() => {
    return {
      height: derivedHeight.value,
    };
  });
  const openIconStyle = useAnimatedStyle(() => {
    return { display: isExpanded.value ? "none" : "flex" };
  });
  const closeIconStyle = useAnimatedStyle(() => {
    return { display: isExpanded.value ? "flex" : "none" };
  });

  return (
    <View style={styles.footer__AccordionItem__wrap}>
      <ViewButton
        pressableProps={{
          onPress,
        }}
        conteinerProps={{
          style: styles.footer__AccordionItem__button,
          colorName: "primary_background",
        }}
      >
        <ThemedText
          colorName="primary_text"
          style={styles.footer__AccordionItem__text}
        >
          {title}
        </ThemedText>
        <Animated.View style={openIconStyle}>
          <Image
            style={[styles.footer__AccordionItem__img]}
            source={require("@/assets/images/icons/accordion-open-icon.png")}
          />
        </Animated.View>
        <Animated.View style={closeIconStyle}>
          <Image
            style={[styles.footer__AccordionItem__img]}
            source={require("@/assets/images/icons/accordion-close-icon.png")}
          />
        </Animated.View>
      </ViewButton>
      <Animated.View
        style={[styles.footer__AccordionItem__sub_wrap_animated, bodyStyle]}
      >
        <View
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height;
          }}
          style={styles.footer__AccordionItem__sub_wrap}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
}

export default function Footer() {
  return (
    <>
      <ThemedView style={styles.footer} colorName="primary_background">
        <AccordionItem title="НАШІ КАТЕГОРІЇ">
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Новий рік та Різдво
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Посуд і сервіровка
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Свічки і аромати
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Освітлення
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Все для зберігання
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Гід по декору
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Ідеї подарунків
          </ThemedText>
        </AccordionItem>
        <AccordionItem title="Про нас">
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Про компанію
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Партнерам
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Кар'єра
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Контакти
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Адреси магазинів
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Для ЗМІ
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Новини
          </ThemedText>
        </AccordionItem>
        <AccordionItem title="Доставка і повернення">
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Способи оплати
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Вартість та час доставки
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Методи повернення
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Як відправити скаргу в магазин?
          </ThemedText>
          <ThemedText
            colorName="primary_text"
            style={styles.footer__AccordionItem__subtext}
          >
            Гарантійні умови
          </ThemedText>
        </AccordionItem>
        <AccordionItem title="Контакти">
          <View style={styles.footer__AccordionItem__contacts_items_wrap}>
            <ThemedView
              colorName="secondary_background"
              style={styles.footer__AccordionItem__round_icon}
            >
              <Image
                style={[styles.footer__AccordionItem__round_icon_img]}
                source={require("@/assets/images/icons/phone-icon.png")}
              />
            </ThemedView>
            <View style={styles.footer__AccordionItem__contacts_item_text_wrap}>
              <ThemedText
                colorName="primary_text"
                style={styles.footer__AccordionItem__contacts_item_text}
              >
                +380 95 955 95 95
              </ThemedText>
              <ThemedText
                colorName="primary_text"
                style={styles.footer__AccordionItem__contacts_item_text}
              >
                +380 98 988 98 98
              </ThemedText>
            </View>
          </View>
          <View style={styles.footer__AccordionItem__contacts_items_wrap}>
            <ThemedView
              colorName="secondary_background"
              style={styles.footer__AccordionItem__round_icon}
            >
              <Image
                style={[styles.footer__AccordionItem__round_icon_img]}
                source={require("@/assets/images/icons/time-icon.png")}
              />
            </ThemedView>
            <View style={styles.footer__AccordionItem__contacts_item_text_wrap}>
              <ThemedText
                colorName="primary_text"
                style={styles.footer__AccordionItem__contacts_item_text}
              >
                Пн-Пт з 9:00 до 18:00
              </ThemedText>
              <ThemedText
                colorName="primary_text"
                style={styles.footer__AccordionItem__contacts_item_text}
              >
                Сб-Нд з 10:00 до 17:00
              </ThemedText>
            </View>
          </View>
        </AccordionItem>
        <AccordionItem title="соціальні мережі">
          <View style={styles.footer__AccordionItem__contacts_items_wrap}>
         
          </View>
        </AccordionItem>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    display: "flex",
    flexDirection: "column",
    columnGap: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 457,
  },
  footer__AccordionItem__wrap: {},
  footer__AccordionItem__button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    // paddingVertical: 16,
    paddingHorizontal: 16,
  },
  footer__AccordionItem__text: {
    fontSize: 18,
    fontWeight: 600,
    textTransform: "uppercase",
  },
  footer__AccordionItem__img: {
    width: 28,
    height: 28,
  },
  footer__AccordionItem__subtext: {
    paddingLeft: 28,
    height: 24,
    fontSize: 14,
    fontWeight: 400,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 24,
  },
  footer__AccordionItem__sub_wrap: {
    width: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "stretch",
  },
  footer__AccordionItem__sub_wrap_animated: {
    width: "100%",
    overflow: "hidden",
  },
  footer__AccordionItem__contacts_items_wrap: {
    paddingLeft: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footer__AccordionItem__round_icon: {
    overflow: "hidden",
    padding: 8,
    borderRadius: 9999,
  },
  footer__AccordionItem__round_icon_img: {
    width: 24,
    height: 24,
  },

  footer__AccordionItem__contacts_item_text_wrap: {
    flexDirection: "column",
  },
  footer__AccordionItem__contacts_item_text: {
    height: 24,
    fontSize: 14,
    fontWeight: 400,
  },
});
