import React, { useState } from 'react';
import { CalculatorInputsState } from '../types';
import { calculateReverseScenario, formatCurrency, formatNumber, formatPercent } from '../utils/calculator';
import { RefreshCw, Eye, MousePointerClick, ShoppingCart, DollarSign, ToggleLeft, ToggleRight, ArrowDown } from 'lucide-react';

interface ReverseCalculatorProps {
  inputs: CalculatorInputsState;
}

export const ReverseCalculator: React.FC<ReverseCalculatorProps> = ({ inputs }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentViews, setCurrentViews] = useState<number>(10000);

  const reverseResult = calculateReverseScenario(
    currentViews,
    inputs.commission,
    inputs.conversionRate,
    inputs.ctr
  );

  return (
    <div className="bg-[#23170D] border border-[#4A2F15] rounded-2xl p-5 sm:p-7 space-y-6">
      {/* Toggle Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#4A2F15]/50 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#F5BF1E] font-semibold">
            الوضع العكسي
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#FCFCFA] mt-0.5">
            بدل ما أحسب المطلوب… عندي مشاهدات وعايز أعرف المتوقع
          </h3>
          <p className="text-xs text-[#C8C5BA] mt-1">
            لو عندك فيديو أو محتوى جاب رقم مشاهدات محدد، كام العائد التقريبي المتوقع؟
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsEnabled(!isEnabled)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-bold transition-all shrink-0 self-start sm:self-auto ${
            isEnabled
              ? 'bg-[#F5BF1E] text-[#040405] border-[#F5BF1E]'
              : 'bg-[#040405] text-[#C8C5BA] border-[#4A2F15] hover:border-[#A7690C]'
          }`}
        >
          {isEnabled ? (
            <>
              <ToggleRight className="w-5 h-5 text-[#040405]" />
              <span>الوضع العكسي مفعّل</span>
            </>
          ) : (
            <>
              <ToggleLeft className="w-5 h-5 text-[#797979]" />
              <span>تفعيل الوضع العكسي</span>
            </>
          )}
        </button>
      </div>

      {isEnabled && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Input current views */}
          <div className="bg-[#040405] border border-[#4A2F15] rounded-xl p-4 sm:p-5">
            <label className="block text-xs sm:text-sm font-bold text-[#FCFCFA] mb-1.5">
              عدد المشاهدات الحالية لديك:
            </label>
            <div className="relative flex items-center max-w-md">
              <span className="absolute left-3 text-[#F5BF1E] font-bold text-lg pointer-events-none">
                Views
              </span>
              <input
                type="number"
                min="0"
                step="1000"
                value={currentViews || ''}
                onChange={(e) => setCurrentViews(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-[#23170D] border border-[#4A2F15] focus:border-[#F5BF1E] rounded-lg py-2.5 px-16 text-left text-lg font-bold text-[#FCFCFA] tabular-nums focus:outline-none focus:ring-1 focus:ring-[#F5BF1E]"
                placeholder="10000"
              />
            </div>

            {/* Quick views chips */}
            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              <span className="text-xs text-[#797979]">أمثلة سريعة:</span>
              {[5000, 10000, 50000, 100000].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setCurrentViews(v)}
                  className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                    currentViews === v
                      ? 'border-[#F5BF1E] text-[#F5BF1E] bg-[#F5BF1E]/10 font-bold'
                      : 'border-[#4A2F15] text-[#C8C5BA] hover:border-[#A7690C]'
                  }`}
                >
                  {formatNumber(v)}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-[#797979] mt-2">
              الحساب يتم باستخدام معدلاتك المدخلة حاليًا: CTR ({formatPercent(inputs.ctr, 1)})، التحويل ({formatPercent(inputs.conversionRate, 1)})، والعمولة ({formatCurrency(inputs.commission)}).
            </p>
          </div>

          {/* Results Chain */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Expected Clicks */}
            <div className="p-4 rounded-xl bg-[#040405] border border-[#4A2F15]">
              <div className="flex items-center justify-between text-xs text-[#C8C5BA] mb-1">
                <span className="flex items-center gap-1.5">
                  <MousePointerClick className="w-3.5 h-3.5 text-[#F5BF1E]" />
                  <span>النقرات المتوقعة</span>
                </span>
                <span className="text-[10px] text-[#F5BF1E]">Expected</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA] tabular-nums">
                  {formatNumber(reverseResult.expectedClicks, 1)}
                </span>
                <span className="text-xs text-[#797979]">نقرة</span>
              </div>
              <p className="text-[11px] text-[#797979] mt-2">
                {formatNumber(currentViews)} × {formatPercent(inputs.ctr, 1)}
              </p>
            </div>

            {/* Expected Sales */}
            <div className="p-4 rounded-xl bg-[#040405] border border-[#4A2F15]">
              <div className="flex items-center justify-between text-xs text-[#C8C5BA] mb-1">
                <span className="flex items-center gap-1.5">
                  <ShoppingCart className="w-3.5 h-3.5 text-[#F5BF1E]" />
                  <span>المبيعات المتوقعة</span>
                </span>
                <span className="text-[10px] text-[#F5BF1E]">Expected</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#FCFCFA] tabular-nums">
                  {formatNumber(reverseResult.expectedSales, 2)}
                </span>
                <span className="text-xs text-[#797979]">مبيعة</span>
              </div>
              <p className="text-[11px] text-[#797979] mt-2">
                {formatNumber(reverseResult.expectedClicks, 1)} × {formatPercent(inputs.conversionRate, 1)}
              </p>
            </div>

            {/* Expected Commission Revenue */}
            <div className="p-4 rounded-xl bg-[#040405] border border-[#A7690C] shadow-[0_0_15px_rgba(167,105,12,0.15)]">
              <div className="flex items-center justify-between text-xs text-[#F5BF1E] mb-1">
                <span className="flex items-center gap-1.5 font-bold">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>العمولة التقديرية</span>
                </span>
                <span className="text-[10px] text-[#FBD052] bg-[#4A2F15] px-1.5 py-0.5 rounded">
                  تقديري
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-[#F5BF1E] tabular-nums">
                  {formatCurrency(reverseResult.expectedRevenue)}
                </span>
                <span className="text-xs text-[#C8C5BA]">أرباح</span>
              </div>
              <p className="text-[11px] text-[#C8C5BA] mt-2">
                {formatNumber(reverseResult.expectedSales, 2)} مبيعة × {formatCurrency(inputs.commission)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
