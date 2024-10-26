import EmailSubscribe from "@/components/EmailSubscribe/EmailSubscribe";
import ProductList from "@/components/ProductFavorite/ProductList/ProductList";
import { StyleSheet } from "react-native";
import React from "react";
import PageTitle from "@/components/ProductFavorite/PageTitle";

export default function Index() {
  return (
    <>
      <PageTitle />
      <ProductList />
      <EmailSubscribe />
    </>
  );
}

const styles = StyleSheet.create({});
