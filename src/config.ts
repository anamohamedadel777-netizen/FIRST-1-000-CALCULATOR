export interface AppConfig {
  brandName: string;
  brandTaglineAr: string;
  brandTaglineEn: string;
  MINI_COURSE_URL: string;
  defaultTarget: number;
  targetPresets: readonly number[];
  defaultCommission: number;
  defaultConversionRate: number;
  defaultCTR: number;
  defaultReverseViews: number;
}

export const APP_CONFIG: AppConfig = {
  brandName: 'Mohamed Adel',
  brandTaglineAr: 'التسويق بالعمولة نظام… مش مجرد رابط.',
  brandTaglineEn: 'Affiliate Marketing Is a System, Not a Link.',
  MINI_COURSE_URL: 'https://affiliate-mini-course.mohamdadel.com/waitlist',
  defaultTarget: 1000,
  targetPresets: [100, 500, 1000, 5000],
  defaultCommission: 50,
  defaultConversionRate: 2, // 2%
  defaultCTR: 5, // 5%
  defaultReverseViews: 10000,
};

