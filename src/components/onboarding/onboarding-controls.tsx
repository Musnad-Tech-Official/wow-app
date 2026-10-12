import { Pressable, View } from "react-native";

import { AppText } from "@/components/app-text";
import type { OnboardingControlsProps } from "@/types/onboarding";

export function OnboardingControls({
  slides,
  page,
  onSelectPage,
  onNext,
}: OnboardingControlsProps) {
  const isLast = page === slides.length - 1;
  const label = isLast ? "ابدأ الآن" : "التالي";

  return (
    <View className="gap-3 px-6 pb-6 pt-2">
      {/* Expanding Pill Pagination Indicators */}
      <View
        className="flex-row items-center justify-center gap-2 py-2"
        accessibilityRole="radiogroup"
      >
        {slides.map((slide, index) => {
          const isActive = index === page;
          return (
            <Pressable
              key={slide.id}
              accessibilityRole="radio"
              accessibilityLabel={`الشاشة ${index + 1} من ${slides.length}: ${slide.title}`}
              aria-checked={isActive}
              hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
              onPress={() => onSelectPage(index)}
              className="items-center justify-center py-1"
            >
              <View
                className={`h-2.5 rounded-full ${
                  isActive
                    ? "w-7 bg-onboarding-yellow"
                    : "w-2.5 bg-onboarding-dot"
                }`}
              />
            </Pressable>
          );
        })}
      </View>

      {/* Primary Action Button with RTL Forward Arrow */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onNext}
        className="h-14 flex-row items-center justify-center gap-3 rounded-2xl bg-onboarding-yellow px-6 shadow-sm active:bg-onboarding-yellow-pressed active:opacity-95"
      >
        <AppText
          weight="extraBold"
          color="primaryForeground"
          className="text-xl leading-7"
        >
          {label}
        </AppText>
        {/* RTL Arrow pointing Left (←) */}
        <View className="size-5 items-center justify-center" accessible={false}>
          <View className="h-[2.5px] w-4 rounded-[2px] bg-primary-foreground" />
          <View className="absolute left-0 size-2.5 -rotate-45 border-t-[2.5px] border-l-[2.5px] border-primary-foreground" />
        </View>
      </Pressable>
    </View>
  );
}
