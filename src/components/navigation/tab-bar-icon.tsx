import { View, type ColorValue } from "react-native";

export interface TabBarIconProps {
  name: "home" | "explore" | "favorites" | "profile";
  focused: boolean;
  color: ColorValue;
  size?: number;
}

export function TabBarIcon({ name, focused, color, size = 24 }: TabBarIconProps) {
  switch (name) {
    case "home":
      return (
        <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
          {/* Roof */}
          <View
            style={{
              width: 0,
              height: 0,
              borderLeftWidth: 10,
              borderRightWidth: 10,
              borderBottomWidth: 9,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: color,
            }}
          />
          {/* Base */}
          <View
            style={{
              width: 16,
              height: 11,
              backgroundColor: focused ? color : "transparent",
              borderColor: color,
              borderWidth: 2,
              borderTopWidth: 0,
              borderBottomLeftRadius: 3,
              borderBottomRightRadius: 3,
            }}
          />
        </View>
      );

    case "explore":
      return (
        <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
          {/* Compass / Magnifying glass circle */}
          <View
            style={{
              width: 17,
              height: 17,
              borderRadius: 9,
              borderWidth: 2.2,
              borderColor: color,
              backgroundColor: focused ? color : "transparent",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Compass needle */}
            <View
              style={{
                width: 7,
                height: 7,
                transform: [{ rotate: "45deg" }],
                backgroundColor: focused ? "#ffffff" : color,
                borderRadius: 1,
              }}
            />
          </View>
        </View>
      );

    case "favorites":
      return (
        <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
          {/* Bookmark / Ribbon shape */}
          <View
            style={{
              width: 14,
              height: 18,
              borderWidth: 2,
              borderColor: color,
              backgroundColor: focused ? color : "transparent",
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
              borderBottomLeftRadius: 2,
              borderBottomRightRadius: 2,
            }}
          />
        </View>
      );

    case "profile":
      return (
        <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
          {/* Head */}
          <View
            style={{
              width: 9,
              height: 9,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: color,
              backgroundColor: focused ? color : "transparent",
              marginBottom: 2,
            }}
          />
          {/* Body */}
          <View
            style={{
              width: 16,
              height: 8,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderWidth: 2,
              borderBottomWidth: 0,
              borderColor: color,
              backgroundColor: focused ? color : "transparent",
            }}
          />
        </View>
      );
  }
}
