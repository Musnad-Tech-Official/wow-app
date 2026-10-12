import type { ImageProps } from "expo-image";

export interface OnboardingSlide {
  id: string;
  image: ImageProps["source"];
  title: string;
  description: string;
  titleSize: number;
}

export interface OnboardingHeaderProps {
  onSkip: () => void;
  canSkip?: boolean;
}

export interface OnboardingSlideProps {
  slide: OnboardingSlide;
  width?: number;
}

export interface OnboardingControlsProps {
  slides: readonly OnboardingSlide[];
  page: number;
  onSelectPage: (page: number) => void;
  onNext: () => void;
}
