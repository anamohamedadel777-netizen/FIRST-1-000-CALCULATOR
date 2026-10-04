/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { APP_CONFIG } from './config';
import { CalculatorInputsState, CalculationResult } from './types';
import { calculateAll, validateInputs } from './utils/calculator';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TargetSelector } from './components/TargetSelector';
import { CalculatorInputs } from './components/CalculatorInputs';
import { VisualFunnel } from './components/VisualFunnel';
import { PowerfulSummary } from './components/PowerfulSummary';
import { MathBreakdown } from './components/MathBreakdown';
import { ScenarioSimulator } from './components/ScenarioSimulator';
import { TargetComparison } from './components/TargetComparison';
import { ReverseCalculator } from './components/ReverseCalculator';
import { InsightPanel } from './components/InsightPanel';
import { ShareResult } from './components/ShareResult';
import { MiniCourseCTA } from './components/MiniCourseCTA';
import { Disclaimer } from './components/Disclaimer';
import { Footer } from './components/Footer';

import { ArrowDown, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Central calculator state initialized with default values
  const [inputs, setInputs] = useState<CalculatorInputsState>({
    target: APP_CONFIG.defaultTarget,
    commission: APP_CONFIG.defaultCommission,
    conversionRate: APP_CONFIG.defaultConversionRate,
    ctr: APP_CONFIG.defaultCTR,
  });

  const [animationKey, setAnimationKey] = useState<number>(0);

  // Validate inputs
  const validation = useMemo(() => validateInputs(inputs), [inputs]);

  // Deterministic calculation result
  const result: CalculationResult = useMemo(() => {
    // If inputs are invalid, fallback gracefully to safe zeros
    if (!validation.isValid) {
      return {
        target: Math.max(0, inputs.target || 0),
        commission: Math.max(0, inputs.commission || 0),
        conversionRate: Math.max(0, inputs.conversionRate || 0),
        ctr: Math.max(0, inputs.ctr || 0),
        salesNeeded: 0,
        clicksNeeded: 0,
        viewsNeeded: 0,
        per1000Views: { clicks: 0, sales: 0, commission: 0 },
      };
    }
    return calculateAll(inputs);
  }, [inputs, validation.isValid]);

  // Handlers for state updates
  const handleSelectTarget = (target: number) => {
    setInputs((prev) => ({ ...prev, target }));
    setAnimationKey((prev) => prev + 1);
  };

  const handleChangeCommission = (commission: number) => {
    setInputs((prev) => ({ ...prev, commission }));
    setAnimationKey((prev) => prev + 1);
  };

  const handleChangeConversionRate = (conversionRate: number) => {
    setInputs((prev) => ({ ...prev, conversionRate }));
    setAnimationKey((prev) => prev + 1);
  };

  const handleChangeCTR = (ctr: number) => {
    setInputs((prev) => ({ ...prev, ctr }));
    setAnimationKey((prev) => prev + 1);
  };

  // Primary CTA click action
  const handleCalculateCTA = () => {
    setAnimationKey((prev) => prev + 1);
    // Smooth scroll to results if on mobile/small screen
    const funnelEl = document.getElementById('funnel');
    if (funnelEl) {
      funnelEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToCourse = () => {
    const el = document.getElementById('course');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#040405] text-[#FCFCFA] flex flex-col selection:bg-[#F5BF1E]/20 selection:text-[#FBD052]">
      {/* 3-Zone Top Bar */}
      <Navbar
        onScrollToCalculator={scrollToCalculator}
        onScrollToCourse={scrollToCourse}
      />

      {/* Hero Section */}
      <Hero onScrollToCalculator={scrollToCalculator} />

      {/* Main Interactive Workspace Container */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-14 w-full">
        {/* Core Calculator & Funnel Split Layout */}
        <section id="calculator" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Column (Right on RTL) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#23170D]/90 border border-[#4A2F15] rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
                <div className="border-b border-[#4A2F15]/50 pb-3">
                  <h2 className="text-xl sm:text-2xl font-black text-[#FCFCFA] flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#F5BF1E]" />
                    <span>مدخلات المعادلة</span>
                  </h2>
                  <p className="text-xs text-[#C8C5BA] mt-0.5">
                    حدد هدفك والـ 3 أرقام الأساسية لـ Funnel الأفلييت:
                  </p>
                </div>

                {/* Target Selector */}
                <TargetSelector
                  selectedTarget={inputs.target}
                  onSelectTarget={handleSelectTarget}
                  error={validation.errors.target}
                />

                {/* 3 Core Inputs */}
                <CalculatorInputs
                  commission={inputs.commission}
                  conversionRate={inputs.conversionRate}
                  ctr={inputs.ctr}
                  errors={validation.errors}
                  onChangeCommission={handleChangeCommission}
                  onChangeConversionRate={handleChangeConversionRate}
                  onChangeCTR={handleChangeCTR}
                />

                {/* Primary CTA Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleCalculateCTA}
                    className="w-full min-h-[52px] px-6 py-3.5 rounded-xl font-black text-base text-[#040405] bg-[#F5BF1E] hover:bg-[#FBD052] transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_20px_rgba(245,191,30,0.25)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>احسب الطريق لهدفي</span>
                    <ArrowDown className="w-4 h-4 text-[#040405]" />
                  </button>
                  <p className="text-[11px] text-center text-[#797979] mt-2">
                    الحسابات تحدث تلقائيًا وبشكل مباشر مع كل تغيير في الأرقام
                  </p>
                </div>
              </div>
            </div>

            {/* Results Column (Left on RTL) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Visual Funnel and 4 Metric Cards */}
              <VisualFunnel result={result} animationKey={animationKey} />

              {/* Powerful Summary Box */}
              <PowerfulSummary result={result} />

              {/* Math Behind It (Collapsible Dynamic Breakdown) */}
              <MathBreakdown result={result} />
            </div>
          </div>
        </section>

        {/* Section: What-if Scenario Simulator */}
        <ScenarioSimulator inputs={inputs} />

        {/* Section: Target Comparison */}
        <TargetComparison
          inputs={inputs}
          onSelectTarget={handleSelectTarget}
        />

        {/* Section: Reverse Mode Calculator */}
        <ReverseCalculator inputs={inputs} />

        {/* Section: Educational Insights Engine */}
        <InsightPanel inputs={inputs} />

        {/* Section: Shareable Result */}
        <ShareResult result={result} />

        {/* Section: Mini Course CTA & R.B.T.L.S Framework */}
        <MiniCourseCTA />

        {/* Legal & Educational Disclaimer */}
        <Disclaimer />
      </main>

      {/* Brand Footer */}
      <Footer />
      
      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
