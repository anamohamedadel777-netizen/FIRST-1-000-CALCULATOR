import React from 'react';
import { APP_CONFIG } from '../config';
import { ArrowLeft, PlayCircle, Lock, BookOpen } from 'lucide-react';

export const MiniCourseCTA: React.FC = () => {
  const isUrlConfigured = Boolean(APP_CONFIG.MINI_COURSE_URL && APP_CONFIG.MINI_COURSE_URL.trim() !== '');

  const rbtlsSteps = [
    { letter: 'R', titleEn: 'Research', titleAr: 'ابحث', desc: 'عن المشكلة والجمهور' },
    { letter: 'B', titleEn: 'Build', titleAr: 'ابنِ', desc: 'العرض ومسار التحويل' },
    { letter: 'T', titleEn: 'Traffic', titleAr: 'اجلب الترافيك', desc: 'بالمحتوى أو الإعلانات' },
    { letter: 'L', titleEn: 'Learn', titleAr: 'تعلم', desc: 'حلل الأرقام والمسار', highlight: true },
    { letter: 'S', titleEn: 'Scale', titleAr: 'وسع', desc: 'وضاعف النتائج' },
  ];

  return (
    <section id="course" className="space-y-8">
      {/* Main Course CTA Box */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#23170D] via-[#23170D] to-[#040405] border-2 border-[#A7690C] p-6 sm:p-10 overflow-hidden shadow-2xl">
        {/* Glow backdrop */}
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#F5BF1E]/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F5BF1E] uppercase tracking-wider bg-[#040405]/80 px-3.5 py-1.5 rounded-full border border-[#4A2F15]">
            <PlayCircle className="w-4 h-4" />
            <span>ميني كورس مجاني · 3 فيديوهات مكثفة</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#FCFCFA] leading-tight">
            دلوقتي عرفت &quot;كام&quot;…
            <br />
            <span className="text-[#F5BF1E]">تعال نفهم &quot;إزاي&quot;</span>
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#C8C5BA] leading-relaxed max-w-2xl mx-auto">
            <p>
              الحاسبة قالتلك إن الوصول لهدف مالي مش سحر. هو مجموعة أرقام مرتبطة ببعض:
            </p>
            <div className="py-2 font-mono text-xs sm:text-sm text-[#FBD052] font-semibold">
              Views → Clicks → Sales → Commission
            </div>
            <p className="text-xs sm:text-sm text-[#FCFCFA] font-medium">
              لكن السؤال الأهم:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-[#C8C5BA] list-none">
              <li>• إزاي تختار السوق والعرض المناسب؟</li>
              <li>• إزاي تعمل محتوى يجيب Clicks (نقرات) مؤهلة ومهتمة فعلاً؟</li>
              <li>• وإزاي تبني Funnel (مسار تحويل) يحول النقرات لمبيعات مستمرة؟</li>
            </ul>
            <p className="text-xs sm:text-sm text-[#FCFCFA] pt-1">
              أنا عامل ميني كورس مجاني من 3 فيديوهات بيرتبلك الصورة كلها من البداية للنهاية.
            </p>
          </div>

          {/* CTA Button or Disabled State */}
          <div className="pt-2">
            {isUrlConfigured ? (
              <a
                href={APP_CONFIG.MINI_COURSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-extrabold text-[#040405] bg-[#F5BF1E] hover:bg-[#FBD052] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_25px_rgba(245,191,30,0.3)]"
              >
                <span>ابدأ الميني كورس مجانًا</span>
                <ArrowLeft className="w-5 h-5" />
              </a>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold text-[#797979] bg-[#4A2F15]/30 border border-[#4A2F15] cursor-not-allowed opacity-75"
                >
                  <Lock className="w-4 h-4 text-[#797979]" />
                  <span>ابدأ الميني كورس مجانًا</span>
                </button>
                <p className="text-xs text-[#F5BF1E] font-medium">
                  سيتم إضافة رابط الميني كورس هنا
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* R.B.T.L.S Framework */}
      <div className="bg-[#23170D] border border-[#4A2F15] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#F5BF1E] font-bold">
            THE R.B.T.L.S SYSTEM
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#FCFCFA] mt-1">
            نظام العمل المتكامل في الأفلييت
          </h3>
        </div>

        {/* 5 Letters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {rbtlsSteps.map((step) => (
            <div
              key={step.letter}
              className={`p-4 rounded-xl text-center border transition-all ${
                step.highlight
                  ? 'bg-[#040405] border-[#F5BF1E] shadow-[0_0_15px_rgba(245,191,30,0.2)] ring-1 ring-[#F5BF1E]'
                  : 'bg-[#040405]/60 border-[#4A2F15]'
              }`}
            >
              <div
                className={`text-2xl sm:text-3xl font-black mb-1 ${
                  step.highlight ? 'text-[#F5BF1E]' : 'text-[#FCFCFA]'
                }`}
              >
                {step.letter}
              </div>
              <div className="text-xs font-bold text-[#FCFCFA]">{step.titleEn}</div>
              <div className="text-xs font-semibold text-[#F5BF1E] mt-0.5">{step.titleAr}</div>
              <div className="text-[11px] text-[#797979] mt-1.5">{step.desc}</div>
              {step.highlight && (
                <div className="mt-2 pt-1 border-t border-[#4A2F15] text-[10px] text-[#FBD052] font-semibold">
                  موقعك الآن
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Caption */}
        <div className="text-center pt-2">
          <p className="text-xs sm:text-sm text-[#C8C5BA] font-medium">
            الحاسبة دي جزء من <span className="text-[#F5BF1E] font-bold">Learn (التعلم)</span>:
            تفهم الأرقام قبل ما تعمل <span className="text-[#F5BF1E] font-bold">Scale (توسع)</span>.
          </p>
        </div>
      </div>
    </section>
  );
};
