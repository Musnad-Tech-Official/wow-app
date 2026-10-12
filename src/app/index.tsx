import { Redirect } from "expo-router";

import { useAppStore } from "@/stores/use-app-store";

export default function RootIndex() {
  const hasCompletedOnboarding = useAppStore(
    (state) => state.hasCompletedOnboarding,
  );

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/auth" />;
}
