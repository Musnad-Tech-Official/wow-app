import { Platform, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Web CSS variables need units; native length variables resolve to numbers.
function length(value: number) {
  return Platform.OS === "web" ? `${value}px` : value;
}

export function useOnboardingLayout(titleSize: number) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scale = Math.min(width / 390, 1.2);
  const availableHeight = height - insets.top - insets.bottom;

  return {
    "--onboarding-height": length(availableHeight),
    "--onboarding-header-height": length(80 * scale),
    "--onboarding-logo-width": length(84 * scale),
    "--onboarding-logo-height": length(56 * scale),
    "--onboarding-logo-image-size": length(112 * scale),
    "--onboarding-logo-left": length(-15 * scale),
    "--onboarding-logo-top": length(-29 * scale),
    "--onboarding-art-height": length(Math.min(310 * scale, availableHeight * 0.4)),
    "--onboarding-title-size": length(titleSize * scale),
    "--onboarding-title-leading": length(42 * scale),
    "--onboarding-body-size": length(18 * scale),
    "--onboarding-body-leading": length(27 * scale),
    "--onboarding-button-size": length(23 * scale),
    "--onboarding-button-height": length(58 * scale),
  };
}
