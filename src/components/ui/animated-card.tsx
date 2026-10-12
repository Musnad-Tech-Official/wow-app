import { type ReactNode } from "react";
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import type { CardPadding, CardVariant } from "@/components/ui/app-card";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface AnimatedCardProps extends Omit<PressableProps, "children" | "style"> {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  onPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function AnimatedCard({
  children,
  variant = "elevated",
  padding = "md",
  onPress,
  className = "",
  style,
  ...pressableProps
}: AnimatedCardProps) {
  // Shared value for smooth 60fps spring scale interaction
  const scale = useSharedValue(1);

  // Standard Tailwind 4-point spacing map
  const paddingMap: Record<CardPadding, string> = {
    none: "",
    sm: "p-3",
    md: "p-4 sm:p-5",
    lg: "p-5 sm:p-6",
  };

  // 100% Dynamic NativeWind 5 theme token variants — zero conditionals
  let variantStyle = "";
  switch (variant) {
    case "elevated":
      variantStyle = "bg-surface border border-border shadow-xs";
      break;
    case "outlined":
      variantStyle = "bg-transparent border border-border";
      break;
    case "flat":
      variantStyle = "bg-surface-muted border border-transparent";
      break;
  }

  const baseStyle = `rounded-2xl ${variantStyle} ${paddingMap[padding]} ${className}`;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  if (onPress) {
    return (
      <AnimatedPressable
        accessibilityRole="button"
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        }}
        style={[style, animatedStyle]}
        className={baseStyle}
        {...pressableProps}
      >
        {children}
      </AnimatedPressable>
    );
  }

  return (
    <Animated.View style={[style, animatedStyle]} className={baseStyle}>
      {children}
    </Animated.View>
  );
}
