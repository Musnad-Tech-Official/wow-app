import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

export interface AppState {
  hasCompletedOnboarding: boolean;
  hasHydrated: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  finishHydration: () => void;
}

type PersistedAppState = Pick<AppState, "hasCompletedOnboarding">;

// A storage argument lets us verify persistence without a native runtime.
export function createAppStore(storage: StateStorage) {
  return create<AppState>()(
    persist(
      (set) => ({
        hasCompletedOnboarding: false,
        hasHydrated: false,
        completeOnboarding: () => set({ hasCompletedOnboarding: true }),
        resetOnboarding: () => set({ hasCompletedOnboarding: false }),
        finishHydration: () => set({ hasHydrated: true }),
      }),
      {
        name: "wow-app-state",
        version: 1,
        storage: createJSONStorage<PersistedAppState>(() => storage),
        // Add future durable settings here; hydration and actions stay in memory.
        partialize: (state) => ({
          hasCompletedOnboarding: state.hasCompletedOnboarding,
        }),
        // Hydrate after mount, including on web where the initial render is on the server.
        skipHydration: true,
        onRehydrateStorage: (state) => (_restoredState, error) => {
          if (error) {
            console.warn("Could not restore saved app state:", error);
          }
          // A storage failure must not leave the app stuck on its loading screen.
          state.finishHydration();
        },
      },
    ),
  );
}
