import { type ReactNode } from "react";
import {
  Modal,
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { AppText } from "@/components/app-text";
import { AppButton, type ButtonVariant } from "@/components/ui/app-button";

export interface AppModalAction {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
}

export interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  icon?: ReactNode;
  primaryAction?: AppModalAction;
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
  style?: StyleProp<ViewStyle>;
}

export function AppModal({
  visible,
  onClose,
  title,
  description,
  children,
  icon,
  primaryAction,
  secondaryAction,
  style,
}: AppModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <View className="flex-1 items-center justify-center bg-black/60 px-6">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="إغلاق النافذة"
          onPress={onClose}
          className="absolute inset-0"
        />

        {/* Modal Dialog Content — 100% Dynamic NativeWind 5 tokens */}
        <View
          style={style}
          className="w-full max-w-[400px] overflow-hidden rounded-3xl p-5 sm:p-6 bg-surface border border-border shadow-xl"
        >
          {/* Header Icon */}
          {icon ? (
            <View className="mb-4 items-center justify-center">
              <View className="size-13 sm:size-14 items-center justify-center rounded-2xl bg-surface-muted">
                {icon}
              </View>
            </View>
          ) : null}

          {/* Title */}
          {title ? (
            <AppText
              accessibilityRole="header"
              weight="extraBold"
              className="text-center text-xl text-foreground"
            >
              {title}
            </AppText>
          ) : null}

          {/* Description */}
          {description ? (
            <AppText
              weight="regular"
              className="mt-1.5 text-center text-sm leading-6 text-muted"
            >
              {description}
            </AppText>
          ) : null}

          {/* Custom Body Content */}
          {children ? <View className="mt-4">{children}</View> : null}

          {/* Actions */}
          {primaryAction || secondaryAction ? (
            <View className="mt-5 w-full gap-2.5">
              {primaryAction ? (
                <AppButton
                  size="md"
                  label={primaryAction.label}
                  variant={primaryAction.variant ?? "brand"}
                  loading={primaryAction.loading}
                  onPress={primaryAction.onPress}
                />
              ) : null}

              {secondaryAction ? (
                <AppButton
                  size="md"
                  label={secondaryAction.label}
                  variant="ghost"
                  onPress={secondaryAction.onPress}
                />
              ) : null}
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}
