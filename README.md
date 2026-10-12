# Wow

An Expo SDK 57 app using Expo Router, NativeWind, local Tajawal fonts, and persisted
Zustand state.

## Brand colors and typography

`global.css` defines colors, font families, and text sizes with NativeWind 5's
CSS-first `@theme` directive. `@theme static` keeps the CSS variables available
even when a token is only used by navigation.
The yellow (`#FFDE10`), navy (`#101835`), and gold (`#FFBF0B`) were sampled from
opaque pixels in `assets/images/logo.png`. The image has a transparent background;
the app's warm background and neutral surface colors are complementary choices.
Use navy text on yellow buttons; white on yellow has little contrast.

Use the generated NativeWind utilities directly:

```tsx
<View className="bg-primary border-border">
  <Text className="font-tajawal-bold text-primary-foreground">Continue</Text>
</View>
```

Available color utilities include `primary`, `primary-pressed`,
`primary-foreground`, `secondary`, `secondary-pressed`, `secondary-foreground`,
`accent`, `background`, `surface`, `surface-muted`, `foreground`, `muted`, and
`border`. Navigation reads its native prop values from the same CSS variables
through `src/theme/use-navigation-theme.ts`; its web implementation uses CSS
`var()` references. `metro.config.js` preserves the variables that navigation
reads so the native compiler does not inline them away. A static theme needs no
React theme provider. If runtime theme overrides are needed, follow NativeWind's
[dynamic themes guide](https://www.nativewind.dev/v5/guides/themes) using
`VariableContextProvider`, CSS defaults, and `inlineVariables.exclude` for every
overridden variable.

All seven local Tajawal font files are embedded in Android and iOS builds through
the `expo-font` config plugin in `app.json`, Expo's recommended native setup.
Create a new development build to apply that native configuration. The root
layout also uses `useFonts` for web and Expo Go; embedded fonts are already loaded
and skipped by the hook. The splash screen waits for fonts and saved app state.
The files contain Arabic and Latin glyphs, and their names match their PostScript
names. See [Expo's font guide](https://docs.expo.dev/develop/user-interface/fonts/).
Use `AppText` for consistent text throughout the app:

```tsx
import { AppText } from "@/components/app-text";

<AppText variant="heading">Welcome</AppText>
<AppText color="muted">Body text in Tajawal Regular</AppText>
<AppText variant="label" weight="bold" color="primaryForeground">Continue</AppText>
```

Variants are `caption`, `body` (default), `label`, `heading`, and `display`.
Weights are `extraLight`, `light`, `regular`, `medium`, `bold`, `extraBold`, and
`black`. `AppText` forwards NativeWind classes to React Native `Text`; its typed
props select complete utility names from `src/theme/text-classes.ts`. Use those
props for typography and color, `className` for layout utilities, and `style` for
inline overrides.
For plain React Native `Text`, use `font-sans`/`font-tajawal` for regular text or
the explicit families (`font-tajawal-bold`, `font-tajawal-medium`, etc.).
Use those named families instead of `font-bold` to select the actual bundled file.

## App state and onboarding

`src/stores/use-app-store.ts` exports the shared Zustand store, backed by AsyncStorage
and Zustand's [persist middleware](https://zustand.docs.pmnd.rs/reference/integrations/persisting-store-data).
The root layout restores saved state before showing routes. First launches open
`src/app/onboarding.tsx`; its Get started button saves completion and opens the home
screen. Subsequent launches skip onboarding.

Select only the field or action a component needs:

```tsx
import { useAppStore } from "@/stores/use-app-store";

const completeOnboarding = useAppStore((state) => state.completeOnboarding);
const hasCompletedOnboarding = useAppStore((state) => state.hasCompletedOnboarding);
```

To replay onboarding during development:

```ts
useAppStore.getState().resetOnboarding();
```

Add future state and actions in `src/stores/app-store.ts`. Include fields that should
survive restarts in `partialize`; temporary state stays in memory. When changing the
saved data format, bump the persistence version and add a migration to keep existing
user data. Run `npm test` for the persistence checks (Node 22.13 or newer).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

Screens live in `src/app/`; components, state, and theme helpers live outside that
directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Validate changes

Run lint, typecheck, and the persistence tests:

```bash
npx expo lint
npx tsc --noEmit
npm test
```

To check production bundling for Android, iOS, and web:

```bash
npx expo export --platform all
```

### Other setup steps

- ESLint is configured in `eslint.config.js`. See ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/) for customization.
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
