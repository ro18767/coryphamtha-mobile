import TextButton from "@/components/buttons/TextButton";
import PopupSignUp from "@/components/Popup/PopupSignUp";
import { usePopupContext } from "@/context/PopupContext";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const popupContext = usePopupContext();
  if (!popupContext) return;

  const { popupComponentRef, setPopupData, setPopupVisible } = popupContext;

  return (
    <View style={styles.container}>
      <TextButton
        pressableProps={{
          onPress: () => {
            console.log("test");
            console.dir(PopupSignUp);
            popupComponentRef.current = PopupSignUp;
            setPopupData({});
            setPopupVisible(true);
          },
        }}
        conteinerProps={{
          colorName: "secondary_background",
          style: [styles.popup1_button],
        }}
        textProps={{
          colorName: "secondary_text",
          style: [styles.popup1_button__text],
        }}
      >
        Показати PopUp
      </TextButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popup1_button: {
    paddingHorizontal: 60,
    paddingVertical: 12,
  },
  popup1_button__text: {
    fontSize: 20,
    lineHeight: 18,
    fontWeight: 500,
  },
});
