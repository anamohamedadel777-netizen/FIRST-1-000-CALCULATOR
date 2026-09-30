import { CalculatorInputsState } from '../types';

export interface EducationalInsight {
  id: string;
  type: 'leverage' | 'observation' | 'funnel';
  title: string;
  message: string;
  highlightText?: string;
}

/**
 * Deterministic rule-based educational insight generator
 * Uses cautious, systems-oriented language without artificial AI or universal claims.
 */
export function generateEducationalInsights(inputs: CalculatorInputsState): EducationalInsight[] {
  const insights: EducationalInsight[] = [];
  const { commission, conversionRate, ctr } = inputs;

  // 1. Commission Observation
  if (commission < 20) {
    insights.push({
      id: 'low-commission',
      type: 'leverage',
      title: 'رافعة العمولة لكل مبيعة',
      message: 'كل ما تقل العمولة لكل مبيعة، يزيد عدد المبيعات المطلوبة لتحقيق نفس الهدف. اختيار عروض ذات عمولة أعلى أو نموذج تكراري (Recurring) يقلل الضغط الحسابي على حجم المشاهدات.',
    });
  } else if (commission >= 100) {
    insights.push({
      id: 'high-commission',
      type: 'leverage',
      title: 'عروض القيمة العالية (High Ticket)',
      message: 'بعمولة مرتفعة، عدد المبيعات المطلوبة يقل كثيرًا. هذا يعني أن التركيز الأكبر ينتقل لجودة الجمهور المستهدف والـ Conversion Rate بدلاً من مجرد ملاحقة ملايين المشاهدات.',
    });
  }

  // 2. Funnel mismatch: High CTR but Low Conversion
  if (ctr >= 4 && conversionRate < 1.5) {
    insights.push({
      id: 'ctr-high-cr-low',
      type: 'funnel',
      title: 'كفاءة انتقال ما بعد النقرة',
      message: 'المحتوى قادر على توليد Clicks (نقرات)، لكن الجزء بعد النقرة يستحق المراجعة. قد يكون هناك اختلاف بين توقعات المشاهد وما يراه فعليًا في صفحة الهبوط أو عرض الأفلييت.',
    });
  }

  // 3. Funnel mismatch: Low CTR but Strong Conversion
  else if (ctr <= 2.5 && conversionRate >= 3) {
    insights.push({
      id: 'cr-high-ctr-low',
      type: 'funnel',
      title: 'قوة العرض مقابل دعوة العمل (CTA)',
      message: 'الأشخاص اللي بيضغطوا بيتحولوا بشكل أفضل، لذلك زيادة نسبة الضغط من المحتوى قد يكون لها تأثير كبير. مراجعة طريقة طرح الرابط ودعوة اتخاذ الإجراء (Call to Action) داخل المحتوى قد تضاعف النتائج.',
    });
  }

  // 4. CTR specific observation
  if (ctr <= 2) {
    insights.push({
      id: 'low-ctr',
      type: 'observation',
      title: 'فرصة انتقال المشاهد للنقرة',
      message: 'أكبر فرصة في السيناريو الحالي قد تكون تحسين انتقال المشاهد من المحتوى إلى الرابط. عندما يكون معدل النقر منخفضًا، يتطلب الأمر أعدادًا ضخمة من المشاهدات الأولية لإنتاج نفس النقرات.',
    });
  }

  // 5. Conversion Rate specific observation
  if (conversionRate <= 1) {
    insights.push({
      id: 'low-cr',
      type: 'observation',
      title: 'حساسية معدل التحويل',
      message: 'أي تحسن صغير في Conversion Rate (معدل التحويل) ممكن يقلل عدد النقرات المطلوبة بشكل واضح. الانتقال من 1% إلى 2% يقسم المشاهدات المطلوبة للنصف فورًا.',
    });
  }

  // Default balanced insight if no edge cases
  if (insights.length === 0) {
    insights.push({
      id: 'balanced-math',
      type: 'funnel',
      title: 'التناغم بين المراحل الثلاث',
      message: 'الأرقام متوازنة؛ لتحقيق قفزة نوعية في وقت أقل، جرّب تحسين المرحلة الأسهل بالنسبة لمهاراتك الحالية، سواء كانت تحسين الـ Hook لرفع النقر أو اختيار منتج بعمولة أكبر.',
    });
  }

  return insights;
}
