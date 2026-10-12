import type { OnboardingSlide } from "@/types/onboarding";

export const onboardingSlides = [
  {
    id: "discover",
    image: require("../../assets/images/onboarding/onboarding-06.png"),
    title: "اكتشف العروض بلمسة واو",
    description: "كل التخفيضات والخصومات من المتاجر القريبة\nمنك في مكان واحد.",
    titleSize: 28,
  },
  {
    id: "nearby",
    image: require("../../assets/images/onboarding/onboarding-02.png"),
    title: "العروض الأقرب إليك",
    description: "استعرض الخصومات حسب موقعك واكتشف\nأفضل الصفقات في مدينتك وشارعك.",
    titleSize: 34,
  },
  {
    id: "savings",
    image: require("../../assets/images/onboarding/onboarding-03.png"),
    title: "وفّر بقرار أذكى",
    description: "شاهد السعر قبل وبعد ونسبة الخصم لتختار\nالعرض الأنسب وتستفيد أكثر.",
    titleSize: 36,
  },
  {
    id: "favorites",
    image: require("../../assets/images/onboarding/onboarding-04.png"),
    title: "تابع متاجرك المفضلة",
    description: "احفظ عروضك المميزة وتابع أحدث التخفيضات\nمن المتاجر التي تحبها بسهولة.",
    titleSize: 33,
  },
  {
    id: "notifications",
    image: require("../../assets/images/onboarding/onboarding-05.png"),
    title: "لا يفوتك أي عرض",
    description: "فعّل التنبيهات لتصلك العروض الجديدة\nوالعروض التي تنتهي قريباً أولاً بأول.",
    titleSize: 36,
  },
  {
    id: "ready",
    image: require("../../assets/images/onboarding/onboarding-01.png"),
    title: "جاهز لعالم واو؟",
    description: "ابدأ الآن واستمتع بتجربة تسوق أذكى\nواكتشف أفضل العروض والخصومات حولك.",
    titleSize: 35,
  },
] as const satisfies readonly OnboardingSlide[];
