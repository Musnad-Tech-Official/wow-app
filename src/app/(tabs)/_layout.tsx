import { Tabs } from "expo-router";
import { Platform, useColorScheme } from "react-native";

import { TabBarIcon } from "@/components/navigation/tab-bar-icon";
import { useNavigationTheme } from "@/theme/use-navigation-theme";

export default function TabLayout() {
  const theme = useNavigationTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const activeColor = isDark ? "#ffde10" : "#d97706";
  const inactiveColor = isDark ? "#94a3b8" : "#616779";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          height: Platform.select({ ios: 88, default: 68 }),
          paddingBottom: Platform.select({ ios: 28, default: 10 }),
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: theme.boldFont,
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "الرئيسية",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "استكشف",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="explore" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "المفضلة",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="favorites" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "حسابي",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="profile" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
