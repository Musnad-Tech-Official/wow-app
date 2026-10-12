import { View } from "react-native";

import { AppText } from "@/components/app-text";
import { AppImage } from "@/components/ui/nativewind";
import type { OnboardingSlideProps } from "@/types/onboarding";

export function OnboardingSlide({ slide, width }: OnboardingSlideProps) {
  return (
    <View
      style={width ? { width } : undefined}
      className="w-full flex-1 items-center justify-center px-4"
    >
      {/* Slide Illustration Art */}
      <View className="h-64 sm:h-72 w-full max-w-[340px] items-center justify-center my-auto">
        <AppImage
          source={slide.image}
          contentFit="contain"
          contentPosition="center"
          accessible={false}
          recyclingKey={slide.id}
          className="h-full w-full"
        />
      </View>

      {/* Typography: Title & Description */}
      <View
        className="w-full items-center gap-2.5 px-4 pt-3 pb-4"
        accessibilityLiveRegion="polite"
      >
        <AppText
          accessibilityRole="header"
          weight="extraBold"
          color="onboardingForeground"
          className="text-center text-[28px] leading-[38px]"
        >
          {slide.title}
        </AppText>
        <AppText
          color="onboardingMuted"
          className="text-center text-[16px] leading-[26px] max-w-[340px]"
        >
          {slide.description}
        </AppText>
      </View>
    </View>
  );
}
