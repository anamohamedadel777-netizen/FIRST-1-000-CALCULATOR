import React, { useState } from 'react';
import { APP_CONFIG } from '../config';
import { formatCurrency } from '../utils/calculator';
import { Target, Sparkles } from 'lucide-react';

interface TargetSelectorProps {
  selectedTarget: number;
  onSelectTarget: (target: number) => void;
  error?: string;
}

export const TargetSelector: React.FC<TargetSelectorProps> = ({
  selectedTarget,
  onSelectTarget,
  error,
}) => {
  const [isCustom, setIsCustom] = useState<boolean>(() => {
    return !APP_CONFIG.targetPresets.includes(selectedTarget as any);
  });
  const [customValue, setCustomValue] = useState<string>(
    !APP_CONFIG.targetPresets.includes(selectedTarget as any) ? String(selectedTarget) : ''
  );

  const handlePresetClick = (preset: number) => {
    setIsCustom(false);
    onSelectTarget(preset);
  };

  const handleCustomToggle = () => {
    setIsCustom(true);
    const num = parseFloat(customValue) || 1000;
    onSelectTarget(num);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomValue(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      onSelectTarget(parsed);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-base sm:text-lg font-bold text-[#FCFCFA] flex items-center gap-2">
          <Target className="w-5 h-5 text-[#F5BF1E]" />
          <span>أنت مستهدف كام؟</span>
        </label>
        <span className="text-xs text-[#C8C5BA]">
          Target Income (هدف الدخل)
        </span>
      </div>

      {/* Preset Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {APP_CONFIG.targetPresets.map((preset) => {
          const isSelected = !isCustom && selectedTarget === preset;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => handlePresetClick(preset)}
              className={`min-h-[46px] px-3 py-2 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center border ${
                isSelected
                  ? 'bg-[#F5BF1E] text-[#040405] border-[#F5BF1E] shadow-[0_0_15px_rgba(245,191,30,0.25)] font-extrabold'
                  : 'bg-[#23170D] text-[#FCFCFA] border-[#4A2F15] hover:border-[#A7690C] hover:bg-[#2d1e12]'
              }`}
            >
              <span className="tabular-nums">{formatCurrency(preset)}</span>
            </button>
          );
        })}

        {/* Custom Target Button */}
        <button
          type="button"
          onClick={handleCustomToggle}
          className={`min-h-[46px] px-3 py-2 rounded-lg font-bold text-sm sm:text-base transition-all flex items-center justify-center border col-span-2 sm:col-span-1 ${
            isCustom
              ? 'bg-[#F5BF1E] text-[#040405] border-[#F5BF1E] shadow-[0_0_15px_rgba(245,191,30,0.25)] font-extrabold'
              : 'bg-[#23170D] text-[#FCFCFA] border-[#4A2F15] hover:border-[#A7690C] hover:bg-[#2d1e12]'
          }`}
        >
          <span>هدف مخصص</span>
        </button>
      </div>

      {/* Custom Target Input Field if active */}
      {isCustom && (
        <div className="pt-2">
          <div className="relative rounded-lg bg-[#23170D] border border-[#A7690C] p-3">
            <div className="flex items-center justify-between text-xs text-[#C8C5BA] mb-1.5">
              <span>Target Income · هدف العمولات بالدولار ($)</span>
              <span>أكبر من 0</span>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[#F5BF1E] font-bold text-lg pointer-events-none">
                $
              </span>
              <input
                type="number"
                min="1"
                step="50"
                value={customValue}
                onChange={handleCustomChange}
                placeholder="مثال: 2500"
                className="w-full bg-[#040405] border border-[#4A2F15] focus:border-[#F5BF1E] rounded-md py-2.5 px-8 text-left text-lg font-bold text-[#FCFCFA] tabular-nums focus:outline-none focus:ring-1 focus:ring-[#F5BF1E]"
              />
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-rose-400 font-medium">{error}</p>
      )}
    </div>
  );
};
