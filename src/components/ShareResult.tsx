import React, { useState } from 'react';
import { CalculationResult } from '../types';
import { formatCurrency, formatNumber, formatPercent } from '../utils/calculator';
import { Share2, Copy, Check, Camera, ArrowLeft } from 'lucide-react';
import { APP_CONFIG } from '../config';

interface ShareResultProps {
  result: CalculationResult;
}

export const ShareResult: React.FC<ShareResultProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);
  const { target, commission, conversionRate, ctr, salesNeeded, clicksNeeded, viewsNeeded } = result;

  const generatedText = `هدفي من Affiliate Marketing هو ${formatCurrency(target)}.

بعمولة ${formatCurrency(commission)} لكل مبيعة،
Conversion Rate حوالي ${formatPercent(conversionRate, 1)}،
وCTR حوالي ${formatPercent(ctr, 1)}،

الحساب التقريبي:
${formatNumber(viewsNeeded)} مشاهدة
→ ${formatNumber(clicksNeeded)} نقرة
→ ${formatNumber(salesNeeded)} مبيعة
→ ${formatCurrency(target)} عمولات.

الأرقام تقديرية وليست ضمانًا للنتيجة.
First $1,000 Calculator by ${APP_CONFIG.brandName}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(generatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        // Fallback for environments where clipboard is restricted
        selectText();
      }
    } catch {
      selectText();
    }
  };

  const selectText = () => {
    const el = document.getElementById('shareable-text-area') as HTMLTextAreaElement;
    if (el) {
      el.focus();
      el.select();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="bg-[#23170D] border border-[#4A2F15] rounded-2xl p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#4A2F15]/50 pb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-[#F5BF1E] font-semibold">
            المشاركة والتوثيق
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#FCFCFA] mt-0.5 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#F5BF1E]" />
            <span>شارك الحساب</span>
          </h3>
        </div>
        <span className="text-xs text-[#C8C5BA] flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-[#F5BF1E]" />
          <span>مناسبة لتصوير الشاشة (Screenshot)</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Screenshot-ready Card */}
        <div>
          <span className="text-xs font-semibold text-[#C8C5BA] block mb-2">
            بطاقة الطريق الرياضي المتوقع:
          </span>
          <div className="rounded-2xl bg-gradient-to-br from-[#040405] via-[#23170D] to-[#040405] border-2 border-[#A7690C] p-6 space-y-5 shadow-2xl relative overflow-hidden">
            {/* Corner badge */}
            <div className="flex items-center justify-between border-b border-[#4A2F15]/60 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#F5BF1E] uppercase tracking-widest block">
                  First $1,000 Calculator
                </span>
                <span className="text-xs text-[#C8C5BA]">
                  الحساب التقديري لمسار التحويل
                </span>
              </div>
              <div className="text-left">
                <span className="text-xs text-[#797979] block">الهدف المالي</span>
                <span className="text-xl font-extrabold text-[#F5BF1E] tabular-nums">
                  {formatCurrency(target)}
                </span>
              </div>
            </div>

            {/* Assumptions Grid */}
            <div className="grid grid-cols-3 gap-2 text-center p-2.5 rounded-lg bg-[#040405]/80 border border-[#4A2F15]">
              <div>
                <span className="text-[10px] text-[#797979] block">Commission</span>
                <span className="text-xs sm:text-sm font-bold text-[#FCFCFA] tabular-nums">
                  {formatCurrency(commission)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#797979] block">Conversion</span>
                <span className="text-xs sm:text-sm font-bold text-[#FCFCFA] tabular-nums">
                  {formatPercent(conversionRate, 1)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#797979] block">Content CTR</span>
                <span className="text-xs sm:text-sm font-bold text-[#FCFCFA] tabular-nums">
                  {formatPercent(ctr, 1)}
                </span>
              </div>
            </div>

            {/* The Math Pathway */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#C8C5BA] block">
                الطريق الرياضي المتوقع:
              </span>
              <div className="p-3.5 rounded-xl bg-[#23170D]/90 border border-[#4A2F15] flex flex-wrap items-center justify-between gap-2 text-center">
                <div>
                  <span className="text-base sm:text-lg font-black text-[#FCFCFA] tabular-nums block">
                    {formatNumber(viewsNeeded)}
                  </span>
                  <span className="text-[10px] text-[#797979]">Views</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-[#F5BF1E]" />
                <div>
                  <span className="text-base sm:text-lg font-black text-[#FCFCFA] tabular-nums block">
                    {formatNumber(clicksNeeded)}
                  </span>
                  <span className="text-[10px] text-[#797979]">Clicks</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-[#F5BF1E]" />
                <div>
                  <span className="text-base sm:text-lg font-black text-[#FCFCFA] tabular-nums block">
                    {formatNumber(salesNeeded)}
                  </span>
                  <span className="text-[10px] text-[#797979]">Sales</span>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-[#F5BF1E]" />
                <div>
                  <span className="text-base sm:text-lg font-black text-[#F5BF1E] tabular-nums block">
                    {formatCurrency(target)}
                  </span>
                  <span className="text-[10px] text-[#FBD052]">Commission</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-[#4A2F15]/50 flex items-center justify-between text-[11px] text-[#797979]">
              <span>الأرقام تقديرية وليست ضمانًا للنتيجة</span>
              <span className="font-semibold text-[#C8C5BA]">
                by {APP_CONFIG.brandName}
              </span>
            </div>
          </div>
        </div>

        {/* Selectable / Copy Text */}
        <div className="flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#C8C5BA]">
                نص قابل للمشاركة أو النسخ:
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#040405] border border-[#4A2F15] hover:border-[#F5BF1E] text-xs font-medium text-[#F5BF1E] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">تم النسخ / التحديد!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ النص</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              id="shareable-text-area"
              readOnly
              rows={9}
              value={generatedText}
              onClick={selectText}
              className="w-full bg-[#040405] border border-[#4A2F15] rounded-xl p-3.5 text-xs sm:text-sm text-[#FCFCFA] font-sans leading-relaxed focus:outline-none focus:border-[#F5BF1E] resize-none select-all"
            />
          </div>

          <p className="text-[11px] text-[#797979]">
            يمكنك الضغط على المربع أعلاه لتحديد النص يدويًا أو استخدام زر النسخ للمشاركة مع فريقك أو في محتواك.
          </p>
        </div>
      </div>
    </div>
  );
};
