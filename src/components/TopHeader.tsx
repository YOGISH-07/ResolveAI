import React from 'react';
import { Search, RotateCcw, Play, ShieldCheck } from 'lucide-react';

interface TopHeaderProps {
  onSearch: (q: string) => void;
  searchQuery: string;
  onResetDemo: () => void;
  onStartDemoTour: () => void;
  demoStep: number | null;
  activeTab: string;
}

export default function TopHeader({ 
  onSearch, 
  searchQuery, 
  onResetDemo, 
  onStartDemoTour, 
  demoStep,
  activeTab
}: TopHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-xs select-none shrink-0">
      {/* Search Bar */}
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search cases, customers (#RV-4821, Arjun Rao)..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Top Controls & Demo Tools */}
      <div className="flex items-center space-x-3">
        {/* Guided 3-Min Hackathon Demo Button */}
        <button
          onClick={onStartDemoTour}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${
            demoStep !== null 
              ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-xs animate-pulse' 
              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{demoStep !== null ? `Demo Step ${demoStep + 1}/7` : '3-Min Hackathon Demo'}</span>
        </button>

        {/* Reset Demo State Button */}
        <button
          onClick={onResetDemo}
          title="Reset demo data to initial state"
          className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-medium border border-slate-200 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset Demo</span>
        </button>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* User Context */}
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            PS
          </div>
          <div className="text-left hidden md:block">
            <div className="text-xs font-semibold text-slate-800 leading-tight">Priya Sharma</div>
            <div className="text-[10px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-indigo-600 inline" />
              Senior Support Agent
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
