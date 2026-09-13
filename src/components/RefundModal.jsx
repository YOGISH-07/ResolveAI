import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, RefreshCw, X } from 'lucide-react';

export default function RefundModal({ isOpen, onClose, onConfirm, caseData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await onConfirm();
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              ₹
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">REFUND WORKFLOW</h3>
              <p className="text-[10px] text-slate-400 font-mono">SAFE AUTOMATED DEMO ACTION</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start space-x-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800">
              <span className="font-bold">DEMO ACTION — NO REAL TRANSACTION</span>
              <p className="mt-0.5 text-amber-700">
                This executes a mock financial ledger transaction entry for hackathon presentation purposes.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-md p-4 space-y-3 font-sans text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200/80">
              <span className="text-slate-500">Target Order:</span>
              <span className="font-mono font-bold text-slate-800">#RV-4821</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/80">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="font-mono font-bold text-slate-800">TX-8832 (Duplicate)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/80">
              <span className="text-slate-500">Refund Amount:</span>
              <span className="font-mono font-bold text-emerald-600 text-sm">₹4,999</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/80">
              <span className="text-slate-500">Primary Reason:</span>
              <span className="font-semibold text-slate-800">Duplicate payment</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Policy Match:</span>
              <span className="font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Eligible (§4.2 Auto-Refund)
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 leading-relaxed bg-indigo-50/50 border border-indigo-100 rounded p-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 inline mr-1" />
            Upon confirmation, transaction status updates to <span className="font-semibold text-slate-700">Refund Requested</span> and audit logs are recorded.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-md text-xs font-semibold border border-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-md text-xs font-semibold flex items-center space-x-2 shadow-xs transition-colors"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Confirm Demo Refund</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
