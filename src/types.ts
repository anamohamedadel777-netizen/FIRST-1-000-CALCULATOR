export interface CalculatorInputsState {
  target: number;
  commission: number;
  conversionRate: number; // percentage, e.g. 2 for 2%
  ctr: number; // percentage, e.g. 5 for 5%
}

export interface CalculationResult {
  target: number;
  commission: number;
  conversionRate: number;
  ctr: number;
  salesNeeded: number;
  clicksNeeded: number;
  viewsNeeded: number;
  per1000Views: {
    clicks: number;
    sales: number;
    commission: number;
  };
}

export interface ReverseCalculationResult {
  views: number;
  expectedClicks: number;
  expectedSales: number;
  expectedRevenue: number;
}

export interface ImprovementScenario {
  metric: 'ctr' | 'conversionRate' | 'commission';
  factor: number; // e.g. 1.25, 1.5, 2.0
  factorLabel: string;
  originalMetricValue: number;
  improvedMetricValue: number;
  beforeViewsNeeded: number;
  afterViewsNeeded: number;
  viewsSaved: number;
  percentSaved: number;
}

export interface ValidationErrors {
  target?: string;
  commission?: string;
  conversionRate?: string;
  ctr?: string;
  reverseViews?: string;
}
