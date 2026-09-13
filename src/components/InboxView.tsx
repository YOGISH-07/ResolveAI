import React, { useState } from 'react';
import { Search, ChevronRight, Inbox as InboxIcon } from 'lucide-react';
import { SupportCase } from '../types/index.ts';

interface InboxViewProps {
  cases: SupportCase[];
  onSelectCase: (caseId: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function InboxView({ cases = [], onSelectCase, searchQuery, setSearchQuery }: InboxViewProps) {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filterTabs = [
    { id: 'ALL', label: 'All Cases' },
    { id: 'NEW', label: 'New' },
    { id: 'INVESTIGATING', label: 'Investigating' },
    { id: 'WAITING', label: 'Waiting' },
    { id: 'ESCALATED', label: 'Escalated' },
    { id: 'RESOLVED', label: 'Resolved' },
  ];

  const filteredCases = cases.filter(c => {
    const matchesFilter = filterStatus === 'ALL' || c.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      c.id.toLowerCase().includes(q) || 
      c.customerName.toLowerCase().includes(q) || 
      c.intentsSummary.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">New</span>;
      case 'INVESTIGATING':
        return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 animate-pulse">Investigating</span>;
      case 'WAITING':
        return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">Waiting</span>;
      case 'ESCALATED':
        return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">Escalated</span>;
      case 'RESOLVED':
        return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Resolved</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
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
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <InboxIcon className="w-5 h-5 text-indigo-600" />
            <span>Support Inbox</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time incoming customer cases with intent extraction and status workflow.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Showing {filteredCases.length} of {cases.length} total cases
        </div>
      </div>

      {/* Controls Bar: Filters & Search */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                filterStatus === tab.id
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter inbox..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Enterprise Cases Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Case</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Issue / Intent</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4">Assigned Agent/AI</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filteredCases.map(c => {
                const isTargetCase = c.id === 'RV-4821' || c.id === '#RV-4821';
                return (
                  <tr
                    key={c.id}
                    onClick={() => onSelectCase(c.id)}
                    className={`cursor-pointer transition-colors ${
                      isTargetCase
                        ? 'bg-indigo-50/50 hover:bg-indigo-50 font-medium'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        <span>#{c.id.replace('#', '')}</span>
                        {isTargetCase && (
                          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {c.customerName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {c.intentsSummary}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getPriorityBadge(c.priority)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(c.status)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono whitespace-nowrap">
                      {c.created}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-semibold whitespace-nowrap">
                      {c.owner}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button className="px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[11px] font-semibold text-indigo-700 inline-flex items-center space-x-1 shadow-2xs cursor-pointer">
                        <span>Inspect Case</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No cases match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
