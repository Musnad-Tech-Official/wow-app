import assert from "node:assert/strict";
import { test } from "node:test";

import { createAppStore } from "../src/stores/app-store.ts";

function createMemoryStorage() {
  const values = new Map();
  return {
    values,
    async getItem(key) {
      return values.get(key) ?? null;
    },
    async setItem(key, value) {
      values.set(key, value);
    },
    async removeItem(key) {
      values.delete(key);
    },
  };
}

test("a first launch waits for hydration and requires onboarding", async () => {
  const store = createAppStore(createMemoryStorage());
  assert.equal(store.getState().hasHydrated, false);
  await store.persist.rehydrate();
  assert.equal(store.getState().hasHydrated, true);
  assert.equal(store.getState().hasCompletedOnboarding, false);
});

test("completion survives a restart while hydration stays in memory", async () => {
  const storage = createMemoryStorage();
  const firstLaunch = createAppStore(storage);
  await firstLaunch.persist.rehydrate();
  firstLaunch.getState().completeOnboarding();

  const saved = JSON.parse(storage.values.get(firstLaunch.persist.getOptions().name));
  assert.deepEqual(saved.state, { hasCompletedOnboarding: true });

  const nextLaunch = createAppStore(storage);
  assert.equal(nextLaunch.getState().hasHydrated, false);
  await nextLaunch.persist.rehydrate();
  assert.equal(nextLaunch.getState().hasCompletedOnboarding, true);
  assert.equal(nextLaunch.getState().hasHydrated, true);
  assert.equal(typeof nextLaunch.getState().completeOnboarding, "function");
});

test("routing stays pending until asynchronous storage finishes loading", async () => {
  const storage = createMemoryStorage();
  const previousLaunch = createAppStore(storage);
  await previousLaunch.persist.rehydrate();
  previousLaunch.getState().completeOnboarding();

  let resolveRead;
  const store = createAppStore({
    ...storage,
    getItem: (key) => new Promise((resolve) => {
      resolveRead = () => resolve(storage.values.get(key) ?? null);
    }),
  });
  const hydration = store.persist.rehydrate();
  assert.equal(store.getState().hasHydrated, false);
  resolveRead();
  await hydration;
  assert.equal(store.getState().hasHydrated, true);
  assert.equal(store.getState().hasCompletedOnboarding, true);
});

test("resetting onboarding is saved for the next launch", async () => {
  const storage = createMemoryStorage();
  const store = createAppStore(storage);
  await store.persist.rehydrate();
  store.getState().completeOnboarding();
  store.getState().resetOnboarding();

  const nextLaunch = createAppStore(storage);
  await nextLaunch.persist.rehydrate();
  assert.equal(nextLaunch.getState().hasCompletedOnboarding, false);
});

test("invalid saved JSON does not leave the loading screen stuck", async (context) => {
  context.mock.method(console, "warn", () => {});
  const store = createAppStore({
    ...createMemoryStorage(),
    async getItem() {
      return "invalid JSON";
    },
  });
  await store.persist.rehydrate();
  assert.equal(store.getState().hasHydrated, true);
  assert.equal(store.getState().hasCompletedOnboarding, false);
  assert.equal(console.warn.mock.callCount(), 1);
});
