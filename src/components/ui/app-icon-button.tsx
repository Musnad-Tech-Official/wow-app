import { type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

export type IconButtonVariant = "ghost" | "surface" | "brand" | "subtle";
export type IconButtonSize = "sm" | "md" | "lg";

export interface AppIconButtonProps extends Omit<PressableProps, "children" | "style"> {
  icon: ReactNode;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  rounded?: "full" | "xl" | "2xl";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function AppIconButton({
  icon,
  label,
  variant = "surface",
  size = "md",
  rounded = "full",
  loading = false,
  disabled = false,
  className = "",
  style,
  onPress,
  ...pressableProps
}: AppIconButtonProps) {
  // Sizing map adhering to Tailwind scale
  const sizeMap: Record<IconButtonSize, string> = {
    sm: "size-9",
    md: "size-11",
    lg: "size-13 sm:size-14",
  };

  const roundedMap = {
    full: "rounded-full",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  // 100% Dynamic NativeWind 5 token-driven variants — zero JS conditions
  let variantBg = "";
  let spinnerColor = "#101835";

  switch (variant) {
    case "surface":
      variantBg = "bg-surface border border-border shadow-xs active:bg-surface-muted";
      spinnerColor = "#616779";
      break;

    case "ghost":
      variantBg = "bg-transparent active:bg-surface-muted";
      spinnerColor = "#616779";
      break;

    case "brand":
      variantBg = "bg-primary active:bg-primary-pressed shadow-xs";
      spinnerColor = "#101835";
      break;

    case "subtle":
      variantBg = "bg-surface-muted active:opacity-80";
      spinnerColor = "#616779";
      break;
  }

  const opacityStyle = disabled || loading ? "opacity-50" : "";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={style}
      className={`items-center justify-center transition-transform active:scale-95 ${sizeMap[size]} ${roundedMap[rounded]} ${variantBg} ${opacityStyle} ${className}`}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} size="small" />
      ) : (
        icon
      )}
    </Pressable>
  );
}
