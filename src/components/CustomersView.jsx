import React, { useState } from 'react';
import { Users, Search, ShieldCheck, ShoppingBag, Clock } from 'lucide-react';

export default function CustomersView({ customers = [] }) {
  const [selectedCust, setSelectedCust] = useState(customers[0] || null);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <span>Customer Directory & 360 Context</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Enterprise customer profiles, historical spend ledger, and trust/risk scoring.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Customer Directory Table */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
            Verified Customer Database
          </div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] text-slate-500 uppercase">
                <th className="py-2.5 px-4">Name</th>
                <th className="py-2.5 px-4">Since</th>
                <th className="py-2.5 px-4">Standing</th>
                <th className="py-2.5 px-4">Total Spend</th>
                <th className="py-2.5 px-4">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {customers.map((cust) => (
                <tr
                  key={cust.id}
                  onClick={() => setSelectedCust(cust)}
                  className={`cursor-pointer transition-colors ${
                    selectedCust?.id === cust.id ? 'bg-indigo-50/70 font-semibold' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3 px-4 text-slate-900 font-bold">
                    {cust.name}
                    <span className="block text-[10px] font-mono font-normal text-slate-400">{cust.id}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-mono">{cust.since}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {cust.standing}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{cust.totalSpent}</td>
                  <td className="py-3 px-4 font-mono text-emerald-600 font-bold">{cust.riskScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Customer 360 Detail View */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 p-6 shadow-2xs space-y-5">
          {selectedCust ? (
            <>
              <div className="border-b border-slate-200 pb-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{selectedCust.name}</h3>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    {selectedCust.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">{selectedCust.email} • {selectedCust.phone}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Total Orders</span>
                  <span className="text-sm font-mono font-bold text-slate-900">{selectedCust.totalOrders}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <span className="text-slate-500 text-[11px] block">Lifetime Value</span>
                  <span className="text-sm font-mono font-bold text-slate-900">{selectedCust.totalSpent}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider block">
                  Support Case History
                </span>
                {selectedCust.previousCases?.length > 0 ? (
                  <div className="space-y-2">
                    {selectedCust.previousCases.map((c, i) => (
                      <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs flex justify-between">
                        <div>
                          <span className="font-mono font-bold text-indigo-600">{c.id}</span>
                          <span className="block text-slate-600 text-[11px]">{c.issue}</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 font-mono">{c.status}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No previous support cases recorded.</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-xs text-slate-400">Select a customer from the directory to inspect profile.</p>
          )}
        </div>
      </div>
    </div>
  );
}
