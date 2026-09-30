import React from 'react';
import { CalculatorInputsState } from '../types';
import { generateEducationalInsights } from '../utils/insights';
import { Lightbulb, Info } from 'lucide-react';

interface InsightPanelProps {
  inputs: CalculatorInputsState;
}

export const InsightPanel: React.FC<InsightPanelProps> = ({ inputs }) => {
  const insights = generateEducationalInsights(inputs);

  return (
    <div className="bg-[#23170D] border border-[#4A2F15] rounded-2xl p-5 sm:p-7 space-y-4">
      <div className="flex items-center justify-between border-b border-[#4A2F15]/50 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#4A2F15]/60 flex items-center justify-center text-[#F5BF1E]">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#FCFCFA]">
              قراءة الأرقام والفرص الحسابية
            </h3>
            <p className="text-xs text-[#C8C5BA]">
              ملاحظات تعليمية مستنتجة من علاقات نسبك الحالية
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="p-4 rounded-xl bg-[#040405]/70 border border-[#4A2F15] hover:border-[#A7690C] transition-colors"
          >
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#F5BF1E] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-[#FCFCFA]">
                  {insight.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#C8C5BA] leading-relaxed">
                  {insight.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-[#797979] pt-1">
        * الملاحظات أعلاه تعليمية مبنية على علاقات المتغيرات الرياضية، ولا تفترض معايير قياسية مطلقة لأن كل سوق ونيتش يختلف عن غيره.
      </p>
    </div>
  );
};
