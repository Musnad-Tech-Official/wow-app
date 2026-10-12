import { Text, type TextProps } from "react-native";

import {
  colorClasses,
  fontClasses,
  textClasses,
  variantWeights,
  type AppColor,
  type FontWeight,
  type TextVariant,
} from "@/theme/text-classes";

export interface AppTextProps extends TextProps {
  variant?: TextVariant;
  weight?: FontWeight;
  color?: AppColor | "none" | "inherit";
}

// React Native does not inherit a font from its parent View.
export function AppText({
  variant = "body",
  weight,
  color = "foreground",
  className,
  style,
  ...props
}: AppTextProps) {
  const colorClass =
    color && color !== "none" && color !== "inherit"
      ? colorClasses[color as AppColor]
      : "";

  return (
    <Text
      {...props}
      className={[
        textClasses[variant],
        fontClasses[weight ?? variantWeights[variant]],
        colorClass,
        className,
      ].filter(Boolean).join(" ")}
      style={style}
    />
  );
}
