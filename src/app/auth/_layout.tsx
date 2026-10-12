import { Stack } from "expo-router";

import { useNavigationTheme } from "@/theme/use-navigation-theme";

export default function AuthLayout() {
  const theme = useNavigationTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
