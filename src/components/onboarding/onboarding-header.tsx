import { Pressable, View } from "react-native";

import { AppText } from "@/components/app-text";
import { AppImage } from "@/components/ui/nativewind";
import type { OnboardingHeaderProps } from "@/types/onboarding";

export function OnboardingHeader({
  onSkip,
  canSkip = true,
}: OnboardingHeaderProps) {
  return (
    <View className="w-full h-14 sm:h-16 flex-row items-center justify-between px-5 sm:px-6 relative">
      {/* Centered Brand Logo - Absolutely positioned so it never distorts header layout */}
      <View
        pointerEvents="none"
        className="absolute inset-0 items-center justify-center"
      >
        <AppImage
          source={require("../../../assets/images/logo.png")}
          accessibilityLabel="واو"
          contentFit="contain"
          style={{ width: 44, height: 44 }}
        />
      </View>

      {/* Skip button */}
      <View className="z-10 min-w-[64px] items-start justify-center">
        {canSkip ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="تخطي المقدمة"
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            onPress={onSkip}
            className="py-1.5 px-3.5 rounded-full bg-surface-muted/60 active:opacity-60"
          >
            <AppText
              color="foreground"
              weight="bold"
              className="text-sm sm:text-base"
            >
              تخطي
            </AppText>
          </Pressable>
        ) : null}
      </View>

      {/* Balance Spacer to maintain symmetrical layout */}
      <View className="min-w-[64px]" />
    </View>
  );
}
