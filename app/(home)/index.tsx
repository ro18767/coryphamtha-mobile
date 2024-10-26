import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href={"/filter"} style={styles.link}>
        <Text>Filter</Text>
      </Link>

      <Link href={"/popup1"} style={styles.link}>
        <Text>popup1</Text>
      </Link>
      <Link href={"/popup2"} style={styles.link}>
        <Text>popup2</Text>
      </Link>
      <Link href={"/popup3"} style={styles.link}>
        <Text>popup3</Text>
      </Link>
      <Link href={"/home"} style={styles.link}>
        <Text>home</Text>
      </Link>
      <Link href={"/products/1"} style={styles.link}>
        <Text>product</Text>
      </Link>
      <Link href={"/return_polisy"} style={styles.link}>
        <Text>return_polisy</Text>
      </Link>
      <Link href={"/payments"} style={styles.link}>
        <Text>payments</Text>
      </Link>
      <Link href={"/delivery_across_ukraine"} style={styles.link}>
        <Text>delivery_across_ukraine</Text>
      </Link>
      <Link href={"/thank_you"} style={styles.link}>
        <Text>thank_you</Text>
      </Link>
      <Link href={"/favorite"} style={styles.link}>
        <Text>favorite</Text>
      </Link>
      <Link href={"/account"} style={styles.link}>
        <Text>account</Text>
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
