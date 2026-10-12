import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/app-text";
import {
  AppButton,
  AppDivider,
  AppImage,
} from "@/components/ui";

export default function AuthGatewayScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
          paddingTop: Math.max(insets.top, 24),
          paddingBottom: Math.max(insets.bottom, 24),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-[400px] items-center">
          {/* Header & Brand Identity */}
          <View className="w-full items-center mb-6 sm:mb-8">
            <AppImage
              source={require("../../../assets/images/logo.png")}
              accessibilityLabel="واو"
              contentFit="contain"
              style={{ width: 300, height: 300 }}
            />

            <AppText
              accessibilityRole="header"
              variant="display"
              weight="black"
              color="foreground"
              className="text-center text-3xl sm:text-4xl leading-tight mt-2"
              style={{ fontSize: 32, lineHeight: 42 }}
            >
              مرحباً بك في واو
            </AppText>

            <AppText
              color="muted"
              weight="medium"
              className="text-center text-lg sm:text-xl leading-relaxed mt-2 max-w-[340px]"
              style={{ fontSize: 18, lineHeight: 28 }}
            >
              اكتشف أفضل العروض من المتاجر القريبة{"\n"}منك في مكان واحد
            </AppText>
          </View>

          {/* Actions & Legal Footer */}
          <View className="w-full items-center">
            <View className="w-full gap-3 mb-4">
              {/* 1. Primary Action: Sign in with Email (Brand Yellow) */}
              <AppButton
                label="تسجيل بالإيميل"
                variant="brand"
                onPress={() => router.push("/auth/signin")}
                rightIcon={
                  <AppImage
                    source={require("../../../assets/images/auth/mail.svg")}
                    contentFit="contain"
                    style={{ width: 20, height: 20, tintColor: "#101835" }}
                  />
                }
              />

              {/* 2. Continue with Google */}
              <AppButton
                label="المتابعة باستخدام جوجل"
                variant="secondary"
                onPress={() => router.replace("/(tabs)")}
                rightIcon={
                  <AppImage
                    source={require("../../../assets/images/auth/google.svg")}
                    contentFit="contain"
                    style={{ width: 20, height: 20 }}
                  />
                }
              />

              {/* 3. Continue with Facebook */}
              <AppButton
                label="المتابعة باستخدام فيسبوك"
                variant="secondary"
                onPress={() => router.replace("/(tabs)")}
                rightIcon={
                  <AppImage
                    source={require("../../../assets/images/auth/facebook.svg")}
                    contentFit="contain"
                    style={{ width: 20, height: 20 }}
                  />
                }
              />

              {/* Divider */}
              <AppDivider label="أو" className="my-0.5" />

              {/* 4. Continue as Guest */}
              <AppButton
                label="المتابعة كزائر"
                variant="secondary"
                onPress={() => router.replace("/(tabs)")}
                rightIcon={
                  <AppImage
                    source={require("../../../assets/images/auth/user.svg")}
                    contentFit="contain"
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: isDark ? "#f8fafc" : "#101835",
                    }}
                  />
                }
              />
            </View>

            {/* Legal / Terms of Service */}
            <View className="items-center px-4 pt-1">
              <AppText
                color="muted"
                className="text-center text-xs leading-5 max-w-[320px]"
              >
                بالمتابعة أنت توافق على{" "}
                <AppText weight="bold" color="foreground" className="text-xs">
                  شروط الاستخدام
                </AppText>{" "}
                و{" "}
                <AppText weight="bold" color="foreground" className="text-xs">
                  سياسة الخصوصية
                </AppText>{" "}
                الخاصة بنا
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
