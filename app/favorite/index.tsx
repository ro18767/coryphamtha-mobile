import EmailSubscribe from "@/components/EmailSubscribe/EmailSubscribe";
import { DEFAULT_PRODUCT_FILTER_LIMIT } from "@/components/ProductFavorite/ProductList/constants";
import ProductList from "@/components/ProductFavorite/ProductList/ProductList";
import ProductNavigation from "@/components/ProductFavorite/ProductList/ProductNavigation";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import PageTitle from "@/components/ProductFavorite/Filter";

export default function Index() {
  const { offset: offsetParam, limit: limitParam } = useLocalSearchParams<{
    offset: string;
    limit: string;
  }>();

  const offsetDirty = Number.parseInt(offsetParam ?? "") || 0;
  console.log(offsetDirty);

  const offset = Math.max(
    0,
    offsetDirty - (offsetDirty % DEFAULT_PRODUCT_FILTER_LIMIT)
  );
  const limitDirty = Math.floor(
    Number.parseInt(limitParam ?? "") || DEFAULT_PRODUCT_FILTER_LIMIT
  );
  const limit = Math.max(
    DEFAULT_PRODUCT_FILTER_LIMIT,
    limitDirty - (limitDirty % DEFAULT_PRODUCT_FILTER_LIMIT)
  );
  const [totalCount, setTotalCount] = useState(20);

  return (
    <>
      <PageTitle />
      <ProductList />
      <EmailSubscribe />
    </>
  );
}

const styles = StyleSheet.create({});
