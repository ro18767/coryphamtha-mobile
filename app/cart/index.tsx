import CartBlock from "@/components/Cart/ProductList/CartBlock";
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
