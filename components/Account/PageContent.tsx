import { StyleSheet, TextInput, View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import TextButton from "@/components/buttons/TextButton";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import ViewButton from "../buttons/ViewButton";
import { URL_BASE } from "@/constants/glabals";
import { useAppContext } from "@/context/AppProvider";

export default function PageContent() {
  const { user, setUser } = useAppContext();
  if (user == null) return;
  if (!("id" in user)) return;
  if (!("firstName" in user)) return;
  if (!("lastName" in user)) return;
  if (!("phone" in user)) return;
  if (!("sex" in user)) return;
  if (!("birthday" in user)) return;
  if (!("email" in user)) return;

  const borderColor = useThemeColor({}, "secondary_outline_text");
  const color = useThemeColor({}, "secondary_outline_text");
  const backgroundColor = useThemeColor(
    {
      light: "#CA9F141A",
      dark: "#CA9F141A",
    },
    "none"
  );
  const [editMode, setEditMode] = useState(false);
  const [fname, onChangeFname] = useState<string>(String(user.firstName ?? ""));
  const [lname, onChangeLname] = useState<string>(String(user.lastName ?? ""));
  const [phone, onChangePhone] = useState<string>(String(user.phone ?? ""));
  const [city, onChangeCity] = useState<string>("");
  const [street, onChangeStreet] = useState<string>("");
  const [home, onChangeHome] = useState<string>("");
  const [bday, onChangeBday] = useState<string>(String(user.birthday ?? ""));
  const [gender, onChangeGender] = useState<string>(String(user.sex ?? ""));

  function updateUser() {
    if (user == null) return;
    if (!("id" in user)) return;
    if (user.id == null) return;

    const fd = new FormData();
    fd.append("firstName", fname);
    fd.append("lastName", lname);
    fd.append("birthday", bday);
    fd.append("sex", gender);

    fetch(`${URL_BASE}/api/users/update/${user.id}`, {
      method: "post",
      body: fd,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        fetch(`${URL_BASE}/api/users/view/${user.id}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setUser(data.user);
          });
        console.log(data);
      });

    // fd.append("city", city);
    // fd.append("street", street);
    // fd.append("home", home);
  }

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
          value={fname}
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
          value={lname}
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
          value={phone}
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
          value={city}
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
          value={street}
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
          value={home}
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
            value={bday}
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
            value={gender}
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
                setEditMode(false);
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
