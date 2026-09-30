import React from 'react';
import { CalculationResult } from '../types';
import { formatCurrency, formatNumber } from '../utils/calculator';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface PowerfulSummaryProps {
  result: CalculationResult;
}

export const PowerfulSummary: React.FC<PowerfulSummaryProps> = ({ result }) => {
  const { target, salesNeeded, clicksNeeded, viewsNeeded } = result;

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-[#23170D] via-[#23170D] to-[#040405] border border-[#A7690C]/60 p-6 sm:p-8 overflow-hidden shadow-[0_10px_30px_rgba(4,4,5,0.8)]">
      {/* Decorative subtle gold glow accent */}
      <div 
        className="pointer-events-none absolute -top-24 -left-24 w-60 h-60 rounded-full bg-[#F5BF1E]/10 blur-3xl"
        aria-hidden="true" 
      />

      <div className="relative z-10 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#4A2F15]/50 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#F5BF1E] font-semibold">
              ملخص الحساب الرياضي
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#FCFCFA] mt-0.5">
              هدفك: <span className="text-[#F5BF1E]">{formatCurrency(target)}</span>
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#C8C5BA]">
            <ShieldCheck className="w-4 h-4 text-[#F5BF1E]" />
            <span>نظام معادلة واضح وقابل للقياس</span>
          </div>
        </div>

        {/* The Equation Chain */}
        <div>
          <p className="text-xs sm:text-sm font-semibold text-[#C8C5BA] mb-3">
            رياضيات الهدف:
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-center sm:text-right">
            {/* Sales */}
            <div className="bg-[#040405] border border-[#4A2F15] px-4 py-2.5 rounded-lg flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-[#FCFCFA] tabular-nums">
                {formatNumber(salesNeeded)}
              </span>
              <span className="text-xs text-[#C8C5BA]">مبيعة</span>
            </div>

            <ArrowLeft className="w-4 h-4 text-[#F5BF1E] shrink-0" />

            {/* Clicks */}
            <div className="bg-[#040405] border border-[#4A2F15] px-4 py-2.5 rounded-lg flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-[#FCFCFA] tabular-nums">
                {formatNumber(clicksNeeded)}
              </span>
              <span className="text-xs text-[#C8C5BA]">نقرة</span>
            </div>

            <ArrowLeft className="w-4 h-4 text-[#F5BF1E] shrink-0" />

            {/* Views */}
            <div className="bg-[#040405] border border-[#4A2F15] px-4 py-2.5 rounded-lg flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-[#FCFCFA] tabular-nums">
                {formatNumber(viewsNeeded)}
              </span>
              <span className="text-xs text-[#C8C5BA]">مشاهدة</span>
            </div>
          </div>
        </div>

        {/* Mindset Statement */}
        <div className="pt-2 border-t border-[#4A2F15]/40">
          <p className="text-base sm:text-lg font-bold text-[#FCFCFA] leading-relaxed">
            &quot;دلوقتي الهدف مش رقم غامض.
            <br />
            بقى عندك <span className="text-[#F5BF1E]">Funnel Math (رياضيات مسار التحويل)</span>.&quot;
          </p>
          <p className="text-xs sm:text-sm text-[#C8C5BA] mt-1.5">
            بدل ما تسأل: &quot;إزاي أعمل $1,000 فجأة؟&quot;، بقى عندك خطة رقمية: محتاج تجيب {formatNumber(viewsNeeded)} مشاهدة بجودة تحافظ على معدل النقر والتحويل.
          </p>
        </div>
      </div>
    </div>
  );
};
