import type { FontSource } from "expo-font";

// These names match the files' PostScript names and the CSS font tokens.
// useFonts skips fonts already embedded by the native expo-font config plugin.
export const fontAssets = {
  "Tajawal-ExtraLight": require("../../assets/fonts/Tajawal-ExtraLight.ttf"),
  "Tajawal-Light": require("../../assets/fonts/Tajawal-Light.ttf"),
  "Tajawal-Regular": require("../../assets/fonts/Tajawal-Regular.ttf"),
  "Tajawal-Medium": require("../../assets/fonts/Tajawal-Medium.ttf"),
  "Tajawal-Bold": require("../../assets/fonts/Tajawal-Bold.ttf"),
  "Tajawal-ExtraBold": require("../../assets/fonts/Tajawal-ExtraBold.ttf"),
  "Tajawal-Black": require("../../assets/fonts/Tajawal-Black.ttf"),
} satisfies Record<string, FontSource>;
