import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, useColorScheme, View } from "react-native";

import { AppText } from "@/components/app-text";
import {
  AppBadge,
  AppButton,
  AppCard,
  AppDivider,
  AppSafeAreaView,
} from "@/components/ui";
import { useAppStore } from "@/stores/use-app-store";

export default function ProfileScreen() {
  const resetOnboarding = useAppStore((state) => state.resetOnboarding);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  function handleReplayOnboarding() {
    resetOnboarding();
    router.replace("/onboarding");
  }

  function handleLogout() {
    router.replace("/auth");
  }

  return (
    <AppSafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: 56 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header Card */}
        <AppCard
          padding="lg"
          variant="elevated"
          className="items-center mb-5"
        >
          {/* Avatar with initial */}
          <View className="size-20 rounded-full bg-primary items-center justify-center mb-3 shadow-xs">
            <AppText weight="extraBold" className="text-2xl text-primary-foreground">
              ص
            </AppText>
          </View>

          <AppText weight="extraBold" className="text-xl text-foreground mb-0.5">
            صبري الشيباني
          </AppText>
          <AppText color="muted" className="text-xs mb-3">
            sabri@example.com
          </AppText>

          <AppBadge label="عضو مميز في واو ✨" variant="brand" size="sm" />
        </AppCard>

        {/* Quick Stats Grid */}
        <View className="flex-row gap-3 mb-6">
          <AppCard padding="sm" variant="elevated" className="flex-1 items-center">
            <AppText weight="extraBold" className="text-lg text-foreground">
              14
            </AppText>
            <AppText color="muted" className="text-xs mt-0.5">
              عروض مفعلة
            </AppText>
          </AppCard>

          <AppCard padding="sm" variant="elevated" className="flex-1 items-center">
            <AppText weight="extraBold" className="text-lg text-foreground">
              6
            </AppText>
            <AppText color="muted" className="text-xs mt-0.5">
              متاجر مفضلة
            </AppText>
          </AppCard>

          <AppCard padding="sm" variant="elevated" className="flex-1 items-center">
            <AppText weight="extraBold" className="text-lg text-emerald-500">
              340 د.ل
            </AppText>
            <AppText color="muted" className="text-xs mt-0.5">
              إجمالي التوفير
            </AppText>
          </AppCard>
        </View>

        {/* Preferences & Settings */}
        <View className="mb-6">
          <AppText weight="bold" className="text-sm text-foreground text-right mb-2">
            إعدادات التطبيق
          </AppText>

          <AppCard padding="none" variant="elevated" className="overflow-hidden">
            <Pressable className="flex-row items-center justify-between p-4 active:bg-surface-muted">
              <AppText color="muted" className="text-xs">
                مفعلة 🔔
              </AppText>
              <AppText weight="medium" className="text-sm text-foreground">
                التنبيهات والإشعارات
              </AppText>
            </Pressable>

            <AppDivider />

            <Pressable className="flex-row items-center justify-between p-4 active:bg-surface-muted">
              <AppText color="muted" className="text-xs">
                العربية (ليبيا) 🇱🇾
              </AppText>
              <AppText weight="medium" className="text-sm text-foreground">
                لغة التطبيق
              </AppText>
            </Pressable>

            <AppDivider />

            <Pressable className="flex-row items-center justify-between p-4 active:bg-surface-muted">
              <AppText color="muted" className="text-xs">
                {isDark ? "داكن 🌙" : "فاتح ☀️"}
              </AppText>
              <AppText weight="medium" className="text-sm text-foreground">
                مظهر التطبيق
              </AppText>
            </Pressable>
          </AppCard>
        </View>

        {/* Actions & Session */}
        <View className="gap-3">
          <AppButton
            label="إعادة تجربة شاشات البداية (Onboarding)"
            variant="subtle"
            onPress={handleReplayOnboarding}
          />

          <AppButton
            label="تسجيل الخروج"
            variant="ghost"
            textClassName="text-rose-500"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
}
