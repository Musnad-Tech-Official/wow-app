import { Image } from "expo-image";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

// These third-party native components consume style rather than className.
export const AppImage = styled(Image, { className: "style" });
export const AppSafeAreaView = styled(SafeAreaView, { className: "style" });
