import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href={"/filter"} style={styles.link}>
        <ThemedText colorName="surface_text">Filter</ThemedText>
      </Link>
      <Link href={"/popup1"} style={styles.link}>
        <ThemedText colorName="surface_text">popup1</ThemedText>
      </Link>
      <Link href={"/popup2"} style={styles.link}>
        <ThemedText colorName="surface_text">popup2</ThemedText>
      </Link>
      <Link href={"/popup3"} style={styles.link}>
        <ThemedText colorName="surface_text">popup3</ThemedText>
      </Link>
      <Link href={"/home"} style={styles.link}>
        <ThemedText colorName="surface_text">home</ThemedText>
      </Link>
      <Link href={"/products/1"} style={styles.link}>
        <ThemedText colorName="surface_text">product</ThemedText>
      </Link>
      <Link href={"/return_polisy"} style={styles.link}>
        <ThemedText colorName="surface_text">return_polisy</ThemedText>
      </Link>
      <Link href={"/payments"} style={styles.link}>
        <ThemedText colorName="surface_text">payments</ThemedText>
      </Link>
      <Link href={"/delivery_across_ukraine"} style={styles.link}>
        <ThemedText colorName="surface_text">delivery_across_ukraine</ThemedText>
      </Link>
      <Link href={"/thank_you"} style={styles.link}>
        <ThemedText colorName="surface_text">thank_you</ThemedText>
      </Link>
      <Link href={"/favorite"} style={styles.link}>
        <ThemedText colorName="surface_text">favorite</ThemedText>
      </Link>
      <Link href={"/account"} style={styles.link}>
        <ThemedText colorName="surface_text">account</ThemedText>
      </Link>
      <Link href={"/cart"} style={styles.link}>
        <ThemedText colorName="surface_text">cart</ThemedText>
      </Link>
      <Link href={"/popup4"} style={styles.link}>
        <ThemedText colorName="surface_text">popup4</ThemedText>
      </Link>
      <Link href={"/create_order"} style={styles.link}>
        <ThemedText colorName="surface_text">create_order</ThemedText>
      </Link>
      <Link href={"/cabinet"} style={styles.link}>
        <ThemedText colorName="surface_text">cabinet</ThemedText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  link: {
    fontSize: 20,
  },
});
