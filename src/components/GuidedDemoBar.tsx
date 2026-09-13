import React from 'react';
import { ChevronRight, ChevronLeft, Check, Sparkles, X } from 'lucide-react';

interface GuidedDemoBarProps {
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onCloseDemo: () => void;
  onGoToStep: (stepIdx: number) => void;
}

export default function GuidedDemoBar({ 
  currentStep, 
  onNextStep, 
  onPrevStep, 
  onCloseDemo,
  onGoToStep 
}: GuidedDemoBarProps) {
  const steps = [
    {
      num: 1,
      title: "1. Select Demo Case #RV-4821",
      desc: "Open case #RV-4821 (Arjun Rao) from the support queue to examine a multi-issue complaint.",
      actionHint: "Click on case #RV-4821 in the list below."
    },
    {
      num: 2,
      title: "2. Inspect Multi-Issue Intents",
      desc: "Observe the 4 detected intents: Duplicate Payment, Damaged Delivery, Refund Request, Replacement Request.",
      actionHint: "Review the left panel and customer message."
    },
    {
      num: 3,
      title: "3. Run Autonomous Investigation",
      desc: "Trigger the AI investigation engine to cross-reference order logs, courier status, and payment ledgers.",
      actionHint: "Click the 'Run Autonomous AI Investigation' button."
    },
    {
      num: 4,
      title: "4. Audit Evidence & Qwen Reasoning",
      desc: "Examine concise findings (TX-8831 & TX-8832 duplicate charge) and Qwen's dual-resolution plan.",
      actionHint: "Review Evidence & Qwen Reasoning panels."
    },
    {
      num: 5,
      title: "5. Safe Automated Action: Initiate Refund",
      desc: "Automate duplicate payment refund TX-8832 (₹4,999) under policy 4.2 without manual friction.",
      actionHint: "Click 'Initiate Refund (₹4,999)' and confirm."
    },
    {
      num: 6,
      title: "6. Intelligent Human Escalation",
      desc: "Escalate replacement request to Senior Agent Priya Sharma with compiled 360 context package.",
      actionHint: "Click 'Escalate Replacement'."
    },
    {
      num: 7,
      title: "7. Human Handoff & Final Resolution",
      desc: "As Agent Priya Sharma, approve replacement in 1 click without re-investigating. Review final customer reply.",
      actionHint: "Click 'Approve Replacement'."
    }
  ];

  const activeStepObj = steps[currentStep] || steps[0];

  return (
    <div className="bg-slate-900 border-b border-indigo-950 text-white px-6 py-2.5 flex items-center justify-between shadow-md select-none">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs shadow-inner">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              3-MINUTE DEMO WALKTHROUGH
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs font-semibold text-amber-300">
              {activeStepObj.title}
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            {activeStepObj.desc} <span className="text-indigo-300 font-medium">({activeStepObj.actionHint})</span>
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Step dots */}
        <div className="hidden lg:flex items-center space-x-1.5 mr-2">
          {steps.map((s, idx) => (
            <button
              key={s.num}
              onClick={() => onGoToStep(idx)}
              className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                idx === currentStep
                  ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                  : idx < currentStep
                  ? 'bg-indigo-700 text-indigo-200'
                  : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
              }`}
            >
              {idx < currentStep ? <Check className="w-3 h-3 stroke-[3]" /> : s.num}
            </button>
          ))}
        </div>

        {/* Prev / Next controls */}
        <div className="flex items-center space-x-1">
          <button
            onClick={onPrevStep}
            disabled={currentStep === 0}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNextStep}
            disabled={currentStep === steps.length - 1}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onCloseDemo}
          title="Exit Guided Demo"
          className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
