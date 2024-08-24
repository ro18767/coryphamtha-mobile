import EmailSubscribe from "@/components/EmailSubscribe/EmailSubscribe";
import { DEFAULT_PRODUCT_FILTER_LIMIT } from "@/components/ProductList/constants";
import ProductList from "@/components/ProductList/ProductList";
import ProductNavigation from "@/components/ProductList/ProductNavigation";
import Filter from "@/components/template/Filter";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

export default function Index() {
  const { offset: offsetParam, limit: limitParam } = useLocalSearchParams<{
    offset: string;
    limit: string;
  }>();

  const offsetDirty = Number.parseInt(offsetParam ?? "") || 0;
  console.log(offsetDirty);
  
  const offset = Math.max(0, offsetDirty - (offsetDirty % DEFAULT_PRODUCT_FILTER_LIMIT));
  const limitDirty = Math.floor(Number.parseInt(limitParam ?? "") || DEFAULT_PRODUCT_FILTER_LIMIT);
  const limit = Math.max(DEFAULT_PRODUCT_FILTER_LIMIT, limitDirty - (limitDirty % DEFAULT_PRODUCT_FILTER_LIMIT));
  const [totalCount, setTotalCount] = useState(20);

  return (
    <>
      <Filter />
      <ProductList
        offset={offset}
        limit={limit}
        totalCount={totalCount}
      />
      <ProductNavigation
        offset={offset}
        limit={limit}
        totalCount={totalCount}
      />
      <EmailSubscribe />
    </>
  );
}

const styles = StyleSheet.create({});
