import React from 'react';
import { Eye, MousePointerClick, ShoppingCart, Target, ArrowDown, TrendingUp, Sparkles } from 'lucide-react';
import { CalculationResult } from '../types';
import { formatCurrency, formatNumber, formatPercent } from '../utils/calculator';
import { MetricCard } from './MetricCard';

interface VisualFunnelProps {
  result: CalculationResult;
  animationKey: number;
}

export const VisualFunnel: React.FC<VisualFunnelProps> = ({ result, animationKey }) => {
  const { target, commission, conversionRate, ctr, salesNeeded, clicksNeeded, viewsNeeded, per1000Views } = result;

  return (
    <div id="funnel" className="space-y-8">
      {/* Funnel Header */}
      <div className="text-center sm:text-right">
        <p className="text-xs sm:text-sm font-semibold text-[#F5BF1E] uppercase tracking-wider mb-1">
          عشان توصل إلى:
        </p>
        <div className="flex items-baseline justify-center sm:justify-start gap-3">
          <span className="text-3xl sm:text-5xl font-black text-[#F5BF1E] tabular-nums tracking-tight">
            {formatCurrency(target)}
          </span>
          <span className="text-sm sm:text-base text-[#C8C5BA] font-medium">
            عمولات أرباح
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#797979] mt-1">
          هذا هو المسار الحسابي العكسي من المشاهدات وحتى العمولة المحققة:
        </p>
      </div>

      {/* Visual Journey / Stepped Funnel */}
      <div
        key={animationKey}
        className="relative bg-[#23170D] border border-[#4A2F15] rounded-2xl p-5 sm:p-7 overflow-hidden"
      >
        {/* Subtle gold line connector for desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {/* Step 1: Views */}
          <div
            className="flex flex-col items-center text-center p-4 rounded-xl bg-[#040405]/80 border border-[#4A2F15] transition-all duration-300 hover:border-[#F5BF1E]/50 animate-fade-in-up"
            style={{ animationDelay: '0ms' }}
          >
            <div className="w-10 h-10 rounded-full bg-[#4A2F15]/50 flex items-center justify-center text-[#F5BF1E] mb-2.5">
              <Eye className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#C8C5BA] mb-1">
              1. المشاهدات (Views)
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA] tabular-nums tracking-tight mb-1">
              {formatNumber(viewsNeeded)}
            </span>
            <span className="text-[11px] text-[#797979]">
              بمعدل نقر {formatPercent(ctr, 1)}
            </span>
          </div>

          {/* Arrow Step on Mobile / Desktop */}
          <div className="md:hidden flex justify-center -my-2">
            <ArrowDown className="w-4 h-4 text-[#F5BF1E]" />
          </div>

          {/* Step 2: Clicks */}
          <div
            className="flex flex-col items-center text-center p-4 rounded-xl bg-[#040405]/80 border border-[#4A2F15] transition-all duration-300 hover:border-[#F5BF1E]/50 animate-fade-in-up"
            style={{ animationDelay: '120ms' }}
          >
            <div className="w-10 h-10 rounded-full bg-[#4A2F15]/50 flex items-center justify-center text-[#F5BF1E] mb-2.5">
              <MousePointerClick className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#C8C5BA] mb-1">
              2. النقرات (Clicks)
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA] tabular-nums tracking-tight mb-1">
              {formatNumber(clicksNeeded)}
            </span>
            <span className="text-[11px] text-[#797979]">
              بمعدل تحويل {formatPercent(conversionRate, 1)}
            </span>
          </div>

          {/* Arrow Step on Mobile */}
          <div className="md:hidden flex justify-center -my-2">
            <ArrowDown className="w-4 h-4 text-[#F5BF1E]" />
          </div>

          {/* Step 3: Sales */}
          <div
            className="flex flex-col items-center text-center p-4 rounded-xl bg-[#040405]/80 border border-[#4A2F15] transition-all duration-300 hover:border-[#F5BF1E]/50 animate-fade-in-up"
            style={{ animationDelay: '240ms' }}
          >
            <div className="w-10 h-10 rounded-full bg-[#4A2F15]/50 flex items-center justify-center text-[#F5BF1E] mb-2.5">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#C8C5BA] mb-1">
              3. المبيعات (Sales)
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA] tabular-nums tracking-tight mb-1">
              {formatNumber(salesNeeded)}
            </span>
            <span className="text-[11px] text-[#797979]">
              بعمولة {formatCurrency(commission)} / مبيعة
            </span>
          </div>

          {/* Arrow Step on Mobile */}
          <div className="md:hidden flex justify-center -my-2">
            <ArrowDown className="w-4 h-4 text-[#F5BF1E]" />
          </div>

          {/* Step 4: Target */}
          <div
            className="flex flex-col items-center text-center p-4 rounded-xl bg-[#23170D] border border-[#F5BF1E] shadow-[0_0_20px_rgba(245,191,30,0.15)] transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: '360ms' }}
          >
            <div className="w-10 h-10 rounded-full bg-[#F5BF1E] flex items-center justify-center text-[#040405] mb-2.5">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#FBD052] mb-1">
              4. الهدف المالي (Target)
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#F5BF1E] tabular-nums tracking-tight mb-1">
              {formatCurrency(target)}
            </span>
            <span className="text-[11px] text-[#C8C5BA]">
              عمولة محققة إحصائيًا
            </span>
          </div>
        </div>
      </div>

      {/* 4 Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1: Sales */}
        <MetricCard
          title="المبيعات المطلوبة"
          value={formatNumber(salesNeeded)}
          unit="Sale (مبيعة)"
          supportingText={`بعمولة ${formatCurrency(commission)} لكل مبيعة، تحتاج تقريبًا ${formatNumber(salesNeeded)} مبيعة للوصول إلى ${formatCurrency(target)}.`}
          icon={ShoppingCart}
        />

        {/* Card 2: Clicks */}
        <MetricCard
          title="النقرات المطلوبة"
          value={formatNumber(clicksNeeded)}
          unit="Click (نقرة)"
          supportingText={`بمعدل تحويل ${formatPercent(conversionRate, 1)}، تحتاج تقريبًا ${formatNumber(clicksNeeded)} نقرة لإنتاج ${formatNumber(salesNeeded)} مبيعة إحصائيًا.`}
          icon={MousePointerClick}
        />

        {/* Card 3: Views */}
        <MetricCard
          title="المشاهدات المطلوبة"
          value={formatNumber(viewsNeeded)}
          unit="View (مشاهدة)"
          supportingText={`لو ${formatPercent(ctr, 1)} من المشاهدين بيضغطوا على الرابط، تحتاج تقريبًا ${formatNumber(viewsNeeded)} مشاهدة للحصول على ${formatNumber(clicksNeeded)} نقرة.`}
          icon={Eye}
        />

        {/* Card 4: Value per 1000 views */}
        <MetricCard
          title="قيمة كل 1000 مشاهدة"
          value={formatCurrency(per1000Views.commission)}
          unit="عمولات متوقعة"
          supportingText={`كل 1000 مشاهدة ينتج عنها تقريبًا ${formatNumber(per1000Views.clicks, 1)} نقرة و ${formatNumber(per1000Views.sales, 2)} مبيعة، أي حوالي ${formatCurrency(per1000Views.commission)} عمولة تقديرية.`}
          icon={TrendingUp}
          badgeText="تقدير رياضي"
          isSpecial={true}
        />
      </div>
    </div>
  );
};
