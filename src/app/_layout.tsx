import "../../global.css";
import { useFonts } from "expo-font";
import { Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { useAppStore } from "@/stores/use-app-store";
import { fontAssets } from "@/theme/font-assets";
import { useNavigationTheme } from "@/theme/use-navigation-theme";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useNavigationTheme();
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const hasHydrated = useAppStore((state) => state.hasHydrated);
  const hasCompletedOnboarding = useAppStore(
    (state) => state.hasCompletedOnboarding,
  );

  useEffect(() => {
    void useAppStore.persist.rehydrate();
  }, []);

  const isReady = hasHydrated && (fontsLoaded || !!fontError);

  useEffect(() => {
    if (fontError) {
      console.warn("Could not load Tajawal fonts:", fontError);
    }
  }, [fontError]);

  useEffect(() => {
    if (isReady) {
      void SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <ThemeProvider value={theme.navTheme}>
      <StatusBar hidden />
      {isReady ? (
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: theme.background },
            headerStyle: { backgroundColor: theme.surface },
            headerTintColor: theme.foreground,
            headerTitleStyle: { fontFamily: theme.boldFont },
            headerBackTitleStyle: { fontFamily: theme.regularFont },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />

          {/* Route Protection: Uncompleted users only access onboarding */}
          <Stack.Protected guard={!hasCompletedOnboarding}>
            <Stack.Screen
              name="onboarding/index"
              options={{ headerShown: false }}
            />
          </Stack.Protected>

          {/* Route Protection: Completed users can access auth & app tabs */}
          <Stack.Protected guard={hasCompletedOnboarding}>
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      ) : (
        <View className="flex-1 items-center justify-center bg-background">
          <ActivityIndicator
            color={theme.foreground}
            size="large"
            accessibilityLabel="Loading app"
          />
        </View>
      )}
    </ThemeProvider>
  );
}
