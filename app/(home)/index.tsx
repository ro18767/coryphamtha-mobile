import ProductList from "@/components/ProductList/ProductList";
import ProductNavigation from "@/components/ProductList/ProductNavigation";
import { ThemedView } from "@/components/ThemedView";
import TextButton from "@/components/buttons/TextButton";
import ViewButton from "@/components/buttons/ViewButton";
import Filter from "@/components/template/Filter";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <>
      <Filter />
      <ProductList />
      <ProductNavigation />
    </>
  );
}

const styles = StyleSheet.create({});
