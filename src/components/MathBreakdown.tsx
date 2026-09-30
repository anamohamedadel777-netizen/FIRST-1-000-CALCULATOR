import React, { useState } from 'react';
import { CalculationResult } from '../types';
import { formatCurrency, formatNumber, formatPercent } from '../utils/calculator';
import { ChevronDown, ChevronUp, Calculator, HelpCircle } from 'lucide-react';

interface MathBreakdownProps {
  result: CalculationResult;
}

export const MathBreakdown: React.FC<MathBreakdownProps> = ({ result }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { target, commission, conversionRate, ctr, salesNeeded, clicksNeeded, viewsNeeded } = result;

  const crDecimal = (conversionRate / 100).toFixed(4).replace(/\.?0+$/, '');
  const ctrDecimal = (ctr / 100).toFixed(4).replace(/\.?0+$/, '');

  return (
    <div className="bg-[#23170D] border border-[#4A2F15] rounded-xl overflow-hidden transition-all duration-200">
      {/* Accordion Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-right hover:bg-[#2d1e12] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#4A2F15]/60 flex items-center justify-center text-[#F5BF1E]">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#FCFCFA]">
              الحاسبة وصلت للأرقام دي إزاي؟
            </h3>
            <p className="text-xs text-[#C8C5BA]">
              اضغط لرؤية المعادلات الحسابية الدقيقة خطوة بخطوة بأرقامك الحالية
            </p>
          </div>
        </div>

        <div className="text-[#F5BF1E] p-1">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-4 sm:p-6 border-t border-[#4A2F15] bg-[#040405]/80 space-y-6">
          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F5BF1E]/20 text-[#F5BF1E] text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h4 className="text-sm sm:text-base font-bold text-[#FCFCFA]">
                المبيعات المطلوبة (Sales Needed)
              </h4>
            </div>
            <div className="mr-8 p-3 rounded-lg bg-[#23170D] border border-[#4A2F15] text-xs sm:text-sm font-mono space-y-1">
              <div className="text-[#C8C5BA]">
                المبيعات المطلوبة = الهدف ÷ العمولة لكل مبيعة
              </div>
              <div className="text-[#F5BF1E] font-bold text-sm sm:text-base">
                {formatCurrency(target)} ÷ {formatCurrency(commission)} = {formatNumber(salesNeeded)} مبيعة
              </div>
              <div className="text-[11px] text-[#797979]">
                * يتم تقريب أي كسر للأعلى (ceil) لأن المبيعات تتم بأعداد صحيحة.
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F5BF1E]/20 text-[#F5BF1E] text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="text-sm sm:text-base font-bold text-[#FCFCFA]">
                النقرات المطلوبة (Clicks Needed)
              </h4>
            </div>
            <div className="mr-8 p-3 rounded-lg bg-[#23170D] border border-[#4A2F15] text-xs sm:text-sm font-mono space-y-1">
              <div className="text-[#C8C5BA]">
                النقرات المطلوبة = المبيعات المطلوبة ÷ معدل التحويل (بالكسر العشري)
              </div>
              <div className="text-[#F5BF1E] font-bold text-sm sm:text-base">
                {formatNumber(salesNeeded)} ÷ {crDecimal} = {formatNumber(clicksNeeded)} نقرة
              </div>
              <div className="text-[11px] text-[#797979]">
                * معدل التحويل {formatPercent(conversionRate, 1)} يعني {crDecimal} كنسبة عشرية.
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#F5BF1E]/20 text-[#F5BF1E] text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h4 className="text-sm sm:text-base font-bold text-[#FCFCFA]">
                المشاهدات المطلوبة (Views Needed)
              </h4>
            </div>
            <div className="mr-8 p-3 rounded-lg bg-[#23170D] border border-[#4A2F15] text-xs sm:text-sm font-mono space-y-1">
              <div className="text-[#C8C5BA]">
                المشاهدات المطلوبة = النقرات المطلوبة ÷ معدل النقر CTR (بالكسر العشري)
              </div>
              <div className="text-[#F5BF1E] font-bold text-sm sm:text-base">
                {formatNumber(clicksNeeded)} ÷ {ctrDecimal} = {formatNumber(viewsNeeded)} مشاهدة
              </div>
              <div className="text-[11px] text-[#797979]">
                * معدل النقر {formatPercent(ctr, 1)} يعني {ctrDecimal} كنسبة عشرية.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
