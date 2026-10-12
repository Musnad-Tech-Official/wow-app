import { type ReactNode } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";

import { AppText } from "@/components/app-text";

export type BadgeVariant =
  | "brand"    // Primary yellow accent
  | "primary"  // High contrast secondary/navy
  | "success"  // Green/Offer active
  | "danger"   // Red/Expiring soon or discount percentage
  | "muted"    // Subtle background
  | "outline"; // Outlined pill

export type BadgeSize = "sm" | "md";

export interface AppBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function AppBadge({
  label,
  variant = "brand",
  size = "md",
  icon,
  className = "",
  style,
}: AppBadgeProps) {
  // Spacing & text sizing adhering to Tailwind scale
  const sizeContainer = size === "sm" ? "px-2.5 py-0.5" : "px-3 py-1";
  const sizeText = size === "sm" ? "text-xs leading-4" : "text-sm leading-5";

  // 100% Dynamic NativeWind 5 token-driven variants — zero JS conditions
  let containerBg = "";
  let textClass = "";

  switch (variant) {
    case "brand":
      containerBg = "bg-primary";
      textClass = "text-primary-foreground";
      break;

    case "primary":
      containerBg = "bg-secondary";
      textClass = "text-secondary-foreground";
      break;

    case "success":
      containerBg = "bg-emerald-500/15 border border-emerald-500/30";
      textClass = "text-emerald-700 dark:text-emerald-300";
      break;

    case "danger":
      containerBg = "bg-rose-500/15 border border-rose-500/30";
      textClass = "text-rose-700 dark:text-rose-300";
      break;

    case "muted":
      containerBg = "bg-surface-muted";
      textClass = "text-muted";
      break;

    case "outline":
      containerBg = "bg-transparent border border-border";
      textClass = "text-foreground";
      break;
  }

  return (
    <View
      style={style}
      className={`flex-row items-center justify-center rounded-full gap-1.5 ${sizeContainer} ${containerBg} ${className}`}
    >
      {icon ? <View accessible={false}>{icon}</View> : null}
      <AppText weight="bold" color="none" className={`${sizeText} ${textClass}`}>
        {label}
      </AppText>
    </View>
  );
}
