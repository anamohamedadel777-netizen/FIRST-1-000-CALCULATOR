import React, { useState } from 'react';
import { CalculatorInputsState } from '../types';
import { calculateImprovementScenario, formatCurrency, formatNumber, formatPercent } from '../utils/calculator';
import { Sliders, ArrowLeft, ArrowDown, TrendingDown, HelpCircle, Check } from 'lucide-react';

interface ScenarioSimulatorProps {
  inputs: CalculatorInputsState;
}

type MetricType = 'ctr' | 'conversionRate' | 'commission';

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ inputs }) => {
  const [activeMetric, setActiveMetric] = useState<MetricType>('conversionRate');
  const [activeFactor, setActiveFactor] = useState<number>(1.5); // default +50%

  const factorOptions = [
    { label: '+25%', factor: 1.25 },
    { label: '+50%', factor: 1.5 },
    { label: '2X (الضعف)', factor: 2.0 },
  ];

  const currentOptionLabel = factorOptions.find((f) => f.factor === activeFactor)?.label || '+50%';

  const scenario = calculateImprovementScenario(
    inputs,
    activeMetric,
    activeFactor,
    currentOptionLabel
  );

  const getMetricName = (m: MetricType) => {
    switch (m) {
      case 'ctr':
        return 'معدل النقر (Content CTR)';
      case 'conversionRate':
        return 'معدل التحويل (Conversion Rate)';
      case 'commission':
        return 'العمولة لكل مبيعة (Commission)';
    }
  };

  const formatMetricVal = (m: MetricType, val: number) => {
    if (m === 'commission') return formatCurrency(val);
    return formatPercent(val, 1);
  };

  return (
    <div id="scenarios" className="bg-[#23170D] border border-[#4A2F15] rounded-2xl p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#4A2F15]/50 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#F5BF1E] font-semibold">
            محاكاة السيناريوهات
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#FCFCFA] mt-0.5 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#F5BF1E]" />
            <span>إيه أسرع رقم تحسنه؟</span>
          </h3>
        </div>
        <span className="text-xs font-medium text-[#FBD052] bg-[#4A2F15]/50 border border-[#A7690C]/40 px-3 py-1 rounded w-fit">
          سيناريو افتراضي
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#C8C5BA]">
        بدل ما تبذل مجهود مضاعف في جلب المشاهدات، شوف إزاي تحسين بسيط في المتغيرات التانية يقلل حجم المشاهدات المطلوبة لنفس الهدف المالي:
      </p>

      {/* Metric Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          type="button"
          onClick={() => setActiveMetric('conversionRate')}
          className={`p-3.5 rounded-xl border text-right transition-all flex flex-col justify-between ${
            activeMetric === 'conversionRate'
              ? 'bg-[#040405] border-[#F5BF1E] shadow-[0_0_15px_rgba(245,191,30,0.15)]'
              : 'bg-[#23170D] border-[#4A2F15] hover:border-[#A7690C]'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#FCFCFA]">
              حسن Conversion Rate
            </span>
            {activeMetric === 'conversionRate' && (
              <span className="w-2 h-2 rounded-full bg-[#F5BF1E]" />
            )}
          </div>
          <span className="text-xs text-[#797979]">
            الحالي: {formatPercent(inputs.conversionRate, 1)}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMetric('ctr')}
          className={`p-3.5 rounded-xl border text-right transition-all flex flex-col justify-between ${
            activeMetric === 'ctr'
              ? 'bg-[#040405] border-[#F5BF1E] shadow-[0_0_15px_rgba(245,191,30,0.15)]'
              : 'bg-[#23170D] border-[#4A2F15] hover:border-[#A7690C]'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#FCFCFA]">
              حسن الـ CTR
            </span>
            {activeMetric === 'ctr' && (
              <span className="w-2 h-2 rounded-full bg-[#F5BF1E]" />
            )}
          </div>
          <span className="text-xs text-[#797979]">
            الحالي: {formatPercent(inputs.ctr, 1)}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMetric('commission')}
          className={`p-3.5 rounded-xl border text-right transition-all flex flex-col justify-between ${
            activeMetric === 'commission'
              ? 'bg-[#040405] border-[#F5BF1E] shadow-[0_0_15px_rgba(245,191,30,0.15)]'
              : 'bg-[#23170D] border-[#4A2F15] hover:border-[#A7690C]'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#FCFCFA]">
              ارفع Commission Per Sale
            </span>
            {activeMetric === 'commission' && (
              <span className="w-2 h-2 rounded-full bg-[#F5BF1E]" />
            )}
          </div>
          <span className="text-xs text-[#797979]">
            الحالي: {formatCurrency(inputs.commission)}
          </span>
        </button>
      </div>

      {/* Improvement Factor Pills / Buttons */}
      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <span className="text-xs text-[#C8C5BA] font-medium">نسبة التحسين:</span>
        {factorOptions.map((opt) => (
          <button
            key={opt.factor}
            type="button"
            onClick={() => setActiveFactor(opt.factor)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              activeFactor === opt.factor
                ? 'bg-[#F5BF1E] text-[#040405] border-[#F5BF1E]'
                : 'bg-[#040405] text-[#C8C5BA] border-[#4A2F15] hover:border-[#A7690C]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Comparison Result Box */}
      <div className="bg-[#040405] border border-[#4A2F15] rounded-xl p-5 sm:p-6 space-y-5">
        <div className="text-xs sm:text-sm text-[#C8C5BA]">
          لو رفعت <span className="text-[#F5BF1E] font-bold">{getMetricName(activeMetric)}</span> من{' '}
          <span className="font-bold text-[#FCFCFA] tabular-nums">
            {formatMetricVal(activeMetric, scenario.originalMetricValue)}
          </span>{' '}
          إلى{' '}
          <span className="font-bold text-[#FBD052] tabular-nums">
            {formatMetricVal(activeMetric, scenario.improvedMetricValue)}
          </span>:
        </div>

        {/* Before vs After View Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Before */}
          <div className="p-4 rounded-xl bg-[#23170D]/70 border border-[#4A2F15]">
            <span className="text-xs text-[#797979] font-semibold block mb-1">
              المشاهدات المطلوبة قبل
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#C8C5BA] tabular-nums">
                {formatNumber(scenario.beforeViewsNeeded)}
              </span>
              <span className="text-xs text-[#797979]">مشاهدة</span>
            </div>
            <p className="text-[11px] text-[#797979] mt-2">
              بناءً على أرقامك المدخلة حاليًا
            </p>
          </div>

          {/* After */}
          <div className="p-4 rounded-xl bg-[#23170D] border border-[#A7690C] relative">
            <span className="text-xs text-[#F5BF1E] font-semibold block mb-1">
              المشاهدات المطلوبة بعد التحسين
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-[#FCFCFA] tabular-nums">
                {formatNumber(scenario.afterViewsNeeded)}
              </span>
              <span className="text-xs text-[#F5BF1E]">مشاهدة</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>
                توفر تقريبًا {formatNumber(scenario.viewsSaved)} مشاهدة ({scenario.percentSaved.toFixed(0)}% مجهود أقل)
              </span>
            </div>
          </div>
        </div>

        <div className="text-xs text-[#797979] flex items-center gap-2 pt-1 border-t border-[#4A2F15]/40">
          <HelpCircle className="w-3.5 h-3.5 text-[#A7690C] shrink-0" />
          <span>
            هذا السيناريو افتراضي لمساعدتك في تحديد أي مرحلة في الـ Funnel لها الأثر الأكبر على وقتك ومجهودك.
          </span>
        </div>
      </div>
    </div>
  );
};
