import { ColorSchemeName, useColorScheme as useColorSchemeReactNative } from 'react-native';

const FORCE_LIGHT_COLOR_SCHEME = false;
export const useColorScheme = (): ColorSchemeName => {
    if (FORCE_LIGHT_COLOR_SCHEME) {
        return 'light';
    }
    return useColorSchemeReactNative() ?? 'light';
}