import React from 'react';
import { BarChart3, PieChart, TrendingUp, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AnalyticsView({ analyticsData }) {
  if (!analyticsData) return null;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span>Operational Analytics & Metrics</span>
            </h1>
            <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded">
              {analyticsData.disclaimer}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            System breakdown of autonomous investigation speed, category distributions, and human escalation rates.
          </p>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Total Cases Processed</span>
          <div className="text-2xl font-bold text-slate-900 font-mono">{analyticsData.kpis.totalCases}</div>
          <span className="text-[11px] text-slate-400 font-mono">Sample dataset</span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">AI Autonomous Resolution</span>
          <div className="text-2xl font-bold text-emerald-600 font-mono">{analyticsData.kpis.aiSuccessRate}</div>
          <span className="text-[11px] text-emerald-700 font-medium">Safe policy match</span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Avg AI Investigation Time</span>
          <div className="text-2xl font-bold text-indigo-600 font-mono">{analyticsData.kpis.avgResolutionTime}</div>
          <span className="text-[11px] text-slate-400 font-mono">Log compilation speed</span>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Human Escalations</span>
          <div className="text-2xl font-bold text-purple-700 font-mono">{analyticsData.kpis.humanEscalations}</div>
          <span className="text-[11px] text-slate-400 font-mono">Policy gate transfers</span>
        </div>
      </div>

      {/* Visual Distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight uppercase flex items-center justify-between border-b border-slate-200 pb-2">
            <span>Cases by Support Category</span>
            <span className="text-[11px] font-mono text-slate-400 font-normal">Dataset Distribution</span>
          </h3>

          <div className="space-y-3">
            {analyticsData.categoryDistribution.map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-800">{cat.category}</span>
                  <span className="font-mono text-slate-600">{cat.count} cases ({cat.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution Paths */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight uppercase flex items-center justify-between border-b border-slate-200 pb-2">
            <span>Resolution Path Breakdown</span>
            <span className="text-[11px] font-mono text-slate-400 font-normal">Execution Topology</span>
          </h3>

          <div className="space-y-4">
            {analyticsData.resolutionPaths.map((path, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-1.5">
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>{path.path}</span>
                  <span className="font-mono font-bold text-indigo-600">{path.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${path.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
