import React from 'react';
import { CalculatorInputsState } from '../types';
import { calculateSalesNeeded, calculateClicksNeeded, calculateViewsNeeded, formatCurrency, formatNumber } from '../utils/calculator';
import { BarChart3, ArrowDown } from 'lucide-react';

interface TargetComparisonProps {
  inputs: CalculatorInputsState;
  onSelectTarget: (target: number) => void;
}

export const TargetComparison: React.FC<TargetComparisonProps> = ({ inputs, onSelectTarget }) => {
  const comparisonTargets = [100, 500, 1000, 5000];

  return (
    <div id="comparison" className="bg-[#23170D] border border-[#4A2F15] rounded-2xl p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#4A2F15]/50 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#F5BF1E] font-semibold">
            المقارنة الديناميكية
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#FCFCFA] mt-0.5 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#F5BF1E]" />
            <span>لو نفس أرقامك ثابتة… المقارنة بين الأهداف</span>
          </h3>
        </div>
        <span className="text-xs text-[#C8C5BA]">
          حساب تلقائي حسب مدخلاتك الحالية
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#C8C5BA]">
        شوف حجم المجهود الحسابي المطلوب للوصول لمستويات دخل مختلفة لو حافظت على نفس العمولة ({formatCurrency(inputs.commission)}) ونفس معدلات النقر والتحويل:
      </p>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {comparisonTargets.map((tgt) => {
          const sales = calculateSalesNeeded(tgt, inputs.commission);
          const clicks = calculateClicksNeeded(sales, inputs.conversionRate);
          const views = calculateViewsNeeded(clicks, inputs.ctr);
          const isCurrent = inputs.target === tgt;

          return (
            <div
              key={tgt}
              onClick={() => onSelectTarget(tgt)}
              className={`cursor-pointer rounded-xl p-4.5 border transition-all duration-200 flex flex-col justify-between ${
                isCurrent
                  ? 'bg-[#040405] border-[#F5BF1E] shadow-[0_0_20px_rgba(245,191,30,0.15)] ring-1 ring-[#F5BF1E]'
                  : 'bg-[#040405]/70 border-[#4A2F15] hover:border-[#A7690C] hover:bg-[#040405]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl sm:text-2xl font-black text-[#F5BF1E] tabular-nums">
                    {formatCurrency(tgt)}
                  </span>
                  {isCurrent ? (
                    <span className="text-[11px] font-bold text-[#040405] bg-[#F5BF1E] px-2 py-0.5 rounded">
                      الهدف المختار
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#797979]">
                      اضغط للتحديد
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center justify-between border-b border-[#4A2F15]/40 pb-1.5">
                    <span className="text-[#C8C5BA]">المبيعات:</span>
                    <span className="font-bold text-[#FCFCFA] tabular-nums">
                      {formatNumber(sales)} مبيعة
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#4A2F15]/40 pb-1.5">
                    <span className="text-[#C8C5BA]">النقرات:</span>
                    <span className="font-bold text-[#FCFCFA] tabular-nums">
                      {formatNumber(clicks)} نقرة
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-[#C8C5BA]">المشاهدات:</span>
                    <span className="font-bold text-[#FBD052] tabular-nums text-sm sm:text-base">
                      {formatNumber(views)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#4A2F15]/40 text-center">
                <span className="text-[11px] text-[#F5BF1E] font-medium">
                  {isCurrent ? 'معروض في الحاسبة أعلاه' : 'اختر هذا الهدف ↑'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
