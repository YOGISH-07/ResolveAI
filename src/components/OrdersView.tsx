import React from 'react';
import { ShoppingBag, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Order, Payment } from '../types/index.ts';

interface OrdersViewProps {
  orders: Order[];
  payments: Payment[];
}

export default function OrdersView({ orders = [], payments = [] }: OrdersViewProps) {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-150">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-indigo-600" />
          <span>Orders & Financial Transaction Ledger</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Synchronized ERP order logs and gateway payment receipts.
        </p>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden space-y-2">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider flex justify-between">
          <span>Order Management Database</span>
          <span className="font-mono text-slate-400">Total {orders.length} Records</span>
        </div>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] text-slate-500 uppercase">
              <th className="py-2.5 px-4">Order ID</th>
              <th className="py-2.5 px-4">Customer</th>
              <th className="py-2.5 px-4">Item Details</th>
              <th className="py-2.5 px-4">Amount</th>
              <th className="py-2.5 px-4">Status</th>
              <th className="py-2.5 px-4">Carrier & Tracking</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.map((ord) => (
              <tr key={ord.id} className={`hover:bg-slate-50 ${ord.id.includes('4821') ? 'bg-indigo-50/40' : ''}`}>
                <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">#{ord.id.replace('#', '')}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-900">{ord.customerName}</td>
                <td className="py-3.5 px-4 text-slate-700">
                  <span className="font-medium block">{ord.product}</span>
                  <span className="text-[10px] font-mono text-slate-400">SKU: {ord.sku}</span>
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{ord.formattedAmount}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {ord.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                  {ord.carrier} ({ord.trackingId})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Ledger Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden space-y-2">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider flex justify-between">
          <span>Payment Gateway Audit Receipts</span>
          <span className="text-red-600 font-mono font-bold">Duplicate Detection Active</span>
        </div>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] text-slate-500 uppercase">
              <th className="py-2.5 px-4">Tx ID</th>
              <th className="py-2.5 px-4">Order Ref</th>
              <th className="py-2.5 px-4">Amount</th>
              <th className="py-2.5 px-4">Method</th>
              <th className="py-2.5 px-4">Timestamp</th>
              <th className="py-2.5 px-4">Ledger Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {payments.map((tx) => (
              <tr key={tx.id} className={tx.isDuplicate ? 'bg-amber-50/80 font-medium' : 'hover:bg-slate-50'}>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">{tx.id}</td>
                <td className="py-3 px-4 font-mono font-bold text-indigo-600">#{tx.orderId.replace('#', '')}</td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">{tx.amount}</td>
                <td className="py-3 px-4 text-slate-700">{tx.method}</td>
                <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{tx.timestamp}</td>
                <td className="py-3 px-4">
                  {tx.isDuplicate ? (
                    <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      Duplicate Charge Detected
                    </span>
                  ) : (
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified Single Charge
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
