import React, { useState } from 'react';
import { SearchCode, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { SupportCase } from '../types/index.ts';

interface InvestigationsViewProps {
  cases: SupportCase[];
  onSelectCase: (caseId: string) => void;
}

export default function InvestigationsView({ cases = [], onSelectCase }: InvestigationsViewProps) {
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>('RV-4821');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <SearchCode className="w-5 h-5 text-indigo-600" />
            <span>Autonomous AI Investigation Logs</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete auditable event sequences compiled by ResolveAI for all customer cases.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {cases.map((c) => {
          const isExpanded = expandedCaseId === c.id || expandedCaseId === `#${c.id}`;
          return (
            <div 
              key={c.id}
              className={`bg-white rounded-lg border transition-all overflow-hidden ${
                c.id.includes('4821') ? 'border-indigo-300 shadow-2xs' : 'border-slate-200'
              }`}
            >
              {/* Case Bar */}
              <div 
                onClick={() => setExpandedCaseId(isExpanded ? null : c.id)}
                className="p-4 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between cursor-pointer border-b border-slate-200"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-bold text-xs text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
                    #{c.id.replace('#', '')}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-900">{c.customerName}</span>
                    <span className="text-xs text-slate-400 mx-2">•</span>
                    <span className="text-xs text-slate-600">{c.intentsSummary}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    c.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' :
                    c.status === 'ESCALATED' ? 'bg-purple-100 text-purple-800' :
                    'bg-indigo-100 text-indigo-800'
                  }`}>
                    {c.status}
                  </span>
                  <button className="text-slate-400 hover:text-slate-600 cursor-pointer">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable Investigation Timeline */}
              {isExpanded && (
                <div className="p-6 space-y-4 bg-white">
                  <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
                    <span className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Auditable Timeline Events
                    </span>
                    <button
                      onClick={() => onSelectCase(c.id)}
                      className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                    >
                      Open Full Case Workspace &rarr;
                    </button>
                  </div>

                  <div className="space-y-2">
                    {c.timelineEvents?.map((evt, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-2.5 bg-slate-50 border border-slate-200/60 rounded text-xs">
                        <span className="font-mono text-[11px] font-bold text-slate-400 pt-0.5">{evt.time}</span>
                        <div>
                          <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{evt.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{evt.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {c.evidence && (
                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Compiled Findings Summary
                      </span>
                      <p className="text-xs text-slate-700 bg-indigo-50/50 border border-indigo-100 p-3 rounded font-mono">
                        {c.evidence.payment} {c.evidence.delivery}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
