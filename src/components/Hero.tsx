import React from 'react';
import { ArrowDown, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCalculator }) => {
  return (
    <section className="relative pt-12 pb-14 sm:pt-16 sm:pb-20 overflow-hidden border-b border-[#4A2F15]/30">
      {/* Subtle radial warmth in background */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_50%_0%,#4A2F15_0%,transparent_60%)]" 
        aria-hidden="true" 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Small English Label */}
        <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#F5BF1E] uppercase mb-4">
          FIRST $1,000 CALCULATOR
        </p>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FCFCFA] leading-tight sm:leading-tight mb-3">
          هدفك أول 1000$ من الأفلييت؟
        </h1>

        {/* Second Line with highlighted 'الأرقام' in gold */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#FCFCFA] leading-snug mb-6">
          خلّي <span className="text-[#F5BF1E] underline decoration-[#A7690C] decoration-2 underline-offset-8">الأرقام</span> تقولك محتاج إيه
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-[#C8C5BA] max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
          دخل 3 أرقام فقط، والحاسبة هتقولك تقريبًا محتاج كام مبيعة، كام Click (نقرة)، وكام View (مشاهدة) للوصول لهدفك.
        </p>

        {/* Trust Microcopy */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#C8C5BA] bg-[#23170D]/80 border border-[#4A2F15] rounded-md px-4 py-2 mb-8">
          <CheckCircle2 className="w-4 h-4 text-[#F5BF1E] shrink-0" />
          <span>
            مش وعد بالأرباح. دي <span className="text-[#FCFCFA] font-semibold">Math (حسابات)</span> مبنية على أرقامك أنت.
          </span>
        </div>

        {/* Fast jump CTA */}
        <div>
          <button
            onClick={onScrollToCalculator}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#F5BF1E] hover:text-[#FBD052] transition-colors"
          >
            <span>انتقل إلى حاسبة الأرقام</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
