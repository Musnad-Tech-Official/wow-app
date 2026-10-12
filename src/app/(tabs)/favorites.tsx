import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { AppText } from "@/components/app-text";
import {
  AppBadge,
  AppButton,
  AppCard,
  AppSafeAreaView,
} from "@/components/ui";

const initialFavorites = [
  {
    id: "f1",
    store: "زارا - فرع الأندلس",
    title: "خصم 40% على التشكيلة الصيفية",
    discount: "40%-",
    expiresIn: "ينتهي بعد يومين",
  },
  {
    id: "f2",
    store: "مطعم البرجر الذهبي",
    title: "وجبة مزدوجة مع بطاطس ومشروب مجاناً",
    discount: "عرض مميز",
    expiresIn: "ينتهي غداً",
  },
];

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState(initialFavorites);

  function removeFavorite(id: string) {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <AppSafeAreaView className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView
        contentContainerClassName="px-6 py-4 pb-12"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-4">
          <AppText
            accessibilityRole="header"
            weight="extraBold"
            className="text-2xl text-foreground text-right"
          >
            العروض المفضلة
          </AppText>
          <AppText color="muted" className="text-xs text-right mt-1">
            العروض والصفقات التي قمت بحفظها للرجوع إليها لاحقاً
          </AppText>
        </View>

        {favorites.length === 0 ? (
          <View className="items-center justify-center py-20 px-4">
            <AppText className="text-4xl mb-3">🔖</AppText>
            <AppText weight="bold" className="text-lg text-foreground mb-1 text-center">
              لا توجد عروض محفوظة حالياً
            </AppText>
            <AppText color="muted" className="text-sm text-center max-w-[260px] mb-6">
              تصفح العروض واضغط على زر الحفظ للوصول إليها بسرعة من هنا.
            </AppText>
            <AppButton
              size="md"
              label="استكشف العروض الآن"
              variant="brand"
              onPress={() => router.push("/(tabs)/explore")}
            />
          </View>
        ) : (
          <View className="gap-3.5 mt-2">
            {favorites.map((item) => (
              <AppCard
                key={item.id}
                variant="elevated"
                padding="md"
                className="gap-3"
              >
                <View className="flex-row items-start justify-between">
                  <AppBadge label={item.discount} variant="danger" size="sm" />
                  <View className="items-end">
                    <AppText color="muted" weight="medium" className="text-xs">
                      {item.store}
                    </AppText>
                    <AppText weight="bold" className="text-base text-foreground text-right mt-0.5">
                      {item.title}
                    </AppText>
                  </View>
                </View>

                <View className="flex-row items-center justify-between pt-2 border-t border-border/60">
                  <AppButton
                    size="sm"
                    label="إزالة من المحفوظات"
                    variant="ghost"
                    onPress={() => removeFavorite(item.id)}
                    className="self-start px-0"
                    textClassName="text-xs text-rose-500 font-bold"
                  />
                  <AppText color="muted" className="text-xs">
                    ⏳ {item.expiresIn}
                  </AppText>
                </View>
              </AppCard>
            ))}
          </View>
        )}
      </ScrollView>
    </AppSafeAreaView>
  );
}
