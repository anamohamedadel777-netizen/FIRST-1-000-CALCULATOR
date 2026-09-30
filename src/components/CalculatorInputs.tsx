import React from 'react';
import { DollarSign, MousePointerClick, TrendingUp, HelpCircle } from 'lucide-react';
import { ValidationErrors } from '../types';

interface CalculatorInputsProps {
  commission: number;
  conversionRate: number;
  ctr: number;
  errors: ValidationErrors;
  onChangeCommission: (val: number) => void;
  onChangeConversionRate: (val: number) => void;
  onChangeCTR: (val: number) => void;
}

export const CalculatorInputs: React.FC<CalculatorInputsProps> = ({
  commission,
  conversionRate,
  ctr,
  errors,
  onChangeCommission,
  onChangeConversionRate,
  onChangeCTR,
}) => {
  return (
    <div className="space-y-6">
      {/* Input 1: Commission Per Sale */}
      <div className="bg-[#23170D] border border-[#4A2F15] rounded-xl p-4 sm:p-5 transition-colors focus-within:border-[#F5BF1E]/80">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4A2F15]/60 border border-[#F5BF1E]/30 flex items-center justify-center text-[#F5BF1E] text-sm font-bold">
                1
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#FCFCFA]">
                Commission Per Sale · العمولة لكل مبيعة
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#C8C5BA] mt-1 mr-9">
              بتاخد كام دولار عمولة لما تحصل مبيعة واحدة؟
            </p>
          </div>
        </div>

        <div className="mt-3 mr-9">
          <div className="relative flex items-center max-w-md">
            <span className="absolute left-3 text-[#F5BF1E] font-bold text-lg pointer-events-none">
              $
            </span>
            <input
              type="number"
              min="1"
              step="5"
              value={commission || ''}
              onChange={(e) => onChangeCommission(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] rounded-lg py-2.5 px-8 text-left text-lg font-bold text-[#FCFCFA] tabular-nums focus:outline-none focus:ring-1 focus:ring-[#F5BF1E]"
              placeholder="50"
            />
          </div>

          {/* Preset commission chips for fast experimentation */}
          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            <span className="text-xs text-[#797979]">أمثلة شائعة:</span>
            {[20, 50, 100, 200].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onChangeCommission(val)}
                className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                  commission === val
                    ? 'border-[#F5BF1E] text-[#F5BF1E] bg-[#F5BF1E]/10 font-bold'
                    : 'border-[#4A2F15] text-[#C8C5BA] hover:border-[#A7690C]'
                }`}
              >
                ${val}
              </button>
            ))}
          </div>

          <p className="text-xs text-[#797979] mt-2">
            لو المنتج بيديك 50$ على كل Sale (مبيعة)، اكتب 50.
          </p>

          {errors.commission && (
            <p className="text-xs text-rose-400 mt-1">{errors.commission}</p>
          )}
        </div>
      </div>

      {/* Input 2: Conversion Rate */}
      <div className="bg-[#23170D] border border-[#4A2F15] rounded-xl p-4 sm:p-5 transition-colors focus-within:border-[#F5BF1E]/80">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4A2F15]/60 border border-[#F5BF1E]/30 flex items-center justify-center text-[#F5BF1E] text-sm font-bold">
                2
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#FCFCFA]">
                Conversion Rate · معدل التحويل
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#C8C5BA] mt-1 mr-9">
              من كل 100 شخص يضغطوا على العرض، كام واحد تقريبًا بيشتري؟
            </p>
          </div>
        </div>

        <div className="mt-3 mr-9">
          <div className="relative flex items-center max-w-md">
            <span className="absolute left-3 text-[#F5BF1E] font-bold text-lg pointer-events-none">
              %
            </span>
            <input
              type="number"
              min="0.1"
              max="100"
              step="0.5"
              value={conversionRate || ''}
              onChange={(e) => onChangeConversionRate(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] rounded-lg py-2.5 px-8 text-left text-lg font-bold text-[#FCFCFA] tabular-nums focus:outline-none focus:ring-1 focus:ring-[#F5BF1E]"
              placeholder="2"
            />
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            <span className="text-xs text-[#797979]">أمثلة شائعة:</span>
            {[1, 2, 3, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onChangeConversionRate(val)}
                className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                  conversionRate === val
                    ? 'border-[#F5BF1E] text-[#F5BF1E] bg-[#F5BF1E]/10 font-bold'
                    : 'border-[#4A2F15] text-[#C8C5BA] hover:border-[#A7690C]'
                }`}
              >
                {val}%
              </button>
            ))}
          </div>

          {/* Distinction Explainer Note */}
          <div className="mt-2.5 p-2.5 rounded-lg bg-[#040405]/60 border border-[#4A2F15]/60 text-xs text-[#C8C5BA] space-y-1">
            <div className="flex items-center gap-1.5 text-[#F5BF1E] font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>فهم Conversion Rate:</span>
            </div>
            <p>
              من الناس اللي ضغطت على العرض، كام واحد اشترى؟ (مثال: 2% يعني تقريبًا مبيعتين من كل 100 Click نقرة).
            </p>
          </div>

          {errors.conversionRate && (
            <p className="text-xs text-rose-400 mt-1">{errors.conversionRate}</p>
          )}
        </div>
      </div>

      {/* Input 3: Content CTR */}
      <div className="bg-[#23170D] border border-[#4A2F15] rounded-xl p-4 sm:p-5 transition-colors focus-within:border-[#F5BF1E]/80">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#4A2F15]/60 border border-[#F5BF1E]/30 flex items-center justify-center text-[#F5BF1E] text-sm font-bold">
                3
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#FCFCFA]">
                Content CTR · معدل النقر من المحتوى
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#C8C5BA] mt-1 mr-9">
              من كل 100 شخص يشوفوا المحتوى، كام واحد تقريبًا بيضغط على الرابط؟
            </p>
          </div>
        </div>

        <div className="mt-3 mr-9">
          <div className="relative flex items-center max-w-md">
            <span className="absolute left-3 text-[#F5BF1E] font-bold text-lg pointer-events-none">
              %
            </span>
            <input
              type="number"
              min="0.1"
              max="100"
              step="0.5"
              value={ctr || ''}
              onChange={(e) => onChangeCTR(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] rounded-lg py-2.5 px-8 text-left text-lg font-bold text-[#FCFCFA] tabular-nums focus:outline-none focus:ring-1 focus:ring-[#F5BF1E]"
              placeholder="5"
            />
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            <span className="text-xs text-[#797979]">أمثلة شائعة:</span>
            {[2, 5, 8, 10].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => onChangeCTR(val)}
                className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                  ctr === val
                    ? 'border-[#F5BF1E] text-[#F5BF1E] bg-[#F5BF1E]/10 font-bold'
                    : 'border-[#4A2F15] text-[#C8C5BA] hover:border-[#A7690C]'
                }`}
              >
                {val}%
              </button>
            ))}
          </div>

          {/* Distinction Explainer Note */}
          <div className="mt-2.5 p-2.5 rounded-lg bg-[#040405]/60 border border-[#4A2F15]/60 text-xs text-[#C8C5BA] space-y-1">
            <div className="flex items-center gap-1.5 text-[#F5BF1E] font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>فهم CTR (معدل النقر):</span>
            </div>
            <p>
              من الناس اللي شافت المحتوى، كام واحد ضغط على الرابط؟ (مثال: 5% يعني تقريبًا 5 Clicks نقرات من كل 100 View مشاهدة).
            </p>
          </div>

          {errors.ctr && (
            <p className="text-xs text-rose-400 mt-1">{errors.ctr}</p>
          )}
        </div>
      </div>
    </div>
  );
};
