import React from 'react';
import { APP_CONFIG } from '../config';

interface NavbarProps {
  onScrollToCalculator: () => void;
  onScrollToCourse: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToCalculator, onScrollToCourse }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#040405]/90 backdrop-blur-md border-b border-[#4A2F15]/40 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-base sm:text-lg font-bold tracking-tight text-[#FCFCFA] hover:text-[#F5BF1E] transition-colors"
        >
          {APP_CONFIG.brandName}
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#C8C5BA]">
          <a
            href="#calculator"
            className="hover:text-[#FCFCFA] transition-colors whitespace-nowrap"
          >
            الحاسبة
          </a>
          <a
            href="#funnel"
            className="hover:text-[#FCFCFA] transition-colors whitespace-nowrap"
          >
            مسار التحويل
          </a>
          <a
            href="#scenarios"
            className="hover:text-[#FCFCFA] transition-colors whitespace-nowrap"
          >
            السيناريوهات
          </a>
          <a
            href="#comparison"
            className="hover:text-[#FCFCFA] transition-colors whitespace-nowrap"
          >
            مقارنة الأهداف
          </a>
          <a
            href="#course"
            className="hover:text-[#FCFCFA] transition-colors whitespace-nowrap"
          >
            الميني كورس
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onScrollToCalculator}
            className="px-4 py-2 text-xs font-semibold text-[#040405] bg-[#F5BF1E] hover:bg-[#FBD052] rounded-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm whitespace-nowrap"
          >
            ابدأ الحساب
          </button>
        </div>
      </div>
    </header>
  );
};
