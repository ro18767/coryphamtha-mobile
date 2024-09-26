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
      <Link href={"/home"} style={styles.link}>
        <Text>home</Text>
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
