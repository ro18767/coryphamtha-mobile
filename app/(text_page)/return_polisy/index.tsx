import EmailSubscribe from "@/components/EmailSubscribe/EmailSubscribe";
import { ThemedText } from "@/components/ThemedText";
import { Link, Stack } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function () {
  return (
    <>
      <View style={styles.page_wrap}>
        <View style={styles.section}>
          <ThemedText style={styles.title_h1} colorName="primary_outline_text">
            Доставка і оплата
          </ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText
            style={[styles.title_h2]}
            colorName="secondary_outline_text"
          >
            Повернення
          </ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText style={[styles.text_p]} colorName="surface_text">
            Покупець має право обміняти або повернути товар протягом 14 днів
            після покупки. Згідно ст. 9 Закону України "Про захист прав
            споживачів" та ст. 27 Наказу Міністерства економіки України № 104
            "Про затвердження Правил роздрібної торгівлі непродовольчими
            товарами" обмін товару належної якості провадиться якщо:
          </ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText
            style={[styles.text_p]}
            colorName="secondary_outline_text"
          >
            {" \u2022 "} товар не був у використанні і не має слідів використання:
            подряпин, сколів та ін.;
          </ThemedText>
          <ThemedText
            style={[styles.text_p]}
            colorName="secondary_outline_text"
          >
            {" \u2022 "} товар має повну комплектацію, цілісність упаковки не
            порушена; збережено його товарний вигляд,
          </ThemedText>
          <ThemedText
            style={[styles.text_p]}
            colorName="secondary_outline_text"
          >
            {" \u2022 "} споживчі властивості, пломби, ярлики; збережений
            розрахунковий документ, виданий покупцеві разом з проданим товаром;
          </ThemedText>
          <ThemedText
            style={[styles.text_p]}
            colorName="secondary_outline_text"
          >
            {" \u2022 "} також товар підлягає поверненню і (або) обміну, якщо він
            має заводський брак.
          </ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText style={[styles.text_p]} colorName="surface_text">
            Повернення / обмін товару здійснюється за рахунок покупця (крім
            випадків заводського браку).
          </ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText style={[styles.text_p]} colorName="surface_text">
            Повернення грошей за товар відбувається шляхом перерахування суми на
            банківську картку (повинні бути вказані всі банківські реквізити)
            протягом 7 днів.
          </ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText style={[styles.text_p]} colorName="surface_text">
            Для оформлення повернення просимо заповнити заяву на повернення і
            передати його службою доставки разом з товаром
          </ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText style={[styles.text_p]} colorName="surface_text">
            У разі повернення товару необхідно попередньо повідомити про це в
            call-центр Інтернет-магазину BOTANICA по телефону +380 95 200 75 27
            або вайбер +380 98 015 10 53.
          </ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText
            style={[styles.title_h2]}
            colorName="secondary_outline_text"
          >
            Гарантія
          </ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText style={[styles.text_p]} colorName="surface_text">
            На усі товари компанії BOTANICA поширюється гарантія відповідно до
            законодавства України. Підтвердженням гарантійних зобов'язань є
            видаткова накладна. Будь ласка, перевіряйте комплектність і
            відсутність дефектів товару при його отриманні (комплектність
            визначається інструкцією).
          </ThemedText>
        </View>
      </View>
      <EmailSubscribe />
    </>
  );
}

const styles = StyleSheet.create({
  page_wrap: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 48,
    gap: 16,
  },
  section: {},
  title_h1: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: 700,
  },
  title_h2: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 500,
  },
  text_p: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 500,
  },
});
