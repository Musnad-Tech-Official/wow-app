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
  AppImage,
  AppInput,
} from "@/components/ui";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  function handleSignUp() {
    if (password && confirmPassword && password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }
    setError("");
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
            <View className="mb-4">
              <AppText
                accessibilityRole="header"
                variant="heading"
                weight="black"
                className="text-2xl sm:text-3xl text-foreground text-right"
              >
                إنشاء حساب جديد
              </AppText>

              <AppText
                color="muted"
                weight="medium"
                className="mt-1 text-right text-xs sm:text-sm leading-5"
              >
                انضم اليوم إلى واو واكتشف أقوى العروض والتخفيضات
              </AppText>
            </View>

            {/* Seamless Form Fields */}
            <View className="gap-2.5">
              <AppInput
                label="الاسم الكامل"
                placeholder="مثال: أحمد علي"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                clearable
                rightIcon={
                  <AppImage
                    source={require("../../../assets/images/auth/user.svg")}
                    contentFit="contain"
                    style={{ width: 18, height: 18, tintColor: iconTint }}
                  />
                }
              />

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
                placeholder="8 أحرف على الأقل"
                value={password}
                onChangeText={setPassword}
                isPassword
              />

              <AppInput
                label="تأكيد كلمة المرور"
                placeholder="أعد إدخال كلمة المرور"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                error={error}
                isPassword
              />

              {/* Submit Button */}
              <View className="mt-1.5">
                <AppButton
                  label="إنشاء الحساب ومتابعة"
                  variant="brand"
                  size="lg"
                  loading={loading}
                  onPress={handleSignUp}
                />
              </View>

              {/* Legal Note */}
              <AppText
                color="muted"
                weight="medium"
                className="text-center text-[11px] leading-4 px-2 mt-0.5"
              >
                بالمتابعة أنت توافق على{" "}
                <AppText weight="bold" color="foreground" className="text-[11px]">
                  شروط الاستخدام
                </AppText>{" "}
                و{" "}
                <AppText weight="bold" color="foreground" className="text-[11px]">
                  سياسة الخصوصية
                </AppText>
              </AppText>
            </View>

            {/* Footer / Switch to Sign In */}
            <View className="items-center mt-5 pb-2">
              <View className="flex-row items-center gap-1.5">
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="تسجيل الدخول"
                  onPress={() => router.push("/auth/signin")}
                  hitSlop={8}
                  className="active:opacity-60"
                >
                  <AppText weight="bold" className="text-xs sm:text-sm text-foreground">
                    تسجيل الدخول
                  </AppText>
                </Pressable>
                <AppText color="muted" className="text-xs sm:text-sm">
                  لديك حساب بالفعل؟
                </AppText>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
