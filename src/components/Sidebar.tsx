import React from 'react';
import { 
  LayoutDashboard, 
  Inbox, 
  SearchCode, 
  Users, 
  ShoppingBag, 
  ShieldAlert, 
  BarChart3, 
  Cpu, 
  Activity, 
  CheckCircle2 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  counts?: {
    open?: number;
    escalated?: number;
  };
}

export default function Sidebar({ activeTab, setActiveTab, counts = {} }: SidebarProps) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null, highlight: false },
    { id: 'inbox', label: 'Inbox', icon: Inbox, badge: counts.open ?? 5, highlight: false },
    { id: 'investigations', label: 'Investigations', icon: SearchCode, badge: null, highlight: false },
    { id: 'escalations', label: 'Escalations', icon: ShieldAlert, badge: counts.escalated ?? 1, highlight: true },
    { id: 'customers', label: 'Customers', icon: Users, badge: null, highlight: false },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: null, highlight: false },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null, highlight: false },
    { id: 'architecture', label: 'System / Architecture', icon: Cpu, badge: null, highlight: false },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen border-r border-slate-800 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black tracking-wider text-base shadow-xs">
            R
          </div>
          <div>
            <h1 className="font-bold text-white text-base tracking-tight leading-none">RESOLVEAI</h1>
            <p className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold mt-1">Autonomous Ops</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800/60 rounded">
          v2.6
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Support Operations
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== null && item.badge !== undefined && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-semibold ${
                  isActive
                    ? 'bg-indigo-700 text-white'
                    : item.highlight && item.badge > 0
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info & System Status */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Environment</span>
          <span className="text-[11px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60 font-mono">
            DEMO ENVIRONMENT
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            System Status
          </span>
          <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Operational
          </span>
        </div>

        <div className="pt-2 text-[10px] text-slate-500 text-center font-mono border-t border-slate-800/60">
          Build Bengaluru 2026 • Track 2
        </div>
      </div>
    </aside>
  );
}
