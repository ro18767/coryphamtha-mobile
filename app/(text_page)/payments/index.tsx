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
            Оплата замовлень
          </ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText style={[styles.text_p]} colorName="surface_text">
            Оплатити замовлення можна кількома способами:
          </ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText
            style={[styles.text_p]}
            colorName="secondary_outline_text"
          >
            {" \u2022 "} Картою Visa / Mastercard на сайті при оформленні
            замовлення;
          </ThemedText>
          <ThemedText
            style={[styles.text_p]}
            colorName="secondary_outline_text"
          >
            {" \u2022 "}З післяплатою при отриманні замовлення на відділенні
            Нової Пошти;
          </ThemedText>
          <ThemedText
            style={[styles.text_p]}
            colorName="secondary_outline_text"
          >
            {" \u2022 "} Передоплата на розрахунковий рахунок;
          </ThemedText>
          <ThemedText
            style={[styles.text_p]}
            colorName="secondary_outline_text"
          >
            {" \u2022 "} Готівкою курьеру- по Одесі.
          </ThemedText>
        </View>
        <View style={styles.section}>
          <ThemedText style={[styles.text_p]} colorName="surface_text">
            При оплаті замовлення на відділенні «Нової Пошти», Одержувач
            додатково оплачує послугу післяплати 20 грн. + Страховий збір в
            розмірі 2% від суми (страховка цілісності доставки і переказ
            коштів).
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
