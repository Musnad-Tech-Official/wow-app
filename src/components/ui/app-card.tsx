import { type ReactNode } from "react";
import {
  Pressable,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

export type CardVariant = "elevated" | "outlined" | "flat";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface AppCardProps extends Omit<PressableProps, "children" | "style"> {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  onPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function AppCard({
  children,
  variant = "elevated",
  padding = "md",
  onPress,
  className = "",
  style,
  ...pressableProps
}: AppCardProps) {
  // Cohesive spacing map adhering to Tailwind 4-point scale
  const paddingMap: Record<CardPadding, string> = {
    none: "",
    sm: "p-3",
    md: "p-4 sm:p-5",
    lg: "p-5 sm:p-6",
  };

  // 100% Dynamic NativeWind 5 token-driven variants — zero JS conditions
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

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={style}
        className={`${baseStyle} transition-transform active:scale-[0.99] active:opacity-90`}
        {...pressableProps}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={style} className={baseStyle}>
      {children}
    </View>
  );
}
