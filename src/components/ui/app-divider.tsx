import { View } from "react-native";

import { AppText } from "@/components/app-text";

export interface AppDividerProps {
  label?: string;
  className?: string;
}

export function AppDivider({ label, className = "" }: AppDividerProps) {
  if (!label) {
    return <View className={`h-[1px] w-full bg-border ${className}`} />;
  }

  return (
    <View className={`w-full flex-row items-center gap-3 py-1.5 ${className}`}>
      <View className="flex-1 h-[1px] bg-border" />
      <AppText color="muted" weight="medium" className="text-xs sm:text-sm">
        {label}
      </AppText>
      <View className="flex-1 h-[1px] bg-border" />
    </View>
  );
}
