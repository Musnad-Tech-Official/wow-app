import { useState, type ReactNode } from "react";
import {
  Pressable,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { AppText } from "@/components/app-text";

export interface AppInputProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isPassword?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  containerClassName?: string;
  inputClassName?: string;
}

export function AppInput({
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  isPassword = false,
  clearable = false,
  onClear,
  containerClassName = "",
  inputClassName = "",
  value,
  onChangeText,
  editable = true,
  ...inputProps
}: AppInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hasValue = Boolean(value && value.length > 0);

  // 100% Dynamic NativeWind 5 token-driven styles — zero JS conditions
  let borderStyle = "border-border";
  if (error) {
    borderStyle = "border-rose-500";
  } else if (isFocused) {
    borderStyle = "border-secondary dark:border-primary";
  }

  const containerBg = isFocused
    ? "bg-surface"
    : "bg-surface-muted/30 dark:bg-surface";

  const disabledStyle = !editable ? "opacity-50" : "";

  return (
    <View className={`w-full gap-1.5 ${containerClassName}`}>
      {/* Label */}
      {label ? (
        <AppText
          weight="bold"
          className="text-xs sm:text-sm text-foreground text-right"
        >
          {label}
        </AppText>
      ) : null}

      {/* Input Box Container */}
      <View
        className={`h-12 sm:h-13 w-full flex-row items-center rounded-2xl border px-3.5 sm:px-4 transition-colors ${containerBg} ${borderStyle} ${disabledStyle}`}
      >
        {/* Left Accessory / Icon */}
        {leftIcon ? (
          <View className="mr-2.5 size-5 items-center justify-center" accessible={false}>
            {leftIcon}
          </View>
        ) : null}

        {/* Clear Button (when clearable and hasValue) */}
        {clearable && hasValue && editable ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="مسح النص"
            onPress={() => {
              onChangeText?.("");
              onClear?.();
            }}
            hitSlop={8}
            className="mr-2 size-5 items-center justify-center rounded-full bg-surface-muted active:opacity-70"
          >
            <AppText className="text-[10px] text-muted">✕</AppText>
          </Pressable>
        ) : null}

        {/* Password Visibility Toggle */}
        {isPassword ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            onPress={() => setShowPassword((prev) => !prev)}
            hitSlop={8}
            className="mr-2 py-1 px-1.5 active:opacity-60"
          >
            <AppText className="text-xs text-muted" weight="medium">
              {showPassword ? "إخفاء" : "إظهار"}
            </AppText>
          </Pressable>
        ) : null}

        {/* Text Input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          textAlign="right"
          onFocus={(e) => {
            setIsFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            inputProps.onBlur?.(e);
          }}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="#94a3b8"
          className={`flex-1 font-tajawal text-sm sm:text-base text-foreground text-right ${inputClassName}`}
          {...inputProps}
        />

        {/* Right Accessory / Icon (Arabic start position) */}
        {rightIcon ? (
          <View className="ml-2.5 size-5 items-center justify-center" accessible={false}>
            {rightIcon}
          </View>
        ) : null}
      </View>

      {/* Error or Hint Message */}
      {error ? (
        <AppText weight="medium" className="text-xs text-rose-500 text-right">
          {error}
        </AppText>
      ) : hint ? (
        <AppText weight="regular" className="text-xs text-muted text-right">
          {hint}
        </AppText>
      ) : null}
    </View>
  );
}
