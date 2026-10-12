const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");
 
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
 
module.exports = withNativewind(config, {
  // Navigation reads these CSS tokens at runtime; preserve them on native.
  inlineVariables: {
    exclude: [
      "--color-primary",
      "--color-primary-pressed",
      "--color-primary-foreground",
      "--color-secondary",
      "--color-secondary-pressed",
      "--color-secondary-foreground",
      "--color-accent",
      "--color-background",
      "--color-surface",
      "--color-surface-muted",
      "--color-foreground",
      "--color-muted",
      "--color-border",
      "--color-onboarding-foreground",
      "--color-onboarding-muted",
      "--color-onboarding-yellow",
      "--color-onboarding-yellow-pressed",
      "--color-onboarding-dot",
      "--font-tajawal",
      "--font-tajawal-bold",
    ],
  },
});
