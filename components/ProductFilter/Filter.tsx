import { StyleSheet, Text, TextInput, View } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import IconButton from "@/components/buttons/IconButton";
import TextButton from "@/components/buttons/TextButton";
import { useEffect, useMemo, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import ViewButton from "../buttons/ViewButton";
import { useAppContext } from "@/context/AppProvider";

function FilterTagSpetial({ vc, v }: { v: any }) {
  const sp = useLocalSearchParams();

  const borderColor = useThemeColor({}, "secondary_outline_text");
  const checkColor = useThemeColor({}, "secondary_outline_background");
  const backgroundColor = useThemeColor({}, "secondary_outline_text");

  const checkStyle = useMemo(
    () => ({ backgroundColor: checkColor }),
    [checkColor]
  );

  const checked = useMemo(() => {
    const ssssss = Array.isArray(sp[vc.key]) ? sp[vc.key] : [];
    return ssssss.includes(v.val);
  }, [vc, v, sp[vc.key]]);

  function setChecked(newchecked: boolean) {
    const ssssss = Array.isArray(sp[vc.key]) ? sp[vc.key] : [];
    if (newchecked) {
      if (ssssss.includes(v.val)) return;
      router.setParams({ [vc.key]: [...(sp[vc.key] ?? []), v.val] });
      return;
    }
    const new_afdghj = ssssss.filter((ssssdfasdsd) => ssssdfasdsd !== v.val);

    router.setParams({ [vc.key]: new_afdghj });
  }
  return (
    <ViewButton
      pressableProps={{
        onPress: () => {
          setChecked(!checked);
        },
      }}
      conteinerProps={{
        style: styles.filter__tag_filter_wrap,
      }}
      underlayProps={{
        style: {
          opacity: 0.15,
        },
      }}
    >
      <View
        style={[
          { borderColor },
          checked ? { backgroundColor } : undefined,
          styles.filter__tag_option_input,
        ]}
      >
        <View
          style={[
            checkStyle,
            checked ? undefined : { display: "none" },
            styles.filter__tag_option_input_check,
          ]}
        />
      </View>
      <ThemedText
        colorName="surface_text"
        style={styles.filter__tag_option_label}
      >
        {v.title}
      </ThemedText>
    </ViewButton>
  );
}

function FilterTagCategorySpetial({ vc, sdfgh }) {
  const { filterTags } = useAppContext();

  return (
    <View style={styles.filter__tag_wrap}>
      <ThemedText
        colorName="secondary_outline_text"
        style={styles.filter__tag_label}
      >
        {vc.title}
      </ThemedText>
      <View style={styles.filter__tag_mini_list_wrap}>
        {sdfgh.map((v, i) => (
          <FilterTagSpetial vc={vc} v={v} key={i} />
        ))}
      </View>
    </View>
  );
}

function FilterTag({ vc, v }: { v: any }) {
  const sp = useLocalSearchParams();

  const key = "c";
  const val = `${vc.id}-${v.id}`;

  const borderColor = useThemeColor({}, "secondary_outline_text");
  const checkColor = useThemeColor({}, "secondary_outline_background");
  const backgroundColor = useThemeColor({}, "secondary_outline_text");

  const checkStyle = useMemo(
    () => ({ backgroundColor: checkColor }),
    [checkColor]
  );

  const checked = useMemo(() => {
    const ssssss = Array.isArray(sp[key]) ? sp[key] : [];
    return ssssss.includes(val);
  }, [vc, v, sp[key]]);

  function setChecked(newchecked: boolean) {
    const ssssss = Array.isArray(sp[key]) ? sp[key] : [];
    if (newchecked) {
      if (ssssss.includes(val)) return;
      router.setParams({ [key]: [...(sp[key] ?? []), val] });
      return;
    }
    const new_afdghj = ssssss.filter((ssssdfasdsd) => ssssdfasdsd !== val);

    router.setParams({ [key]: new_afdghj });
  }

  return (
    <ViewButton
      pressableProps={{
        onPress: () => {
          setChecked(!checked);
        },
      }}
      conteinerProps={{
        style: styles.filter__tag_filter_wrap,
      }}
      underlayProps={{
        style: {
          opacity: 0.15,
        },
      }}
    >
      <View
        style={[
          { borderColor },
          checked ? { backgroundColor } : undefined,
          styles.filter__tag_option_input,
        ]}
      >
        <View
          style={[
            checkStyle,
            checked ? undefined : { display: "none" },
            styles.filter__tag_option_input_check,
          ]}
        />
      </View>
      <ThemedText
        colorName="surface_text"
        style={styles.filter__tag_option_label}
      >
        {v.title}
      </ThemedText>
    </ViewButton>
  );
}

function FilterTagCategory({ vc, i }) {
  const { filterTags } = useAppContext();

  const sdfgh = useMemo(
    () =>
      filterTags.filter((v) => +v.product_filter_tag_category_id === +vc.id),
    [filterTags]
  );
  return (
    <View style={styles.filter__tag_wrap}>
      <ThemedText
        colorName="secondary_outline_text"
        style={styles.filter__tag_label}
      >
        {vc.title}
      </ThemedText>
      <View style={styles.filter__tag_mini_list_wrap}>
        {sdfgh.map((v, i) => (
          <FilterTag vc={vc} v={v} key={i} />
        ))}
      </View>
    </View>
  );
}

function FilterTags() {
  const {
    showFilter: showFilterParam,
    min: minParam,
    max: maxParam,
  } = useLocalSearchParams<{
    showFilter: string;
    min: string;
    max: string;
  }>();
  const showFilter = Number.parseInt(showFilterParam ?? "") || 0;

  const { filterTagCategories } = useAppContext();
  const minStart = useMemo(() => minParam ?? "", []);
  const maxStart = useMemo(() => maxParam ?? "", []);
  const [min, onChnageMin] = useState(minStart);
  const [max, onChnageMax] = useState(maxStart);

  const [isFirstRender, setFirstRender] = useState(true);

  // // const { filterTagCategories, filterTags } = useAppContext();

  useEffect(() => {
    if (isFirstRender) return;
    router.setParams({ min });
  }, [min]);
  useEffect(() => {
    if (isFirstRender) return;
    router.setParams({ max });
  }, [max]);

  useEffect(() => {
    setTimeout(() => setFirstRender(false), 0);
  }, []);

  const color = useThemeColor({}, "surface_text");
  const borderColor = useThemeColor({}, "surface_outline_background");
  // console.log({ filterTagCategories });
  //
  if (!showFilter) return null;
  return (
    <ThemedView
      style={styles.filter__popup}
      colorName="secondary_outline_background"
    >
      <IconButton
        pressableProps={{
          style: [styles.filter__popup_close_button_icon],
          onPress: () => {
            router.setParams({
              showFilter: showFilter ? undefined : (+!showFilter).toString(),
            });
          },
        }}
        conteinerProps={{
          style: styles.filter__popup_close_button__container,
          colorName: "surface_background",
        }}
        imageProps={{
          style: styles.filter__popup_close_button__image,
          source: require("@/assets/images/icons/close-filter-icon.png"),
        }}
      />
      <View style={styles.filter__price_wrap}>
        <ThemedText
          colorName="secondary_outline_text"
          style={styles.filter__price_label}
        >
          Ціна
        </ThemedText>
        <View style={styles.filter__price_filter_wrap}>
          <TextInput
            style={[
              {
                color,
                borderColor,
              },
              styles.filter__price_wrap__input,
            ]}
            defaultValue={minStart}
            key="minStart"
            onChangeText={onChnageMin}
            placeholder="Від"
            keyboardType="numeric"
            inputMode="numeric"
          />
          <TextInput
            style={[
              {
                color,
                borderColor,
              },
              styles.filter__price_wrap__input,
            ]}
            defaultValue={maxStart}
            key="maxStart"
            onChangeText={onChnageMax}
            placeholder="До"
            keyboardType="numeric"
            inputMode="numeric"
          />
        </View>
      </View>
      <View style={styles.filter__tag_list_wrap}>
        <FilterTagCategorySpetial
          vc={{ title: "Наявність", key: "availability" }}
          sdfgh={[
            {
              title: "Є в наявності",
              val: "3",
            },
            {
              title: "Закінчується",
              val: "2",
            },
            {
              title: "Тимчасово немає",
              val: "1",
            },
            {
              title: "Немає в наявності",
              val: "0",
            },
          ]}
        />
        {filterTagCategories.map((vc, i) => {
          return <FilterTagCategory key={i} vc={vc} i={i} />;
        })}
      </View>
    </ThemedView>
  );
}

export default function Filter({ selected_category }) {
  const { showFilter: showFilterParam } = useLocalSearchParams<{
    showFilter: string;
  }>();
  const showFilter = Number.parseInt(showFilterParam ?? "") || 0;
  return (
    <ThemedView style={styles.filter} colorName="surface_background">
      <ThemedText colorName="primary_outline_text" style={styles.filter__title}>
        {selected_category?.title ?? "Товари"}
      </ThemedText>
      <IconButton
        pressableProps={{
          style: [styles.filter__button, styles.filter__button_icon],
          onPress: () => {
            router.setParams({
              showFilter: showFilter ? undefined : (+!showFilter).toString(),
            });
          },
        }}
        conteinerProps={{
          style: styles.filter__button__container,
          colorName: "surface_background",
        }}
        imageProps={{
          style: styles.filter__button_icon__image,
          source: require("@/assets/images/icons/filter-options-icon.png"),
        }}
      />
      <FilterTags />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  filter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 24,
    zIndex: 1,
    position: "relative",
    height: "auto",
  },
  filter__title: {
    lineHeight: 36,
    fontSize: 28,
    fontWeight: 700,
  },
  filter__button: {
    height: 40,
  },
  filter__button_icon: {
    width: 40,
  },
  filter__button__container: {
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  filter__button_icon__image: {
    height: 24,
    objectFit: "contain",
  },
  filter__popup: {
    position: "absolute",
    top: 80,
    left: 20,
    right: 20,
    marginLeft: "auto",
    paddingHorizontal: 32,
    paddingVertical: 40,
    borderRadius: 8,
    shadowOffset: { width: -8, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 28,
    rowGap: 24,
    maxWidth: 500,
    flexShrink: 0,
    flexGrow: 1,
    pointerEvents: "auto",
  },
  filter__price_wrap: {
    rowGap: 16,
    alignItems: "center",
  },
  filter__price_label: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 600,
  },
  filter__price_filter_wrap: {
    flexDirection: "row",
    columnGap: 16,
  },
  filter__price_wrap__input: {
    width: 105,
    borderWidth: 1,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 2,
  },
  filter__tag_list_wrap: {
    rowGap: 32,
    columnGap: 32,
    flexWrap: "wrap",
    maxHeight: 600,
  },
  filter__tag_mini_list_wrap: {
    rowGap: 12,
  },
  filter__tag_wrap: {
    rowGap: 16,
  },
  filter__tag_label: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 600,
  },
  filter__tag_filter_wrap: {
    flexDirection: "row",
    columnGap: 12,
  },
  filter__tag_option: {
    alignItems: "center",
  },
  filter__tag_option_label: {
    fontSize: 14,
    lineHeight: 20,
  },
  filter__tag_option_input: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
  },
  filter__tag_option_input_check: {
    top: 5,
    left: 5,
    width: 8,
    height: 8,
    borderRadius: 9999,
  },
  filter__popup_close_button_icon: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 8,
    right: 8,
  },
  filter__popup_close_button__container: {
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  filter__popup_close_button__image: {
    height: 24,
    objectFit: "contain",
  },
});
