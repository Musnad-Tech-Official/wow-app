import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

import { OnboardingControls } from "@/components/onboarding/onboarding-controls";
import { OnboardingHeader } from "@/components/onboarding/onboarding-header";
import { OnboardingSlide } from "@/components/onboarding/onboarding-slide";
import { AppSafeAreaView } from "@/components/ui/nativewind";
import { onboardingSlides } from "@/data/onboarding";
import { useAppStore } from "@/stores/use-app-store";
import type { OnboardingSlide as OnboardingSlideType } from "@/types/onboarding";

export default function OnboardingScreen() {
  const [page, setPage] = useState(0);
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);
  const flatListRef = useRef<FlatList<OnboardingSlideType>>(null);
  const { width } = useWindowDimensions();

  // Constrain width on tablets and desktop web to preserve sleek mobile proportions
  const containerWidth = Math.min(width, 560);

  const finishOnboarding = useCallback(() => {
    completeOnboarding();
    router.replace("/auth");
  }, [completeOnboarding]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / containerWidth);
      if (index >= 0 && index < onboardingSlides.length && index !== page) {
        setPage(index);
      }
    },
    [containerWidth, page],
  );

  const selectPage = useCallback(
    (targetPage: number) => {
      setPage(targetPage);
      flatListRef.current?.scrollToIndex({
        index: targetPage,
        animated: true,
      });
    },
    [],
  );

  const nextPage = useCallback(() => {
    if (page === onboardingSlides.length - 1) {
      finishOnboarding();
    } else {
      const nextIndex = page + 1;
      setPage(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }
  }, [finishOnboarding, page]);

  return (
    <AppSafeAreaView className="flex-1 bg-surface">
      <StatusBar style="auto" />
      <View className="flex-1 items-center">
        <View style={{ width: containerWidth }} className="flex-1 justify-between">
          <OnboardingHeader
            onSkip={finishOnboarding}
            canSkip={page < onboardingSlides.length - 1}
          />

          <FlatList
            ref={flatListRef}
            data={onboardingSlides}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onMomentumScrollEnd={handleScroll}
            scrollEventThrottle={16}
            getItemLayout={(_, index) => ({
              length: containerWidth,
              offset: containerWidth * index,
              index,
            })}
            renderItem={({ item }) => (
              <OnboardingSlide slide={item} width={containerWidth} />
            )}
            className="flex-1"
          />

          <OnboardingControls
            slides={onboardingSlides}
            page={page}
            onSelectPage={selectPage}
            onNext={nextPage}
          />
        </View>
      </View>
    </AppSafeAreaView>
  );
}
