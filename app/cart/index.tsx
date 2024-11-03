import CartBlock from "@/components/Cart/ProductList/CartBlock";
import ProductList from "@/components/Cart/ProductList/ProductList";
import EmailSubscribe from "@/components/EmailSubscribe/EmailSubscribe";
import React from "react";
import { StyleSheet } from "react-native";

export default function CartPage() {
  return (
    <>
      <CartBlock />
      <EmailSubscribe />
    </>
  );
}

const styles = StyleSheet.create({});
