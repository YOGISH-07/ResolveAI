import React from 'react';
import { ShieldAlert, User, ChevronRight, CheckCircle2, AlertTriangle, ArrowUpRight } from 'lucide-react';

export default function EscalationsView({ escalations = [], onSelectEscalatedCase }) {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-purple-600" />
            <span>Human Escalations Queue</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cases routed to human operations leads with pre-compiled 360 context packages.
          </p>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-xs text-purple-950 flex items-start space-x-3">
        <AlertTriangle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Human-in-the-Loop Architecture:</span>
          <p className="mt-0.5 text-purple-900">
            ResolveAI conducts full autonomous investigation first. Only items requiring manager policy authorization are routed to human agents with 100% compiled context.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Case</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Reason for Escalation</th>
                <th className="py-3 px-4">AI Recommendation</th>
                <th className="py-3 px-4">Assigned Agent</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {escalations.map((esc, i) => {
                const isTarget = esc.caseId === '#RV-4821';
                return (
                  <tr
                    key={i}
                    onClick={() => onSelectEscalatedCase(esc.caseId)}
                    className={`cursor-pointer transition-colors ${
                      isTarget ? 'bg-purple-50/50 hover:bg-purple-50 font-medium' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-purple-700 whitespace-nowrap">
                      {esc.caseId}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                        {esc.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {esc.customerName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate">
                      {esc.reason}
                    </td>
                    <td className="py-3.5 px-4 text-indigo-700 font-medium max-w-xs truncate">
                      {esc.aiRecommendation}
                    </td>
                    <td className="py-3.5 px-4 text-slate-900 font-semibold whitespace-nowrap">
                      {esc.agent}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {esc.status === 'RESOLVED' ? (
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                          RESOLVED
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800 animate-pulse">
                          PENDING
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-[11px] font-bold inline-flex items-center space-x-1 shadow-2xs">
                        <span>Review Handoff</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
