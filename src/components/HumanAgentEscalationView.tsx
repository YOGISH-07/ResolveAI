import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  FileText, 
  Check, 
  ArrowLeft, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { SupportCase } from '../types/index.ts';

interface HumanAgentEscalationViewProps {
  caseData: SupportCase;
  onApproveReplacement: (caseId: string) => Promise<void>;
  onNavigateCase: (caseId: string) => void;
}

export default function HumanAgentEscalationView({ 
  caseData, 
  onApproveReplacement, 
  onNavigateCase 
}: HumanAgentEscalationViewProps) {
  const [actionSuccess, setActionSuccess] = useState(false);

  if (!caseData) return null;

  const isResolved = caseData.status === 'RESOLVED' || caseData.replacementApproved;

  const handleApprove = async () => {
    await onApproveReplacement(caseData.id);
    setActionSuccess(true);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200 pb-20">
      {/* Top Banner */}
      <div className="bg-purple-950 border border-purple-800 text-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-400 text-slate-950 font-mono">
              HUMAN ESCALATION WORKSPACE
            </span>
            <h1 className="text-xl font-bold tracking-tight text-white">
              ESCALATED CASE #{caseData.id.replace('#', '')}
            </h1>
          </div>
          <p className="text-xs text-purple-200">
            Assigned Agent: <span className="font-bold text-white">Priya Sharma</span> • Priority: <span className="font-bold text-red-300">HIGH</span>
          </p>
        </div>

        <button
          onClick={() => onNavigateCase(caseData.id)}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-purple-900 hover:bg-purple-800 text-purple-200 border border-purple-700 rounded text-xs font-semibold cursor-pointer self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Investigation</span>
        </button>
      </div>

      {/* Philosophy Callout: Zero Re-Investigation */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex items-start space-x-3 text-xs text-indigo-900">
        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-sm text-indigo-950 mb-0.5">
            ResolveAI completed the investigation before escalation.
          </span>
          <p className="text-indigo-800 leading-relaxed">
            All customer records, payment duplicate verification (TX-8831 & TX-8832), delivery tracking logs, and policy cross-references have been automatically compiled into this single audit package. No manual re-investigation is required.
          </p>
        </div>
      </div>

      {/* RESOLUTION SUCCESS BENCHMARK */}
      {isResolved ? (
        <div className="bg-emerald-50 border-2 border-emerald-500 rounded-lg p-6 space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-emerald-950 tracking-tight">
                REPLACEMENT APPROVED & CASE RESOLVED
              </h2>
              <p className="text-xs text-emerald-800 font-mono">
                Order: RV-4821 • Replacement Order #REP-4821 Initiated
              </p>
            </div>
          </div>

          <div className="bg-white border border-emerald-200 rounded-md p-4 space-y-2 text-xs">
            <div className="font-bold text-emerald-900 uppercase text-[10px] tracking-wider mb-1">
              Complete Resolution Summary
            </div>
            <div className="flex items-center gap-2 text-slate-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Duplicate payment refund initiated for TX-8832 (₹4,999) under Policy 4.2</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Replacement unit approved by Senior Agent Priya Sharma under Policy 7.1</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Customer notification generated & sent</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Investigation archived with full auditable trail</span>
            </div>
            <div className="pt-2 text-[10px] text-amber-700 font-mono font-bold">
              DEMO ACTION — NO REAL TRANSACTION
            </div>
          </div>

          {/* Customer Response Preview */}
          <div className="bg-slate-900 text-white rounded-md p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-bold text-indigo-400 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                Generated Customer Response
              </span>
              <span className="font-mono text-[10px]">Recipient: Arjun Rao (CUS-10482)</span>
            </div>
            <pre className="text-xs font-sans whitespace-pre-wrap leading-relaxed text-slate-200">
{caseData.finalResolutionText || `Hi Arjun,\n\nWe've identified the duplicate payment on order RV-4821 and initiated the refund workflow.\n\nYour replacement request has also been approved.\n\nNo further information is required from you at this time.\n\n— ResolveAI Support`}
            </pre>
          </div>
        </div>
      ) : (
        /* COMPLETE CONTEXT PACKAGE FOR HUMAN AGENT */
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden space-y-6 p-6">
          
          <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              Escalation Context Package
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Compiled by ResolveAI Engine
            </span>
          </div>

          {/* 1. Customer Issue */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              1. Customer Issue Summary
            </span>
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-xs font-medium text-slate-900 italic">
              "{caseData.customerMessage}"
            </div>
          </div>

          {/* 2. What ResolveAI Investigated */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              2. What ResolveAI Investigated
            </span>
            <div className="bg-slate-50 p-3 rounded-md border border-slate-200 text-xs font-mono space-y-1 text-slate-700">
              {caseData.timelineEvents.map((evt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{evt.title}: {evt.details}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Evidence Found & Root Cause */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                3. Auditable Evidence Found
              </span>
              <ul className="space-y-1 text-slate-700 font-mono text-[11px]">
                <li>• Payment: TX-8831 (₹4,999) & TX-8832 (₹4,999) duplicate charge</li>
                <li>• Delivery: Order RV-4821 delivered 2026-09-10 by Express Logistics India</li>
                <li>• Complaint: Customer reported physical damage upon unboxing</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-md border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                4. Root Cause & Actions Taken
              </span>
              <div className="space-y-1 text-slate-700 text-[11px]">
                <p className="font-semibold text-slate-900">Root Cause:</p>
                <p className="italic">{caseData.qwenAnalysis?.rootCause || 'Payment gateway double-submission combined with transit physical damage.'}</p>
                <p className="font-semibold text-slate-900 pt-1">Actions Taken So Far:</p>
                <p className="font-mono text-emerald-700">✓ Duplicate refund TX-8832 (₹4,999) initiated under Policy 4.2</p>
              </div>
            </div>
          </div>

          {/* 4. Policy Check & Recommended Next Action */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-md border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                5. Policy References
              </span>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="text-emerald-700 font-bold">✓ Policy 4.2: Auto-Refund on Verified Duplicate</div>
                <div className="text-amber-800 font-bold">⚠ Policy 7.1: Physical Damage Replacement Gate</div>
              </div>
            </div>

            <div className="bg-indigo-50/70 p-4 rounded-md border border-indigo-200 space-y-2 text-xs">
              <span className="font-bold text-indigo-950 block border-b border-indigo-200 pb-1">
                6. Recommended Next Action
              </span>
              <p className="text-indigo-900 font-medium leading-relaxed">
                Approve replacement dispatch for Sony WH-1000XM5 (SKU: SONY-WH1000XM5-BLK) to Arjun Rao.
              </p>
            </div>
          </div>

          {/* Reason for Escalation */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-900 flex items-center justify-between font-mono">
            <span>Escalation Reason:</span>
            <span className="font-bold">Replacement requires human approval under Escalation Matrix Policy 7.1</span>
          </div>

          {/* HUMAN DECISION BUTTONS */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Human Manager Decision (Agent Priya Sharma)
            </span>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleApprove}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-bold flex items-center justify-center space-x-2 shadow-xs cursor-pointer transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve Replacement</span>
              </button>

              <button
                onClick={() => alert("Demo Mode: Click 'Approve Replacement' to complete resolution.")}
                className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-md text-xs font-semibold flex items-center justify-center space-x-2 cursor-pointer transition-colors"
              >
                <XCircle className="w-4 h-4 text-slate-400" />
                <span>Reject</span>
              </button>

              <button
                onClick={() => alert("Demo Mode: Click 'Approve Replacement' to complete resolution.")}
                className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-md text-xs font-semibold flex items-center justify-center space-x-2 cursor-pointer transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>Request More Info</span>
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
