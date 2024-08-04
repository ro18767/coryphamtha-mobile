import { View, Text } from "react-native";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StatusBar } from "expo-status-bar";

export default function StatusBarSetup() {
  const statusBarColor = useThemeColor({}, "primary_background");
  const statusBarStyle = "light";
  return <StatusBar backgroundColor={statusBarColor} style={statusBarStyle} />;
}
