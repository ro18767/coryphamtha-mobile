import { ThemedText } from "@/components/ThemedText";
import { Link, Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <Stack.Screen options={{ headerShown: true, title: "Oops!" }} />
        <View>
          <ThemedText
          
            colorName="secondary_outline_text"
          >
            404
          </ThemedText>
          <Link href="/">
            <Text>Go to home screen!</Text>
          </Link>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({

});
