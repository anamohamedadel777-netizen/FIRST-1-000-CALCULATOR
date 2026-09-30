import React from 'react';
import { APP_CONFIG } from '../config';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#4A2F15]/40 py-12 bg-[#040405] text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-3">
        <h4 className="text-base sm:text-lg font-extrabold text-[#FCFCFA] tracking-wide">
          {APP_CONFIG.brandName}
        </h4>
        <p className="text-sm font-semibold text-[#F5BF1E]">
          {APP_CONFIG.brandTaglineEn}
        </p>
        <p className="text-xs sm:text-sm text-[#C8C5BA]">
          {APP_CONFIG.brandTaglineAr}
        </p>
        <div className="pt-4 text-[11px] text-[#797979]">
          © {new Date().getFullYear()} First $1,000 Calculator · جميع الحقوق محفوظة لـ {APP_CONFIG.brandName}
        </div>
      </div>
    </footer>
  );
};
