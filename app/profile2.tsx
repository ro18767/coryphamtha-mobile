import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <View style={styles.conteiner}>
      <Text>prodile index</Text>
      <StatusBar style="auto" />
      <Link href="/">index</Link>
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  conteiner: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
