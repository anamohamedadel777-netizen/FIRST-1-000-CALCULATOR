import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  supportingText: string;
  icon: LucideIcon;
  badgeText?: string;
  isSpecial?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  supportingText,
  icon: Icon,
  badgeText,
  isSpecial = false,
}) => {
  return (
    <div
      className={`rounded-xl p-5 border transition-all duration-200 ${
        isSpecial
          ? 'bg-[#23170D] border-[#A7690C] hover:border-[#F5BF1E] shadow-[0_4px_20px_rgba(167,105,12,0.15)]'
          : 'bg-[#23170D] border-[#4A2F15] hover:border-[#A7690C]'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs sm:text-sm font-semibold text-[#C8C5BA] flex items-center gap-1.5">
          <Icon className="w-4 h-4 text-[#F5BF1E]" />
          <span>{title}</span>
        </span>
        {badgeText && (
          <span className="text-[11px] font-medium text-[#FBD052] bg-[#4A2F15]/40 px-2 py-0.5 rounded border border-[#A7690C]/40">
            {badgeText}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl sm:text-4xl font-extrabold text-[#FCFCFA] tabular-nums tracking-tight">
          {value}
        </span>
        <span className="text-xs sm:text-sm font-medium text-[#C8C5BA]">
          {unit}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-[#C8C5BA] leading-relaxed border-t border-[#4A2F15]/40 pt-2.5">
        {supportingText}
      </p>
    </div>
  );
};
