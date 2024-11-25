/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "@/hooks/useColorScheme";

import { Colors } from "@/constants/Colors";
import { useMemo } from "react";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  
  const theme = useColorScheme() ?? "light";
  const colorFromProps = useMemo(() => props[theme], [theme]);
  // if(useColorScheme() === 'light') console.error('light');

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
