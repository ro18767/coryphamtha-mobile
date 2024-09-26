import TextButton from "@/components/buttons/TextButton";
import EmailSubscribe from "@/components/EmailSubscribe/EmailSubscribe";
import HomeDescription from "@/components/Home/HomeDescription";
import PopupSignIn from "@/components/Popup/PopupSignIn";
import { StyleSheet, View } from "react-native";

export default function Index() {

  return (
    <>
      <HomeDescription />
      <EmailSubscribe />
    </>
  );
}

const styles = StyleSheet.create({

});
