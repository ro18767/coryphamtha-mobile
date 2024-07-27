import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
export default function Index() {
  
  
  return (
    <>
      <ThemedView style={styles.header} colorName="primary_background">
        <ThemedText colorName="primary_text">HOME</ThemedText>
      </ThemedView>
      <View style={styles.conteiner}>
        <Text>HOME</Text>
        <Link href="/profile">PROFILE</Link>
      </View>
      <ThemedView style={styles.header} colorName="primary_background">
        <ThemedText colorName="primary_text">FOOTER</ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
  },
  conteiner: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
