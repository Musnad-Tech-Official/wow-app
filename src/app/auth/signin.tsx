import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/app-text";
import {
  AppButton,
  AppDivider,
  AppImage,
  AppInput,
} from "@/components/ui";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  function handleBack() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/auth");
    }
  }

  function handleSignIn() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 400);
  }

  const iconTint = isDark ? "#94a3b8" : "#616779";

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: Math.max(insets.top, 16) + 4,
            paddingBottom: Math.max(insets.bottom, 20),
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full max-w-[400px]">
            {/* Top Navigation Bar with Back Button */}
            <View className="w-full flex-row items-center justify-between mb-4">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="رجوع"
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                onPress={handleBack}
                className="size-10 items-center justify-center rounded-full bg-surface border border-border shadow-xs active:bg-surface-muted"
              >
                {/* RTL Back Arrow (Pointing Right) */}
                <View className="size-4 items-center justify-center" accessible={false}>
                  <View className="h-[2px] w-3.5 rounded-full bg-foreground" />
                  <View className="absolute right-0 size-2 rotate-45 border-t-2 border-r-2 border-foreground" />
                </View>
              </Pressable>

              <AppImage
                source={require("../../../assets/images/logo.png")}
                accessibilityLabel="واو"
                contentFit="contain"
                style={{ width: 38, height: 38 }}
              />

              {/* Symmetrical Spacer */}
              <View className="size-10" />
            </View>

            {/* Header Typography */}
            <View className="mb-5">
              <AppText
                accessibilityRole="header"
                variant="heading"
                weight="black"
                className="text-2xl sm:text-3xl text-foreground text-right"
              >
                تسجيل الدخول
              </AppText>

              <AppText
                color="muted"
                weight="medium"
                className="mt-1 text-right text-xs sm:text-sm leading-5"
              >
                مرحباً بعودتك! أدخل بيانات حسابك للمتابعة واكتشاف العروض
              </AppText>
            </View>

            {/* Seamless Form Fields */}
            <View className="gap-3">
              <AppInput
                label="البريد الإلكتروني"
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                clearable
                rightIcon={
                  <AppImage
                    source={require("../../../assets/images/auth/mail.svg")}
                    contentFit="contain"
                    style={{ width: 18, height: 18, tintColor: iconTint }}
                  />
                }
              />

              <AppInput
                label="كلمة المرور"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                isPassword
              />

              {/* Remember Me & Forgot Password Row */}
              <View className="flex-row items-center justify-between pt-0.5">
                {/* Forgot Password */}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="استعادة كلمة المرور"
                  hitSlop={8}
                  className="active:opacity-60"
                >
                  <AppText weight="bold" className="text-xs sm:text-sm text-foreground">
                    نسيت كلمة المرور؟
                  </AppText>
                </Pressable>

                {/* Remember Me */}
                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: rememberMe }}
                  onPress={() => setRememberMe((prev) => !prev)}
                  hitSlop={8}
                  className="flex-row items-center gap-2 active:opacity-75"
                >
                  <AppText color="muted" weight="medium" className="text-xs sm:text-sm">
                    تذكرني
                  </AppText>
                  <View
                    className={`size-4 sm:size-4.5 rounded items-center justify-center border ${
                      rememberMe
                        ? "bg-primary border-primary"
                        : "border-border bg-surface"
                    }`}
                  >
                    {rememberMe ? (
                      <AppText className="text-[10px] text-primary-foreground font-bold">✓</AppText>
                    ) : null}
                  </View>
                </Pressable>
              </View>

              {/* Submit Button */}
              <View className="mt-1.5">
                <AppButton
                  label="تسجيل الدخول"
                  variant="brand"
                  size="lg"
                  loading={loading}
                  onPress={handleSignIn}
                />
              </View>
            </View>

            {/* Social Logins */}
            <View className="my-4">
              <AppDivider label="أو المتابعة عبر" />
            </View>

            <View className="flex-row gap-2.5">
              <View className="flex-1">
                <AppButton
                  size="md"
                  label="جوجل"
                  variant="secondary"
                  onPress={() => router.replace("/(tabs)")}
                  rightIcon={
                    <AppImage
                      source={require("../../../assets/images/auth/google.svg")}
                      contentFit="contain"
                      style={{ width: 18, height: 18 }}
                    />
                  }
                />
              </View>

              <View className="flex-1">
                <AppButton
                  size="md"
                  label="فيسبوك"
                  variant="secondary"
                  onPress={() => router.replace("/(tabs)")}
                  rightIcon={
                    <AppImage
                      source={require("../../../assets/images/auth/facebook.svg")}
                      contentFit="contain"
                      style={{ width: 18, height: 18 }}
                    />
                  }
                />
              </View>
            </View>

            {/* Footer / Switch to Sign Up */}
            <View className="items-center mt-5 pb-2">
              <View className="flex-row items-center gap-1.5">
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="إنشاء حساب جديد"
                  onPress={() => router.push("/auth/signup")}
                  hitSlop={8}
                  className="active:opacity-60"
                >
                  <AppText weight="bold" className="text-xs sm:text-sm text-foreground">
                    إنشاء حساب جديد
                  </AppText>
                </Pressable>
                <AppText color="muted" className="text-xs sm:text-sm">
                  ليس لديك حساب؟
                </AppText>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
