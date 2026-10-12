import { type ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { AppText } from "@/components/app-text";

export type ButtonVariant =
  | "primary"     // Dynamic high-emphasis (Navy in light, soft white in dark)
  | "brand"       // Signature brand yellow (#ffde10) with navy foreground
  | "secondary"   // Outlined dynamic surface card
  | "subtle"      // Low-emphasis tinted surface (surface-muted)
  | "ghost";      // Transparent background

export type ButtonSize = "sm" | "md" | "lg";

export interface AppButtonProps extends Omit<PressableProps, "children" | "style"> {
  label?: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
}

export function AppButton({
  label,
  children,
  variant = "primary",
  size = "lg",
  leftIcon,
  rightIcon,
  fullWidth = true,
  loading = false,
  disabled = false,
  className = "",
  textClassName = "",
  style,
  onPress,
  ...pressableProps
}: AppButtonProps) {
  // Height and spacing sizing using Tailwind scale
  let sizeContainerStyle = "h-13 sm:h-14 px-5 rounded-2xl"; // default "lg"
  let sizeTextStyle = "text-base sm:text-lg leading-6";

  if (size === "sm") {
    sizeContainerStyle = "h-10 px-3.5 rounded-xl";
    sizeTextStyle = "text-sm leading-5";
  } else if (size === "md") {
    sizeContainerStyle = "h-12 px-4 rounded-xl";
    sizeTextStyle = "text-sm sm:text-base leading-5";
  }

  // 100% Dynamic NativeWind 5 token-driven variants — zero JS conditions
  let containerBg = "";
  let textStyle = "";
  let spinnerColor = "#101835";

  switch (variant) {
    case "brand":
      containerBg = "bg-primary active:bg-primary-pressed shadow-xs";
      textStyle = "text-primary-foreground";
      spinnerColor = "#101835";
      break;

    case "primary":
      containerBg = "bg-secondary active:bg-secondary-pressed shadow-xs";
      textStyle = "text-secondary-foreground";
      spinnerColor = "#ffffff";
      break;

    case "secondary":
      containerBg = "bg-surface border border-border shadow-xs active:bg-surface-muted";
      textStyle = "text-foreground";
      spinnerColor = "#616779";
      break;

    case "subtle":
      containerBg = "bg-surface-muted active:opacity-80";
      textStyle = "text-foreground";
      spinnerColor = "#616779";
      break;

    case "ghost":
      containerBg = "bg-transparent active:bg-surface-muted";
      textStyle = "text-foreground";
      spinnerColor = "#616779";
      break;
  }

  const opacityStyle = disabled || loading ? "opacity-50" : "";
  const widthStyle = fullWidth ? "w-full" : "self-start";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={style}
      className={`${sizeContainerStyle} ${widthStyle} ${containerBg} ${opacityStyle} flex-row items-center justify-center transition-transform active:scale-[0.99] ${className}`}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} size="small" />
      ) : (
        <>
          {/* Left Icon */}
          {leftIcon ? (
            <View className="absolute left-4 size-5 items-center justify-center" accessible={false}>
              {leftIcon}
            </View>
          ) : null}

          {/* Button Label or Custom Children */}
          {children ?? (
            <AppText
              weight="bold"
              color="none"
              className={`text-center ${sizeTextStyle} ${textStyle} ${textClassName}`}
            >
              {label}
            </AppText>
          )}

          {/* Right Icon (Standard in Arabic RTL) */}
          {rightIcon ? (
            <View className="absolute right-4 size-5 items-center justify-center" accessible={false}>
              {rightIcon}
            </View>
          ) : null}
        </>
      )}
    </Pressable>
  );
}
