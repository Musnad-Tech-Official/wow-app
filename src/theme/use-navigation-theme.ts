import { DarkTheme, DefaultTheme, type Theme } from "expo-router";
import { useColorScheme } from "react-native";
// NativeWind re-exports this hook; the native entry also provides its native types.
import { useUnstableNativeVariable } from "react-native-css/native";

export interface NavigationTheme {
  isDark: boolean;
  background: string;
  surface: string;
  foreground: string;
  border: string;
  regularFont: string;
  boldFont: string;
  navTheme: Theme;
}

// Resolves theme values dynamically according to active light/dark appearance.
export function useNavigationTheme(): NavigationTheme {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const nativeBg = useUnstableNativeVariable("--color-background") as string;
  const nativeSurface = useUnstableNativeVariable("--color-surface") as string;
  const nativeForeground = useUnstableNativeVariable("--color-foreground") as string;
  const nativeBorder = useUnstableNativeVariable("--color-border") as string;

  const background = nativeBg || (isDark ? "#0b1120" : "#fffdf5");
  const surface = nativeSurface || (isDark ? "#141d33" : "#ffffff");
  const foreground = nativeForeground || (isDark ? "#f8fafc" : "#101835");
  const border = nativeBorder || (isDark ? "#233052" : "#e4e6ed");

  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  const navTheme: Theme = {
    ...baseTheme,
    dark: isDark,
    colors: {
      ...baseTheme.colors,
      background,
      card: surface,
      text: foreground,
      border,
      primary: "#ffde10",
    },
  };

  return {
    isDark,
    background,
    surface,
    foreground,
    border,
    regularFont: (useUnstableNativeVariable("--font-tajawal") as string) || "Tajawal-Regular",
    boldFont: (useUnstableNativeVariable("--font-tajawal-bold") as string) || "Tajawal-Bold",
    navTheme,
  };
}
