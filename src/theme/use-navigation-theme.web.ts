import { DarkTheme, DefaultTheme, type Theme } from "expo-router";
import { useColorScheme } from "react-native";

import type { NavigationTheme } from "./use-navigation-theme";

export type { NavigationTheme };

// The browser resolves these CSS variables, including during static rendering.
export function useNavigationTheme(): NavigationTheme {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  const navTheme: Theme = {
    ...baseTheme,
    dark: isDark,
    colors: {
      ...baseTheme.colors,
      background: isDark ? "#0b1120" : "#fffdf5",
      card: isDark ? "#141d33" : "#ffffff",
      text: isDark ? "#f8fafc" : "#101835",
      border: isDark ? "#233052" : "#e4e6ed",
      primary: "#ffde10",
    },
  };

  return {
    isDark,
    background: "var(--color-background)",
    surface: "var(--color-surface)",
    foreground: "var(--color-foreground)",
    border: "var(--color-border)",
    regularFont: "var(--font-tajawal)",
    boldFont: "var(--font-tajawal-bold)",
    navTheme,
  };
}
