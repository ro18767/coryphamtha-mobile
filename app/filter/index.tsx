import EmailSubscribe from "@/components/EmailSubscribe/EmailSubscribe";
import { DEFAULT_PRODUCT_FILTER_LIMIT } from "@/components/ProductFilter/ProductList/constants";
import ProductList from "@/components/ProductFilter/ProductList/ProductList";
import ProductNavigation from "@/components/ProductFilter/ProductList/ProductNavigation";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Filter from "@/components/ProductFilter/Filter";
import React from "react";
import { useAppContext } from "@/context/AppProvider";

export default function Index() {
  const { products, categories } = useAppContext();
  const {
    offset: offsetParam,
    limit: limitParam,
    category: categoryParam,
    min: minParam,
    max: maxParam,
  } = useLocalSearchParams<{
    offset: string;
    limit: string;
    category: string;
    min: string;
    max: string;
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
  const minDirty = Number.parseFloat(minParam ?? "");
  const min = minDirty || 0;
  const maxDirty = Number.parseFloat(maxParam ?? "");
  const max = maxDirty || Infinity;

  const categoryDirty = Math.floor(Number.parseInt(categoryParam ?? ""));
  const category_id = categoryDirty || 0;

  const selected_category = categories.find((c) => +c.id === category_id);

  const selected_categories = [];
  if (selected_category) {
    categories.forEach((c) => {
      for (let current_category = c; true; ) {
        if (+current_category.id === +selected_category.id) {
          selected_categories.push(c);
          return;
        }
        let main_category = categories.find(
          (c) => +c.id === +current_category.main
        );
        if (!main_category) return;
        if (!(+main_category.level < +current_category.level)) return;
        current_category = main_category;
      }
    });
  }

  console.log({ min, max });

  const filtered_products = products.filter((p) => {
    if (p.price >= min) {
    } else {
      return false;
    }
    if (p.price <= max) {
    } else {
      return false;
    }
    if (category_id) {
      if (selected_categories.map((c) => +c.id).includes(+p.category_id)) {
      } else {
        return false;
      }
    }
    return true;
  });

  return (
    <>
      <Filter />
      <ProductList
        products={filtered_products}
        offset={offset}
        limit={limit}
        totalCount={filtered_products.length}
      />
      <ProductNavigation
        offset={offset}
        limit={limit}
        totalCount={filtered_products.length}
      />
      <EmailSubscribe />
    </>
  );
}

const styles = StyleSheet.create({});
