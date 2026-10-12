// Complete class names let Tailwind discover every supported text style.
// Token values live in global.css.
export const textClasses = {
  caption: "text-caption",
  body: "text-body",
  label: "text-label",
  heading: "text-heading",
  display: "text-display",
} as const;

export const fontClasses = {
  extraLight: "font-tajawal-extra-light",
  light: "font-tajawal-light",
  regular: "font-tajawal",
  medium: "font-tajawal-medium",
  bold: "font-tajawal-bold",
  extraBold: "font-tajawal-extra-bold",
  black: "font-tajawal-black",
} as const;

export const colorClasses = {
  primary: "text-primary",
  primaryPressed: "text-primary-pressed",
  primaryForeground: "text-primary-foreground",
  secondary: "text-secondary",
  secondaryPressed: "text-secondary-pressed",
  secondaryForeground: "text-secondary-foreground",
  accent: "text-accent",
  background: "text-background",
  surface: "text-surface",
  surfaceMuted: "text-surface-muted",
  foreground: "text-foreground",
  muted: "text-muted",
  border: "text-border",
  onboardingForeground: "text-onboarding-foreground",
  onboardingMuted: "text-onboarding-muted",
} as const;

export type AppColor = keyof typeof colorClasses;
export type FontWeight = keyof typeof fontClasses;
export type TextVariant = keyof typeof textClasses;

export const variantWeights = {
  caption: "regular",
  body: "regular",
  label: "medium",
  heading: "bold",
  display: "extraBold",
} as const satisfies Record<TextVariant, FontWeight>;
