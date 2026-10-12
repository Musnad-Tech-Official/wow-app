import AsyncStorage from "@react-native-async-storage/async-storage";

import { createAppStore } from "./app-store";

// Shared app store. Read individual fields with selectors to limit re-renders.
export const useAppStore = createAppStore(AsyncStorage);
