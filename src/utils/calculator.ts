import { CalculationResult, CalculatorInputsState, ImprovementScenario, ReverseCalculationResult, ValidationErrors } from '../types';

/**
 * Calculates sales needed: Math.ceil(Target / Commission)
 */
export function calculateSalesNeeded(target: number, commission: number): number {
  if (commission <= 0 || target <= 0 || !Number.isFinite(target) || !Number.isFinite(commission)) {
    return 0;
  }
  return Math.ceil(target / commission);
}

/**
 * Calculates clicks needed: Math.ceil(Sales / (ConversionRate / 100))
 */
export function calculateClicksNeeded(salesNeeded: number, conversionRatePercent: number): number {
  if (conversionRatePercent <= 0 || salesNeeded <= 0 || !Number.isFinite(salesNeeded) || !Number.isFinite(conversionRatePercent)) {
    return 0;
  }
  const crDecimal = conversionRatePercent / 100;
  return Math.ceil(salesNeeded / crDecimal);
}

/**
 * Calculates views needed: Math.ceil(Clicks / (CTR / 100))
 */
export function calculateViewsNeeded(clicksNeeded: number, ctrPercent: number): number {
  if (ctrPercent <= 0 || clicksNeeded <= 0 || !Number.isFinite(clicksNeeded) || !Number.isFinite(ctrPercent)) {
    return 0;
  }
  const ctrDecimal = ctrPercent / 100;
  return Math.ceil(clicksNeeded / ctrDecimal);
}

/**
 * Calculates estimated affiliate commission revenue per 1,000 views:
 * clicksPer1000Views = 1000 * (CTR / 100)
 * salesPer1000Views = clicksPer1000Views * (CR / 100)
 * commissionPer1000Views = salesPer1000Views * commission
 */
export function calculatePer1000Views(
  commission: number,
  conversionRatePercent: number,
  ctrPercent: number
): { clicks: number; sales: number; commission: number } {
  if (commission <= 0 || conversionRatePercent <= 0 || ctrPercent <= 0) {
    return { clicks: 0, sales: 0, commission: 0 };
  }
  const clicks = 1000 * (ctrPercent / 100);
  const sales = clicks * (conversionRatePercent / 100);
  const commissionEarned = sales * commission;
  return {
    clicks,
    sales,
    commission: commissionEarned,
  };
}

/**
 * Full deterministic calculation pipeline
 */
export function calculateAll(inputs: CalculatorInputsState): CalculationResult {
  const salesNeeded = calculateSalesNeeded(inputs.target, inputs.commission);
  const clicksNeeded = calculateClicksNeeded(salesNeeded, inputs.conversionRate);
  const viewsNeeded = calculateViewsNeeded(clicksNeeded, inputs.ctr);
  const per1000Views = calculatePer1000Views(inputs.commission, inputs.conversionRate, inputs.ctr);

  return {
    target: inputs.target,
    commission: inputs.commission,
    conversionRate: inputs.conversionRate,
    ctr: inputs.ctr,
    salesNeeded,
    clicksNeeded,
    viewsNeeded,
    per1000Views,
  };
}

/**
 * Reverse mode calculation:
 * expectedClicks = views * (CTR / 100)
 * expectedSales = expectedClicks * (CR / 100)
 * expectedRevenue = expectedSales * commission
 */
export function calculateReverseScenario(
  views: number,
  commission: number,
  conversionRatePercent: number,
  ctrPercent: number
): ReverseCalculationResult {
  if (views < 0 || commission <= 0 || conversionRatePercent <= 0 || ctrPercent <= 0) {
    return {
      views: Math.max(0, views || 0),
      expectedClicks: 0,
      expectedSales: 0,
      expectedRevenue: 0,
    };
  }

  const expectedClicks = views * (ctrPercent / 100);
  const expectedSales = expectedClicks * (conversionRatePercent / 100);
  const expectedRevenue = expectedSales * commission;

  return {
    views,
    expectedClicks,
    expectedSales,
    expectedRevenue,
  };
}

/**
 * Improvement scenario calculation without modifying original inputs
 */
export function calculateImprovementScenario(
  inputs: CalculatorInputsState,
  metric: 'ctr' | 'conversionRate' | 'commission',
  factor: number,
  factorLabel: string
): ImprovementScenario {
  const baseResult = calculateAll(inputs);
  const beforeViews = baseResult.viewsNeeded;

  let originalValue = inputs[metric];
  let improvedValue = originalValue * factor;

  // Cap percentages at 100 if applicable
  if (metric === 'ctr' || metric === 'conversionRate') {
    improvedValue = Math.min(100, improvedValue);
  }

  const modifiedInputs: CalculatorInputsState = {
    ...inputs,
    [metric]: improvedValue,
  };

  const afterResult = calculateAll(modifiedInputs);
  const afterViews = afterResult.viewsNeeded;
  const viewsSaved = Math.max(0, beforeViews - afterViews);
  const percentSaved = beforeViews > 0 ? (viewsSaved / beforeViews) * 100 : 0;

  return {
    metric,
    factor,
    factorLabel,
    originalMetricValue: originalValue,
    improvedMetricValue: improvedValue,
    beforeViewsNeeded: beforeViews,
    afterViewsNeeded: afterViews,
    viewsSaved,
    percentSaved,
  };
}

/**
 * Validates calculator inputs
 */
export function validateInputs(inputs: CalculatorInputsState): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (!inputs.target || inputs.target <= 0 || !Number.isFinite(inputs.target)) {
    errors.target = 'برجاء إدخال هدف مالي أكبر من صفر';
  }

  if (!inputs.commission || inputs.commission <= 0 || !Number.isFinite(inputs.commission)) {
    errors.commission = 'العمولة لكل مبيعة يجب أن تكون أكبر من صفر';
  }

  if (
    inputs.conversionRate === undefined ||
    inputs.conversionRate <= 0 ||
    inputs.conversionRate > 100 ||
    !Number.isFinite(inputs.conversionRate)
  ) {
    errors.conversionRate = 'معدل التحويل يجب أن يكون بين 0.1% و 100%';
  }

  if (
    inputs.ctr === undefined ||
    inputs.ctr <= 0 ||
    inputs.ctr > 100 ||
    !Number.isFinite(inputs.ctr)
  ) {
    errors.ctr = 'معدل النقر (CTR) يجب أن يكون بين 0.1% و 100%';
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}

/**
 * Format numbers with thousands separators and clean decimals
 */
export function formatNumber(val: number, maxDecimals = 0): string {
  if (!Number.isFinite(val) || isNaN(val)) return '0';
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: maxDecimals,
    minimumFractionDigits: 0,
  }).format(val);
}

/**
 * Format currency in USD ($1,000 or $50.50)
 */
export function formatCurrency(val: number, maxDecimals = 2): string {
  if (!Number.isFinite(val) || isNaN(val)) return '$0';
  const hasDecimals = val % 1 !== 0;
  return (
    '$' +
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: hasDecimals ? Math.min(2, maxDecimals) : 0,
      maximumFractionDigits: maxDecimals,
    }).format(val)
  );
}

/**
 * Format percentages (e.g. 2% or 2.5%)
 */
export function formatPercent(val: number, decimals = 2): string {
  if (!Number.isFinite(val) || isNaN(val)) return '0%';
  const hasDecimals = val % 1 !== 0;
  return `${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: hasDecimals ? 1 : 0,
  }).format(val)}%`;
}
