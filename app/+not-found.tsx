import { Link, Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <Stack.Screen options={{ headerShown: true, title: "Oops!" }} />
        <View>
          <Text>This screen doesn't exist.</Text>
          <Link href="/">
            <Text>Go to home screen!</Text>
          </Link>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
