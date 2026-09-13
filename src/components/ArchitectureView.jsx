import React from 'react';
import { Cpu, ArrowRight, ShieldCheck, Zap, GitBranch, Layers, CheckCircle2, Server, Database } from 'lucide-react';

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

      {/* CRITICAL UX REQUIREMENT COMPARISON */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-indigo-600" />
          Workflow Paradigm Shift: Traditional Bot vs ResolveAI Platform
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Traditional Bot Box */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs space-y-4 opacity-70">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-xs text-slate-500 uppercase tracking-wider">Traditional Chatbot</span>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Superficial QA</span>
            </div>
            
            <div className="flex items-center space-x-3 text-xs font-mono text-slate-700 bg-slate-50 p-4 rounded border border-slate-200">
              <span className="font-bold text-slate-900">Question</span>
              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-bold text-red-600">Static Answer / Script</span>
            </div>
            <p className="text-xs text-slate-500 italic">
              Cannot investigate backend ERP, verify double charges, or handle multi-issue customer claims safely.
            </p>
          </div>

          {/* ResolveAI Workflow Box */}
          <div className="bg-slate-900 text-white p-6 rounded-lg border-2 border-indigo-500 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-xs text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                ResolveAI Autonomous Workflow
              </span>
              <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded">
                Autonomous Ops
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
              <span className="px-2 py-1 bg-slate-800 rounded text-slate-200 font-bold">Question</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="px-2 py-1 bg-slate-800 rounded text-indigo-300 font-bold">Intent</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="px-2 py-1 bg-slate-800 rounded text-indigo-300 font-bold">Context</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="px-2 py-1 bg-indigo-900 text-white font-bold border border-indigo-700">Investigation</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="px-2 py-1 bg-slate-800 rounded text-indigo-300 font-bold">Evidence</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="px-2 py-1 bg-amber-500 text-slate-950 font-bold">Reasoning</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="px-2 py-1 bg-emerald-600 text-white font-bold">Safe Action / Human Handoff</span>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="px-2 py-1 bg-emerald-500 text-slate-950 font-bold">Resolution</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              End-to-end evidence compilation, policy matching, and dual execution (safe automated action + context-rich human escalation).
            </p>
          </div>

        </div>
      </div>

      {/* TECH STACK ARCHITECTURE CARDS */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          Enterprise Stack Components
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-xs">
          
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Qwen Engine</h3>
            <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Reasoning Engine</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Extracts multi-issue intents, determines root cause, and formulates auditable resolution plans.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">EnterPro</h3>
            <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">Orchestration Layer</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Enforces enterprise policy safety gates, triggers API actions, and routes human handoffs with full context packages.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
              <Server className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">React + Vite</h3>
            <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">Enterprise Frontend</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              High-density support operations console built with clean typography, restrained indigo accents, and dark navy sidebar.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Node.js / Express</h3>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">REST API & Store</span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Maintains state for customers, orders, payment receipts, investigation logs, and human escalation queues.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
