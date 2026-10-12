import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { AppText } from "@/components/app-text";
import {
  AppBadge,
  AppCard,
  AppInput,
  AppSafeAreaView,
} from "@/components/ui";

const trendingSearches = [
  "عروض الجمعة",
  "مطاعم برجر",
  "تخفيضات ملابس",
  "قهوة مختصة",
  "عطور فرنسية",
];

const nearbyStores = [
  { id: "1", name: "هايبر ماركت المدار", type: "سوبرماركت", distance: "600 م", dealsCount: 18 },
  { id: "2", name: "بوتيك النخبة", type: "أزياء رجالية", distance: "1.1 كم", dealsCount: 9 },
  { id: "3", name: "مقهى ومحمصة رسلان", type: "مقهى", distance: "1.4 كم", dealsCount: 4 },
  { id: "4", name: "عالم التقنية للاتصالات", type: "إلكترونيات", distance: "2.0 كم", dealsCount: 12 },
];

export default function ExploreScreen() {
  const [query, setQuery] = useState("");

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
            استكشف المتاجر والعروض
          </AppText>
          <AppText color="muted" className="text-xs text-right mt-1">
            ابحث عن متجرك المفضل أو استعرض أحدث الصفقات في منطقتك
          </AppText>
        </View>

        {/* Search Field */}
        <View className="my-2">
          <AppInput
            placeholder="ابحث عن متجر، منتج، أو خصم..."
            value={query}
            onChangeText={setQuery}
            clearable
            leftIcon={
              <AppText className="text-base">🔍</AppText>
            }
          />
        </View>

        {/* Trending Searches */}
        <View className="my-4">
          <AppText weight="bold" className="text-sm text-foreground text-right mb-2">
            الأكثر بحثاً الآن 🔥
          </AppText>
          <View className="flex-row flex-wrap justify-end gap-2">
            {trendingSearches.map((term, index) => (
              <AppBadge
                key={index}
                label={term}
                variant="outline"
                size="sm"
              />
            ))}
          </View>
        </View>

        {/* Nearby Stores */}
        <View className="mt-4">
          <AppText weight="bold" className="text-base text-foreground text-right mb-3">
            متاجر قريبة تقدم عروضاً
          </AppText>

          <View className="gap-3">
            {nearbyStores.map((store) => (
              <AppCard
                key={store.id}
                variant="elevated"
                padding="md"
                onPress={() => {}}
                className="flex-row items-center justify-between"
              >
                <AppBadge
                  label={`${store.dealsCount} عروض`}
                  variant="brand"
                  size="sm"
                />

                <View className="items-end">
                  <AppText weight="bold" className="text-base text-foreground">
                    {store.name}
                  </AppText>
                  <View className="flex-row items-center gap-2 mt-0.5">
                    <AppText color="muted" className="text-xs">
                      {store.distance}
                    </AppText>
                    <AppText color="muted" className="text-xs">•</AppText>
                    <AppText color="muted" className="text-xs">
                      {store.type}
                    </AppText>
                  </View>
                </View>
              </AppCard>
            ))}
          </View>
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
}
