import React from 'react';
import { 
  Inbox, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowUpRight, 
  Clock, 
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';

export default function OverviewView({ cases = [], onSelectCase, onNavigateInbox }) {
  const openCasesCount = cases.filter(c => c.status !== 'RESOLVED').length;
  const needsAttentionCount = cases.filter(c => c.priority === 'HIGH' && c.status !== 'RESOLVED').length;
  const resolvedCount = 111 + cases.filter(c => c.status === 'RESOLVED').length;
  const escalationsCount = cases.filter(c => c.escalatedToHuman || c.status === 'ESCALATED').length;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">New</span>;
      case 'INVESTIGATING':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 animate-pulse">Investigating</span>;
      case 'WAITING':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">Waiting</span>;
      case 'ESCALATED':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">Escalated</span>;
      case 'RESOLVED':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Resolved</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">MEDIUM</span>;
      case 'LOW':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">LOW</span>;
      default:
        return priority;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Support Operations Overview</h1>
            <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded">
              DEMO ENVIRONMENT
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time autonomous investigation status, priority queue, and escalation monitoring.
          </p>
        </div>
        <button
          onClick={onNavigateInbox}
          className="flex items-center space-x-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors self-start"
        >
          <Inbox className="w-4 h-4" />
          <span>View Full Support Inbox</span>
        </button>
      </div>

      {/* KPI Operational Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Open Cases</span>
            <Inbox className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{openCasesCount}</div>
          <div className="text-[11px] text-slate-500 font-mono">Derived from active queue</div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Needs Attention</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600 tracking-tight">{needsAttentionCount}</div>
          <div className="text-[11px] text-amber-700 font-medium">Requires priority action</div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>AI Resolved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 tracking-tight">{resolvedCount}</div>
          <div className="text-[11px] text-slate-500 font-mono">Autonomous resolutions</div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Human Escalations</span>
            <ShieldAlert className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-700 tracking-tight">{escalationsCount}</div>
          <div className="text-[11px] text-slate-500 font-mono">Manager sign-offs</div>
        </div>
      </div>

      {/* Priority Queue Section */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Priority Operational Queue</span>
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any case below to inspect the multi-issue investigation workspace.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Sorted by Urgency & AI Confidence
          </span>
        </div>

        <div className="divide-y divide-slate-200">
          {cases.map((c) => {
            const isTargetCase = c.id === '#RV-4821';
            return (
              <div
                key={c.id}
                onClick={() => onSelectCase(c.id)}
                className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer transition-all duration-150 ${
                  isTargetCase 
                    ? 'bg-indigo-50/40 hover:bg-indigo-50/80 border-l-4 border-indigo-600' 
                    : 'hover:bg-slate-50 border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-9 h-9 rounded flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                    isTargetCase ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {c.id.replace('#', '')}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <span className="text-sm font-bold text-slate-900">{c.id}</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-semibold text-slate-700">{c.customerName}</span>
                      {getPriorityBadge(c.priority)}
                      {getStatusBadge(c.status)}
                      {isTargetCase && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-400 text-slate-950 rounded shadow-2xs font-mono">
                          PRIMARY DEMO CASE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      {c.intentsSummary}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 italic">
                      "{c.customerMessage}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end space-x-4 shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-slate-500 font-mono flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {c.created}
                    </div>
                    <div className="text-[11px] font-medium text-slate-400 mt-0.5">
                      Assigned: <span className="text-slate-700 font-semibold">{c.owner}</span>
                    </div>
                  </div>
                  <button className={`p-2 rounded-md transition-colors ${
                    isTargetCase ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
