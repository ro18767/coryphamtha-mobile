import { StyleSheet, TextInput, View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import TextButton from "@/components/buttons/TextButton";
import { useEffect, useMemo, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import ViewButton from "../buttons/ViewButton";
import { URL_BASE } from "@/constants/glabals";
import { updateAddresses, useAppContext } from "@/context/AppProvider";
import { usePopupContext } from "@/context/PopupContext";
import { router } from "expo-router";
import { mainScrollViewRef } from "@/hooks/mainScrollViewRef";

export default function PageContent() {
  const { loading, user, setUser, addresses, setAddresses } = useAppContext();

  const borderColor = useThemeColor({}, "secondary_outline_text");
  const color = useThemeColor({}, "secondary_outline_text");
  const backgroundColor = useThemeColor(
    {
      light: "#CA9F141A",
      dark: "#CA9F141A",
    },
    "none"
  );
  const address = useMemo(() => {
    if (loading) return;
    if (user == null) return;
    if (!user.address_id) return;
    return addresses.find((db_address) => db_address.id === user?.address_id);
  }, [loading, user]);
  const [editMode, setEditMode] = useState(false);
  const [fname, onChangeFname] = useState<string>(
    String(user?.firstName ?? "")
  );
  const [lname, onChangeLname] = useState<string>(String(user?.lastName ?? ""));
  const [phone, onChangePhone] = useState<string>(String(user?.phone ?? ""));
  const [city, onChangeCity] = useState<string>(address?.city ?? "");
  const [street, onChangeStreet] = useState<string>(address?.street ?? "");
  const [home, onChangeHome] = useState<string>(address?.house ?? "");
  const [bday, onChangeBday] = useState<string>(String(""));
  const [gender, onChangeGender] = useState<string>(String(""));

  const popupContext = usePopupContext();

  useEffect(() => {
    if (loading) return;
    if (!popupContext) return;

    const { popupComponentName, setPopupData, setPopupVisible } = popupContext;
    if (user == null) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      setTimeout(() => {
        router.navigate("/(home)");
        mainScrollViewRef.current?.scrollTo({
          y: 0,
          animated: false,
        });
      }, 0);
      return;
    }
    if (!("id" in user)) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      setTimeout(() => {
        router.navigate("/(home)");
        mainScrollViewRef.current?.scrollTo({
          y: 0,
          animated: false,
        });
      }, 0);
      return;
    }

    onChangeFname(String(user?.firstName ?? ""));
    onChangeLname(String(user?.lastName ?? ""));
    onChangePhone(String(user?.phone ?? ""));
    onChangeCity(String(address?.city ?? ""));
    onChangeStreet(String(address?.street ?? ""));
    onChangeHome(String(address?.house ?? ""));
    onChangeBday(String(""));
    onChangeGender(String(""));
  }, [loading]);

  if (user == null) return;
  if (!("id" in user)) return;
  if (!("firstName" in user)) return;
  if (!("lastName" in user)) return;
  if (!("phone" in user)) return;
  if (!("email" in user)) return;

  if (!popupContext) return;

  const { popupComponentName, setPopupData, setPopupVisible } = popupContext;
  function updateUser() {
    if (user == null) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      return;
    }
    if (!("id" in user)) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      return;
    }
    if (user.id == null) {
      setPopupVisible(false);
      popupComponentName.current = "PopupSignIn";
      setPopupData({});
      setPopupVisible(true);
      return;
    }

    const fd = new FormData();
    fd.append("city", city);
    fd.append("street", street);
    fd.append("house", home);
    fd.append("firstName", fname);
    fd.append("lastName", lname);
    fd.append("birthday", bday);
    fd.append("sex", gender);

    let address_link = `${URL_BASE}/api/Addresses/create`;
    if (address != null) {
      address_link = `${URL_BASE}/api/Addresses/update/${address.id}`;
    }
    fetch(address_link, {
      method: "post",
      body: fd,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {

        if(data?.status=== 'Address created successfully') {
          fd.append("address_id", String(data.id));
        }
        
        updateAddresses(setAddresses);

        return fetch(`${URL_BASE}/api/users/update/${user.id}`, {
          method: "post",
          body: fd,
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            return fetch(`${URL_BASE}/api/users/view/${user.id}`)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                setUser(data.user);

                setEditMode(false);
              });
          });
      })
  }

  if (loading) return;
  return (
    <View style={styles.form_wrap}>
      <View style={styles.form_title_wrap}>
        <View style={styles.form_title_icon_wrap}>
          <Image
            style={[styles.form_title_icon]}
            resizeMode="contain"
            source={require("@/assets/images/icons/cabinet-icon-yellow.png")}
          ></Image>
        </View>
        <ThemedText
          style={styles.form_title}
          colorName="secondary_outline_text"
        >
          Персональні дані
        </ThemedText>
      </View>
      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Ім'я
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangeFname}
          defaultValue={fname}
          key="fname"
          placeholder=""
          keyboardType="default"
          inputMode="text"
          readOnly={!editMode}
        />
      </View>

      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Прізвище
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangeLname}
          defaultValue={lname}
          key="lname"
          placeholder=""
          keyboardType="default"
          inputMode="text"
          readOnly={!editMode}
        />
      </View>

      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Ваш телефон
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangePhone}
          defaultValue={phone}
          key="phone"
          placeholder=""
          keyboardType="phone-pad"
          inputMode="tel"
          readOnly
        />
      </View>

      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Місто
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangeCity}
          defaultValue={city}
          key="city"
          placeholder=""
          keyboardType="default"
          inputMode="text"
          readOnly={!editMode}
        />
      </View>

      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Вулиця
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangeStreet}
          defaultValue={street}
          key="street"
          placeholder=""
          keyboardType="default"
          inputMode="text"
          readOnly={!editMode}
        />
      </View>

      <View style={styles.form_section}>
        <ThemedText
          style={styles.container__input_label}
          colorName="surface_text"
        >
          Номер будинку / квартири
        </ThemedText>
        <TextInput
          style={[
            {
              color,
              borderColor,
              backgroundColor,
            },
            styles.container__input,
          ]}
          onChangeText={onChangeHome}
          defaultValue={home}
          key="home"
          placeholder=""
          keyboardType="default"
          inputMode="text"
          readOnly={!editMode}
        />
      </View>

      {editMode ? (
        <View style={styles.form_section}>
          <ThemedText
            style={styles.container__input_label}
            colorName="surface_text"
          >
            Дата народження
          </ThemedText>
          <TextInput
            style={[
              {
                color,
                borderColor,
                backgroundColor,
              },
              styles.container__input,
            ]}
            onChangeText={onChangeBday}
            defaultValue={bday}
            key="bday"
            placeholder=""
            keyboardType="default"
            inputMode="text"
            readOnly={!editMode}
          />
        </View>
      ) : null}
      {editMode ? (
        <View style={styles.form_section}>
          <ThemedText
            style={styles.container__input_label}
            colorName="surface_text"
          >
            Стать
          </ThemedText>
          <TextInput
            style={[
              {
                color,
                borderColor,
                backgroundColor,
              },
              styles.container__input,
            ]}
            onChangeText={onChangeGender}
            defaultValue={gender}
            key="gender"
            placeholder=""
            keyboardType="default"
            inputMode="text"
            readOnly={!editMode}
          />
        </View>
      ) : null}
      {editMode ? (
        <View style={styles.container__form__submit_button_wrap_wrap}>
          <TextButton
            underlayProps={{
              style: styles.container__form__submit_button_wrap,
            }}
            pressableProps={{
              onPress: () => {
                updateUser();
              },
            }}
            conteinerProps={{
              style: styles.container__form__submit_button,
              colorName: "secondary_background",
            }}
            textProps={{
              style: styles.container__form__submit_button_text,
              colorName: "secondary_text",
            }}
          >
            Зберегти
          </TextButton>
        </View>
      ) : null}
      {!editMode ? (
        <View style={styles.edit_button_wrap}>
          <ViewButton
            pressableProps={{
              style: styles.edit_button_pressable_wrap,
              onPress: () => {
                setEditMode(true);
              },
            }}
            conteinerProps={{
              colorName: "surface_background",
              style: styles.edit_button_conteiner_wrap,
            }}
          >
            <View style={[styles.edit_button_text_icon_wrap]}>
              <Image
                source={require("@/assets/images/icons/edit-mode-icon.png")}
              />
            </View>
            <ThemedText
              colorName="primary_outline_text"
              style={[styles.edit_button_text]}
            >
              Редагувати
            </ThemedText>
          </ViewButton>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container__input_label: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  container__input: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12 - 1, // minus borderWidth
    paddingVertical: 16 - 1, // minus borderWidth
    borderRadius: 4,
    borderWidth: 1,
  },
  form_section: {},
  form_title_wrap: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  form_title: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 500,
  },
  form_wrap: {
    gap: 8,
    paddingHorizontal: 24,
    paddingBottom: 48,
  },

  container__form__submit_button_wrap_wrap: {
    paddingTop: 20,
    paddingBottom: 48,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  container__form__submit_button_wrap: {
    borderRadius: 4,
  },
  container__form__submit_button: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 80,
    paddingVertical: 16,
    borderRadius: 4,
  },
  container__form__submit_button_text: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
  },
  container__form__close_button_pressable: {
    position: "absolute",
    top: 12,
    right: 12,
    height: 24,
    width: 24,
  },
  form_title_icon_wrap: {},
  form_title_icon: {
    width: 28,
    height: 28,
  },
  edit_button_pressable_wrap: {},
  edit_button_conteiner_wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  edit_button_text: {},
  edit_button_text_icon_wrap: {},
  edit_button_wrap: {
    paddingTop: 20,
    flexDirection: "row-reverse",
  },
});
