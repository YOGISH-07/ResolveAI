import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ShieldAlert, 
  CreditCard, 
  User, 
  FileText, 
  Sparkles, 
  Play, 
  RefreshCw,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SupportCase } from '../types/index.ts';

interface CaseWorkspaceViewProps {
  caseData: SupportCase;
  onRunInvestigation: (caseId: string) => Promise<void>;
  onInitiateRefund: () => void;
  onEscalateReplacement: () => Promise<void>;
  onNavigateEscalations: () => void;
}

export default function CaseWorkspaceView({ 
  caseData, 
  onRunInvestigation, 
  onInitiateRefund, 
  onEscalateReplacement,
  onNavigateEscalations 
}: CaseWorkspaceViewProps) {
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [visibleEventsCount, setVisibleEventsCount] = useState(
    caseData?.investigationCompleted ? caseData.timelineEvents.length : 0
  );

  const handleStartInvestigation = async () => {
    setIsInvestigating(true);
    setVisibleEventsCount(0);
    
    const totalEvents = caseData?.timelineEvents?.length || 7;
    for (let i = 1; i <= totalEvents; i++) {
      await new Promise(r => setTimeout(r, 220));
      setVisibleEventsCount(i);
    }
    
    setIsInvestigating(false);
    await onRunInvestigation(caseData.id);
  };

  useEffect(() => {
    if (caseData?.investigationCompleted) {
      setVisibleEventsCount(caseData.timelineEvents.length);
    }
  }, [caseData]);

  if (!caseData) return null;

  const isRefundDone = caseData.refundInitiated;
  const isEscalated = caseData.escalatedToHuman || caseData.status === 'ESCALATED';
  const isResolved = caseData.status === 'RESOLVED';
  const hasInvestigationRun = caseData.investigationCompleted || visibleEventsCount > 0;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150 pb-16">
      {/* Workspace Top Header Bar */}
      <div className="bg-slate-900 text-white p-5 rounded-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-md bg-indigo-600 flex items-center justify-center font-mono font-black text-sm text-white shadow-xs">
            4821
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-lg font-bold text-white tracking-tight">CASE #{caseData.id.replace('#', '')}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                HIGH PRIORITY
              </span>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                isResolved ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                isEscalated ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 animate-pulse'
              }`}>
                {caseData.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Customer: <span className="font-semibold text-white">{caseData.customerName}</span> ({caseData.customerId}) • Multi-Issue Autonomous Investigation Workflow
            </p>
          </div>
        </div>

        {/* Status Actions header indicator */}
        <div className="flex items-center space-x-3">
          {isEscalated && !isResolved && (
            <button
              onClick={onNavigateEscalations}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-semibold shadow-xs cursor-pointer transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>View Human Agent View (Priya Sharma)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
          {isResolved && (
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>CASE RESOLVED</span>
            </div>
          )}
        </div>
      </div>

      {/* THREE-COLUMN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Case Information (3 Cols) */}
        <div className="lg:col-span-3 space-y-5">
          {/* Case Metadata Panel */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200">
              Case Metadata
            </h3>

            <div>
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Customer Profile</span>
              <div className="text-xs font-bold text-slate-900">{caseData.customerName}</div>
              <div className="text-[11px] font-mono text-slate-500">ID: {caseData.customerId}</div>
            </div>

            <div>
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Urgency Level</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                HIGH URGENCY
              </span>
            </div>

            <div>
              <span className="text-[11px] font-medium text-slate-400 block mb-1.5">Detected Intents</span>
              <div className="space-y-1.5">
                {caseData.detectedIntents.map(intent => (
                  <div key={intent.id} className="flex items-center justify-between px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-[11px] font-semibold text-slate-700">
                    <span>{intent.label}</span>
                    <span className="text-[9px] font-mono uppercase text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded">
                      {intent.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 space-y-1 font-mono">
              <div className="flex justify-between">
                <span>Created:</span>
                <span className="font-semibold text-slate-700">{caseData.created}</span>
              </div>
              <div className="flex justify-between">
                <span>Owner:</span>
                <span className="font-semibold text-slate-700">{caseData.owner}</span>
              </div>
            </div>
          </div>

          {/* Applicable Policies Panel */}
          <div className="bg-slate-900 text-slate-300 rounded-lg p-4 space-y-3 text-xs border border-slate-800">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold uppercase text-[11px] tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Engine Policies Applied</span>
            </div>
            <ul className="space-y-2 text-[11px] leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">✓ Policy 4.2</span>
                <span>Auto-Refund on Verified Duplicate Charge</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">⚠ Policy 7.1</span>
                <span>Physical Damage Replacement requires Human Approval</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CENTER COLUMN: Main Workflow & Investigation (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Customer Conversation Box */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                Customer Inbound Message
              </span>
              <span className="text-[11px] font-mono text-slate-400">{caseData.timestamp}</span>
            </div>
            <div className="p-5">
              <blockquote className="text-sm font-medium text-slate-900 bg-indigo-50/40 p-4 rounded-md border-l-4 border-indigo-600 leading-relaxed italic">
                "{caseData.customerMessage}"
              </blockquote>
            </div>
          </div>

          {/* AI INVESTIGATION SECTION */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  AI Autonomous Investigation
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded">
                REAL-TIME AUDIT LOGS
              </span>
            </div>

            <div className="p-5 space-y-4">
              {!hasInvestigationRun ? (
                <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300 space-y-3">
                  <p className="text-xs text-slate-600 font-medium">
                    Autonomous investigation pending execution. Click below to begin cross-referencing enterprise logs.
                  </p>
                  <button
                    onClick={handleStartInvestigation}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-bold shadow-xs cursor-pointer transition-colors"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Run Autonomous AI Investigation</span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                    <span className="font-semibold text-slate-700">Investigation Event Sequence</span>
                    {isInvestigating ? (
                      <span className="text-indigo-600 font-mono text-[11px] flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        Running engine...
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-semibold text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Investigation Completed
                      </span>
                    )}
                  </div>

                  {/* Sequential Timeline Events */}
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {caseData.timelineEvents.slice(0, visibleEventsCount).map((evt, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-start space-x-3 p-2.5 rounded-md text-xs border transition-all animate-in fade-in slide-in-from-left-2 duration-200 ${
                          evt.isDemoAction
                            ? 'bg-amber-50 border-amber-200 text-amber-900 font-semibold'
                            : 'bg-slate-50 border-slate-200/80 text-slate-800'
                        }`}
                      >
                        <span className="font-mono text-[11px] text-slate-400 font-bold shrink-0 pt-0.5">
                          {evt.time}
                        </span>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                            <CheckCircle2 className={`w-3.5 h-3.5 ${evt.isDemoAction ? 'text-amber-600' : 'text-emerald-600'}`} />
                            <span>{evt.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{evt.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* AUDITABLE INVESTIGATION FINDINGS (EVIDENCE CARDS) */}
          {hasInvestigationRun && (
            <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden animate-in fade-in duration-200">
              <div className="px-5 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Auditable Investigation Findings & Evidence
                </h3>
              </div>
              <div className="p-5 space-y-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                  <span className="font-bold text-slate-900 block">Payment Audit:</span>
                  <p className="text-slate-700 font-mono text-[11px]">{caseData.evidence.payment}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                  <span className="font-bold text-slate-900 block">Delivery Audit:</span>
                  <p className="text-slate-700 font-mono text-[11px]">{caseData.evidence.delivery}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-1">
                  <span className="font-bold text-slate-900 block">Complaint Verification:</span>
                  <p className="text-slate-700 font-mono text-[11px]">{caseData.evidence.complaint}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded">
                    <span className="font-bold text-emerald-900 block">Refund Policy:</span>
                    <p className="text-[11px] text-emerald-800 font-mono">{caseData.evidence.policyRefund}</p>
                  </div>
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded">
                    <span className="font-bold text-amber-900 block">Replacement Policy:</span>
                    <p className="text-[11px] text-amber-900 font-mono">{caseData.evidence.policyReplacement}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PREMIUM QWEN REASONING PANEL */}
          {hasInvestigationRun && (
            <div className="bg-slate-900 text-white rounded-lg border border-slate-800 shadow-md overflow-hidden animate-in fade-in duration-200">
              <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    QWEN REASONING PANEL
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded">
                  {caseData.qwenAnalysis.mode}
                </span>
              </div>

              <div className="p-5 space-y-4 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400 font-medium">Engine Role:</span>
                  <span className="font-semibold text-indigo-300 font-mono">{caseData.qwenAnalysis.role}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block mb-1">Extracted Intent:</span>
                  <div className="font-semibold text-white bg-slate-800/80 p-2.5 rounded border border-slate-700/60">
                    {caseData.qwenAnalysis.intent}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block mb-1">Root Cause Analysis:</span>
                  <p className="text-slate-300 leading-relaxed bg-slate-800/50 p-2.5 rounded border border-slate-700/40">
                    {caseData.qwenAnalysis.rootCause}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block mb-1">Recommended Resolution Plan:</span>
                  <div className="space-y-1.5">
                    {caseData.qwenAnalysis.recommendedResolution.map((rec, i) => (
                      <div key={i} className="p-2 rounded bg-indigo-950/60 border border-indigo-800/50 text-indigo-200 font-medium text-[11px]">
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
                  <span className="text-slate-400">Decision Confidence:</span>
                  <span className="font-bold text-emerald-400 font-mono">{caseData.qwenAnalysis.confidence}</span>
                </div>
              </div>
            </div>
          )}

          {/* RESOLUTION DECISION & ACTIONS (CARD 1 & CARD 2) */}
          {hasInvestigationRun && (
            <div className="bg-white rounded-lg border-2 border-indigo-600 shadow-md p-6 space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 tracking-tight uppercase flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-indigo-600" />
                  RESOLUTION DECISION & ACTIONS
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 font-mono">Dual Action Workflow</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CARD 1: Duplicate Payment Refund */}
                <div className="p-4 rounded-md border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">CARD 1: Duplicate Payment Refund</span>
                    {isRefundDone ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">INITIATED</span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">SAFE TO AUTOMATE</span>
                    )}
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1 font-mono">
                    <li>✓ Policy 4.2 eligible</li>
                    <li>✓ Transaction TX-8832 verified</li>
                  </ul>
                  <button
                    onClick={onInitiateRefund}
                    disabled={isRefundDone}
                    className={`w-full py-2 px-3 rounded text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      isRefundDone 
                        ? 'bg-emerald-600 text-white cursor-default' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                    }`}
                  >
                    {isRefundDone ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Refund Workflow Initiated</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>INITIATE REFUND (₹4,999)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* CARD 2: Replacement Request */}
                <div className="p-4 rounded-md border border-amber-200 bg-amber-50/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-amber-950">CARD 2: Replacement Request</span>
                    {isEscalated ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-100 text-purple-800 rounded">ESCALATED</span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">REQUIRES APPROVAL</span>
                    )}
                  </div>
                  <ul className="text-[11px] text-amber-900 space-y-1 font-mono">
                    <li>⚠ Policy 7.1 Human Gate</li>
                    <li>⚠ Physical damage verification</li>
                  </ul>
                  <button
                    onClick={onEscalateReplacement}
                    disabled={isEscalated}
                    className={`w-full py-2 px-3 rounded text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      isEscalated 
                        ? 'bg-purple-700 text-white cursor-default' 
                        : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                    }`}
                  >
                    {isEscalated ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Escalated to Priya Sharma</span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>ESCALATE REPLACEMENT</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Customer 360 Context (3 Cols) */}
        <div className="lg:col-span-3 space-y-5">
          {/* Customer Profile Panel */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200 flex items-center justify-between">
              <span>Customer 360</span>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">VERIFIED</span>
            </h3>

            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900">Arjun Rao</div>
              <div className="text-xs text-slate-500">arjun.rao@example.com</div>
              <div className="text-[11px] font-mono text-slate-400">Customer ID: {caseData.customerId}</div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Account Standing:</span>
                <span className="font-semibold text-slate-800">Good standing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Lifetime Value:</span>
                <span className="font-mono font-bold text-slate-800">₹34,995</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Risk Score:</span>
                <span className="font-mono text-emerald-600 font-semibold">Low (0.02)</span>
              </div>
            </div>
          </div>

          {/* Order Details Panel */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200 flex items-center justify-between">
              <span>Order Context</span>
              <span className="text-[10px] font-mono text-indigo-600 font-bold">#{caseData.orderId.replace('#', '')}</span>
            </h3>

            <div className="text-xs space-y-2">
              <div>
                <span className="font-bold text-slate-900 block">Sony WH-1000XM5</span>
                <span className="text-[11px] text-slate-400 font-mono">SKU: SONY-WH1000XM5-BLK</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span className="text-slate-500">Order Amount:</span>
                <span className="font-mono font-bold text-slate-900">₹4,999</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Shipment Status:</span>
                <span className="font-semibold text-emerald-600">Delivered</span>
              </div>
              <div className="text-[11px] text-slate-400 pt-1 font-mono">
                Delivered 2026-09-10 via Express Logistics India
              </div>
            </div>
          </div>

          {/* Payment Ledger Panel */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200 flex items-center justify-between">
              <span>Payment Ledger</span>
              <span className="text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">2 TRANSACTIONS</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-0.5">
                <div className="flex justify-between font-mono font-bold text-slate-800">
                  <span>TX-8831</span>
                  <span className="text-emerald-600">₹4,999</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>UPI Payment (HDFC)</span>
                  <span className="font-bold text-emerald-600">SUCCESS</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-amber-50 border border-amber-200 space-y-0.5">
                <div className="flex justify-between font-mono font-bold text-amber-950">
                  <span>TX-8832</span>
                  <span className="text-amber-800">₹4,999</span>
                </div>
                <div className="flex justify-between text-[10px] text-amber-800 font-mono">
                  <span>UPI Payment (HDFC)</span>
                  <span className="font-bold text-amber-700">SUCCESS (DUPLICATE)</span>
                </div>
                <p className="text-[10px] text-amber-700 pt-1 border-t border-amber-200/60 italic">
                  Duplicate charge detected
                </p>
              </div>
            </div>
          </div>

          {/* Support History */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200">
              Support History (2 Cases)
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <div>
                  <span className="font-mono text-indigo-600 font-bold">RV-3128</span>
                  <span className="text-slate-500 block text-[11px]">Address modification</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600">Resolved</span>
              </div>
              <div className="flex justify-between py-1">
                <div>
                  <span className="font-mono text-indigo-600 font-bold">RV-2911</span>
                  <span className="text-slate-500 block text-[11px]">Product inquiry</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500">Closed</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
