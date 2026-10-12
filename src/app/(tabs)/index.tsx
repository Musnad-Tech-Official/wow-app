import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { AppText } from "@/components/app-text";
import {
  AnimatedCard,
  AppBadge,
  AppCard,
  AppIconButton,
  AppImage,
  AppSafeAreaView,
} from "@/components/ui";

const categories = [
  { id: "all", label: "الكل" },
  { id: "fashion", label: "أزياء وملابس" },
  { id: "electronics", label: "إلكترونيات" },
  { id: "food", label: "مطاعم وكافيهات" },
  { id: "supermarket", label: "سوبرماركت" },
  { id: "perfume", label: "عطور وتجميل" },
];

const featuredOffers = [
  {
    id: "1",
    store: "زارا - فرع الأندلس",
    title: "خصم 40% على التشكيلة الصيفية",
    discount: "40%-",
    distance: "1.2 كم",
    category: "أزياء",
    badgeVariant: "danger" as const,
  },
  {
    id: "2",
    store: "أبل ستور المعتمد",
    title: "عروض على ملحقات الهواتف الذكية",
    discount: "25%-",
    distance: "2.4 كم",
    category: "إلكترونيات",
    badgeVariant: "brand" as const,
  },
  {
    id: "3",
    store: "كافيه دي باتريسيو",
    title: "اشترِ قهوتك المفضلة واحصل على الحلى مجاناً",
    discount: "عرض خاص",
    distance: "800 م",
    category: "مطاعم",
    badgeVariant: "success" as const,
  },
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCouponRevealed, setIsCouponRevealed] = useState(false);

  // --- React Native Reanimated Values & Configs ---
  // Shared values for animated promo reveal
  const couponProgress = useSharedValue(0);
  const couponScale = useSharedValue(1);

  // Easing curve following the Expo Reanimated guide
  const timingConfig = {
    duration: 400,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const animatedCouponStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(couponProgress.value, timingConfig),
      transform: [
        {
          scale: withSpring(couponProgress.value > 0.5 ? 1 : 0.95, {
            damping: 14,
            stiffness: 220,
          }),
        },
      ],
      maxHeight: withTiming(couponProgress.value * 120, timingConfig),
    };
  });

  const animatedBannerScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: couponScale.value }],
    };
  });

  function toggleCoupon() {
    if (isCouponRevealed) {
      couponProgress.value = 0;
      setIsCouponRevealed(false);
    } else {
      couponProgress.value = 1;
      setIsCouponRevealed(true);
    }
  }

  return (
    <AppSafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Bar */}
        <View className="flex-row items-center justify-between px-6 pt-3 pb-4">
          {/* Notification Button */}
          <AppIconButton
            size="md"
            label="الإشعارات"
            variant="surface"
            icon={<AppText className="text-base">🔔</AppText>}
          />

          {/* Location Picker */}
          <View className="items-center">
            <AppText color="muted" weight="medium" className="text-xs">
              موقعك الحالي
            </AppText>
            <View className="flex-row items-center gap-1 mt-0.5">
              <AppText weight="bold" className="text-sm text-foreground">
                طرابلس، حي الأندلس
              </AppText>
              <AppText className="text-xs">📍</AppText>
            </View>
          </View>

          {/* Mini Logo */}
          <AppImage
            source={require("../../../assets/images/logo.png")}
            accessibilityLabel="واو"
            contentFit="contain"
            className="size-11"
          />
        </View>

        {/* Hero Promo Banner with React Native Reanimated */}
        <View className="px-6 my-2">
          <Animated.View style={animatedBannerScaleStyle}>
            <AppCard
              padding="lg"
              variant="elevated"
              className="overflow-hidden bg-primary"
            >
              <View className="items-start gap-2">
                <AppBadge label="عرض اليوم الأقوى 🔥" variant="primary" size="sm" />
                <AppText weight="extraBold" className="text-xl sm:text-2xl text-primary-foreground leading-tight">
                  وفر حتى 50% مع متاجر واو
                </AppText>
                <AppText weight="medium" className="text-xs sm:text-sm text-primary-foreground/80 leading-5">
                  استكشف أحدث التخفيضات الحصرية من المحلات القريبة منك اليوم.
                </AppText>

                {/* Animated Reanimated Revealable Coupon Box */}
                <Animated.View
                  style={animatedCouponStyle}
                  className="w-full overflow-hidden mt-1"
                >
                  <View className="w-full bg-secondary rounded-xl p-3 flex-row items-center justify-between">
                    <View className="items-start">
                      <AppText weight="extraBold" className="text-xs text-primary">
                        كود الخصم الحصري
                      </AppText>
                      <AppText weight="extraBold" className="text-base text-secondary-foreground tracking-wider">
                        WOW50
                      </AppText>
                    </View>
                    <View className="bg-primary/20 rounded-lg px-2.5 py-1">
                      <AppText weight="bold" className="text-[11px] text-primary">
                        تم التفعيل ✓
                      </AppText>
                    </View>
                  </View>
                </Animated.View>

                {/* Toggle Coupon Button */}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="كشف كود الخصم"
                  onPress={toggleCoupon}
                  onPressIn={() => {
                    couponScale.value = withSpring(0.98, { damping: 12, stiffness: 250 });
                  }}
                  onPressOut={() => {
                    couponScale.value = withSpring(1, { damping: 12, stiffness: 250 });
                  }}
                  className="mt-1 flex-row items-center gap-1.5 self-start py-1 active:opacity-75"
                >
                  <AppText weight="bold" className="text-xs text-primary-foreground underline">
                    {isCouponRevealed ? "إخفاء الكود ▲" : "كشف كود الخصم السري 🎁 ▼"}
                  </AppText>
                </Pressable>
              </View>
            </AppCard>
          </Animated.View>
        </View>

        {/* Categories Horizontal Scroll */}
        <View className="mt-4">
          <View className="px-6 mb-2.5">
            <AppText weight="bold" className="text-base text-foreground text-right">
              التصنيفات
            </AppText>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <Pressable
                  key={cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    isSelected
                      ? "bg-secondary"
                      : "bg-surface border border-border"
                  }`}
                >
                  <AppText
                    weight="bold"
                    className={`text-xs ${
                      isSelected
                        ? "text-secondary-foreground"
                        : "text-muted"
                    }`}
                  >
                    {cat.label}
                  </AppText>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Featured Offers Section with AnimatedCard */}
        <View className="px-6 mt-6">
          <View className="flex-row items-center justify-between mb-3">
            <Pressable hitSlop={8} className="active:opacity-60">
              <AppText weight="bold" className="text-xs text-foreground">
                عرض المزيد
              </AppText>
            </Pressable>
            <AppText weight="bold" className="text-base text-foreground">
              أقوى العروض القريبة منك
            </AppText>
          </View>

          <View className="gap-3.5">
            {featuredOffers.map((offer) => (
              <AnimatedCard
                key={offer.id}
                padding="md"
                variant="elevated"
                onPress={() => {}}
                className="gap-2.5"
              >
                <View className="flex-row items-start justify-between">
                  <AppBadge
                    label={offer.discount}
                    variant={offer.badgeVariant}
                    size="sm"
                  />
                  <View className="items-end">
                    <AppText color="muted" weight="medium" className="text-xs">
                      {offer.store}
                    </AppText>
                    <AppText weight="bold" className="text-sm sm:text-base text-foreground text-right mt-0.5">
                      {offer.title}
                    </AppText>
                  </View>
                </View>

                <View className="flex-row items-center justify-between pt-1 border-t border-border/60">
                  <AppText color="muted" className="text-xs">
                    {offer.category}
                  </AppText>
                  <View className="flex-row items-center gap-1">
                    <AppText color="muted" weight="medium" className="text-xs">
                      {offer.distance}
                    </AppText>
                    <AppText className="text-xs">📍</AppText>
                  </View>
                </View>
              </AnimatedCard>
            ))}
          </View>
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
}
