import TextButton from "@/components/buttons/TextButton";
import EmailSubscribe from "@/components/EmailSubscribe/EmailSubscribe";
import HomeDescription from "@/components/Home/HomeDescription";
import HomePopularProductsList from "@/components/Home/HomePopularProductsList";
import PopupSignIn from "@/components/Popup/PopupSignIn";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {

  return (
    <>
      <HomeDescription />
      <HomePopularProductsList />
      <EmailSubscribe />
    </>
  );
}

const styles = StyleSheet.create({

});
