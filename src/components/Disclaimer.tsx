import React from 'react';
import { AlertCircle } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="rounded-xl bg-[#23170D]/60 border border-[#4A2F15] p-5 sm:p-6 text-xs sm:text-sm text-[#C8C5BA] space-y-2">
      <div className="flex items-center gap-2 text-[#F5BF1E] font-bold">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>تنبيه وإخلاء مسؤولية قانوني وتعليمي:</span>
      </div>
      <p className="leading-relaxed">
        الحسابات هنا تقديرية فقط ومبنية على الأرقام التي تدخلها. النتائج الفعلية قد تختلف حسب جودة الترافيك، الجمهور، العرض، المحتوى، صفحة البيع، السوق، والاسترجاعات وعوامل أخرى.
      </p>
      <p className="text-[#797979] text-xs">
        الأداة تعليمية ولا تمثل وعدًا أو ضمانًا بأي مستوى من الأرباح أو الدخل المادي.
      </p>
    </div>
  );
};
