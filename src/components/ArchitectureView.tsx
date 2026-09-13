import React from 'react';
import { Cpu, ArrowRight, ShieldCheck, Zap, GitBranch, Layers, Server, Database } from 'lucide-react';

export default function ArchitectureView() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-150 pb-20">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-600" />
          <span>System & Enterprise Architecture Blueprint</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Conceptual integration layer showcasing Qwen Reasoning Engine, EnterPro Orchestration, and Autonomous Resolution Workflows.
        </p>
      </div>

      {/* CORE WORKFLOW ARCHITECTURE FLOW */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-indigo-600" />
          ResolveAI End-to-End Execution Flow
        </h2>

        <div className="bg-slate-900 text-white p-6 rounded-lg border-2 border-indigo-500 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-bold text-xs text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Autonomous Resolution Pipeline
            </span>
            <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded">
              EnterPro & Qwen Enabled
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
            <div className="px-3 py-2 bg-slate-800 rounded text-slate-200 font-bold border border-slate-700">
              Customer Issue
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />

            <div className="px-3 py-2 bg-slate-800 rounded text-indigo-300 font-bold border border-slate-700">
              Intent & Urgency Detection
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />

            <div className="px-3 py-2 bg-slate-800 rounded text-indigo-300 font-bold border border-slate-700">
              Context Retrieval
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />

            <div className="px-3 py-2 bg-indigo-900 text-white font-bold border border-indigo-700">
              Multi-Source Investigation
            </div>
            <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />

            <div className="px-3 py-2 bg-amber-500 text-slate-950 font-bold">
              Qwen Reasoning Engine
            </div>
          </div>

          <div className="flex flex-col items-center justify-center my-2">
            <div className="text-xs font-mono text-indigo-300 font-bold mb-2">Resolution Decision</div>
            <div className="flex justify-between w-full max-w-2xl text-[11px] font-mono gap-4">
              <div className="flex-1 p-3 bg-emerald-950/80 border border-emerald-700/80 rounded text-emerald-200 text-center">
                <span className="font-bold block text-emerald-400">Automated Action</span>
                Safe auto-refund TX-8832 (Policy 4.2)
              </div>
              <div className="flex-1 p-3 bg-purple-950/80 border border-purple-700/80 rounded text-purple-200 text-center">
                <span className="font-bold block text-purple-300">Human Escalation with Context</span>
                Replacement gate sign-off (Policy 7.1)
              </div>
            </div>
          </div>

          <div className="text-center pt-2 border-t border-slate-800">
            <span className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded font-mono inline-block">
              Case Resolution & Autonomous Learning Feedback Loop
            </span>
          </div>
        </div>
      </div>

      {/* TECH STACK ARCHITECTURE CARDS */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          Layered Enterprise Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-xs">
          
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">AI Reasoning Layer</h3>
            <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Qwen Engine Interface</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Extracts multi-issue intents, determines root cause, and formulates auditable resolution plans.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Orchestration Layer</h3>
            <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">EnterPro Architecture</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Enforces policy gates (Policy 4.2 / 7.1), triggers automated actions, and routes human handoffs with full context packages.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
              <Server className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Frontend Layer</h3>
            <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">React + TypeScript + Vite</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Desktop-first enterprise console with dark navy sidebar, white workspace, restrained indigo accents, and 3-column hero layout.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Data Layer</h3>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Node.js + Postgres Ready</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              REST API backend maintaining state for customers, orders, payment receipts, policy rules, and escalation context packages.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
