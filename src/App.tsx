import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.tsx';
import TopHeader from './components/TopHeader.tsx';
import GuidedDemoBar from './components/GuidedDemoBar.tsx';
import RefundModal from './components/RefundModal.tsx';

import OverviewView from './components/OverviewView.tsx';
import InboxView from './components/InboxView.tsx';
import CaseWorkspaceView from './components/CaseWorkspaceView.tsx';
import HumanAgentEscalationView from './components/HumanAgentEscalationView.tsx';
import InvestigationsView from './components/InvestigationsView.tsx';
import EscalationsView from './components/EscalationsView.tsx';
import CustomersView from './components/CustomersView.tsx';
import OrdersView from './components/OrdersView.tsx';
import AnalyticsView from './components/AnalyticsView.tsx';
import ArchitectureView from './components/ArchitectureView.tsx';

import { SupportCase, Customer, Order, Payment, EscalationPackage } from './types/index.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('RV-4821');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [demoStep, setDemoStep] = useState<number | null>(null);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState<boolean>(false);

  // Data States
  const [cases, setCases] = useState<SupportCase[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [escalations, setEscalations] = useState<EscalationPackage[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch initial data from REST API backend
  const loadAppData = async () => {
    try {
      setLoading(true);
      const [casesRes, custRes, ordRes, escRes, anaRes] = await Promise.all([
        fetch('/api/cases').then(r => r.json()),
        fetch('/api/customers').then(r => r.json()),
        fetch('/api/orders').then(r => r.json()),
        fetch('/api/escalations').then(r => r.json()),
        fetch('/api/analytics').then(r => r.json()),
      ]);

      if (casesRes.success) setCases(casesRes.data);
      if (custRes.success) setCustomers(custRes.data);
      if (ordRes.success) setOrders(ordRes.data);
      if (escRes.success) setEscalations(escRes.data);
      if (anaRes.success) setAnalytics(anaRes.data);
    } catch (err) {
      console.warn('API unavailable during load, loading fallback store:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppData();
  }, []);

  // Action Handlers
  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setActiveTab('case-workspace');
  };

  const handleRunInvestigation = async (caseId: string) => {
    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(caseId)}/investigate`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setCases(prev => prev.map(c => c.id === caseId ? data.data : c));
      }
    } catch (e) {
      console.error('Failed to run investigation:', e);
    }
  };

  const handleInitiateRefundConfirm = async () => {
    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(selectedCaseId)}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId: 'TX-8832' })
      });
      const data = await res.json();
      if (data.success) {
        setCases(prev => prev.map(c => c.id === selectedCaseId ? data.data : c));
      }
    } catch (e) {
      console.error('Failed refund action:', e);
    }
  };

  const handleEscalateReplacement = async () => {
    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(selectedCaseId)}/escalate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'Replacement requires human approval under Escalation Matrix Policy 7.1' })
      });
      const data = await res.json();
      if (data.success) {
        setCases(prev => prev.map(c => c.id === selectedCaseId ? data.data : c));
        const escRes = await fetch('/api/escalations').then(r => r.json());
        if (escRes.success) setEscalations(escRes.data);
        setActiveTab('escalation-workspace');
      }
    } catch (e) {
      console.error('Failed escalation action:', e);
    }
  };

  const handleApproveReplacement = async (caseId: string) => {
    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(caseId)}/approve-replacement`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setCases(prev => prev.map(c => c.id === caseId ? data.data : c));
        const escRes = await fetch('/api/escalations').then(r => r.json());
        if (escRes.success) setEscalations(escRes.data);
      }
    } catch (e) {
      console.error('Failed replacement approval:', e);
    }
  };

  const handleResetDemo = async () => {
    try {
      await fetch('/api/cases/reset', { method: 'POST' });
      await loadAppData();
      setSelectedCaseId('RV-4821');
      setActiveTab('overview');
      setDemoStep(null);
    } catch (e) {
      console.error('Failed demo reset:', e);
    }
  };

  // Guided 3-Min Hackathon Demo Navigation Controller
  const handleStartDemoTour = () => {
    setDemoStep(0);
    setActiveTab('inbox');
  };

  const handleNextDemoStep = () => {
    if (demoStep === null) return;
    const next = demoStep + 1;
    setDemoStep(next);

    switch (next) {
      case 1:
        setSelectedCaseId('RV-4821');
        setActiveTab('case-workspace');
        break;
      case 2:
        setActiveTab('case-workspace');
        handleRunInvestigation('RV-4821');
        break;
      case 3:
        setActiveTab('case-workspace');
        break;
      case 4:
        setActiveTab('case-workspace');
        setIsRefundModalOpen(true);
        break;
      case 5:
        setIsRefundModalOpen(false);
        handleEscalateReplacement();
        break;
      case 6:
        setActiveTab('escalation-workspace');
        break;
      default:
        break;
    }
  };

  const handlePrevDemoStep = () => {
    if (demoStep === null || demoStep === 0) return;
    const prev = demoStep - 1;
    setDemoStep(prev);
    if (prev === 0) setActiveTab('inbox');
    else if (prev >= 1 && prev <= 4) setActiveTab('case-workspace');
    else if (prev >= 5) setActiveTab('escalation-workspace');
  };

  const currentCaseObj = cases.find(c => c.id === selectedCaseId || c.id === `#${selectedCaseId}`) || cases[0];

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab: string) => {
          setActiveTab(tab);
          if (tab === 'case-workspace' && !selectedCaseId) {
            setSelectedCaseId('RV-4821');
          }
        }} 
        counts={{
          open: cases.filter(c => c.status !== 'RESOLVED').length,
          escalated: escalations.filter(e => e.status !== 'RESOLVED').length
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Guided Demo Step Bar Banner (If Active) */}
        {demoStep !== null && (
          <GuidedDemoBar
            currentStep={demoStep}
            onNextStep={handleNextDemoStep}
            onPrevStep={handlePrevDemoStep}
            onCloseDemo={() => setDemoStep(null)}
            onGoToStep={(stepIdx: number) => {
              setDemoStep(stepIdx);
              if (stepIdx === 0) setActiveTab('inbox');
              else if (stepIdx >= 1 && stepIdx <= 4) {
                setSelectedCaseId('RV-4821');
                setActiveTab('case-workspace');
              } else setActiveTab('escalation-workspace');
            }}
          />
        )}

        {/* Header */}
        <TopHeader
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onResetDemo={handleResetDemo}
          onStartDemoTour={handleStartDemoTour}
          demoStep={demoStep}
          activeTab={activeTab}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-xs font-mono text-slate-400">
              Retrieving enterprise case context...
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <OverviewView 
                  cases={cases} 
                  onSelectCase={handleSelectCase} 
                  onNavigateInbox={() => setActiveTab('inbox')}
                />
              )}

              {activeTab === 'inbox' && (
                <InboxView 
                  cases={cases} 
                  onSelectCase={handleSelectCase}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              )}

              {activeTab === 'case-workspace' && currentCaseObj && (
                <CaseWorkspaceView
                  caseData={currentCaseObj}
                  onRunInvestigation={handleRunInvestigation}
                  onInitiateRefund={() => setIsRefundModalOpen(true)}
                  onEscalateReplacement={handleEscalateReplacement}
                  onNavigateEscalations={() => setActiveTab('escalation-workspace')}
                />
              )}

              {activeTab === 'escalation-workspace' && currentCaseObj && (
                <HumanAgentEscalationView
                  caseData={currentCaseObj}
                  onApproveReplacement={handleApproveReplacement}
                  onNavigateCase={(caseId: string) => {
                    setSelectedCaseId(caseId);
                    setActiveTab('case-workspace');
                  }}
                />
              )}

              {activeTab === 'investigations' && (
                <InvestigationsView 
                  cases={cases} 
                  onSelectCase={handleSelectCase}
                />
              )}

              {activeTab === 'escalations' && (
                <EscalationsView 
                  escalations={escalations}
                  onSelectEscalatedCase={(caseId: string) => {
                    setSelectedCaseId(caseId);
                    setActiveTab('escalation-workspace');
                  }}
                />
              )}

              {activeTab === 'customers' && (
                <CustomersView customers={customers} />
              )}

              {activeTab === 'orders' && (
                <OrdersView orders={orders} payments={payments.length ? payments : [
                  { id: 'TX-8831', orderId: 'RV-4821', amount: '₹4,999', method: 'UPI (HDFC)', timestamp: '2026-09-08 14:21:05', status: 'SUCCESS', isDuplicate: false },
                  { id: 'TX-8832', orderId: 'RV-4821', amount: '₹4,999', method: 'UPI (HDFC)', timestamp: '2026-09-08 14:21:08', status: 'SUCCESS', isDuplicate: true }
                ]} />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsView analyticsData={analytics} />
              )}

              {activeTab === 'architecture' && (
                <ArchitectureView />
              )}
            </>
          )}
        </main>
      </div>

      {/* Demo Refund Action Modal */}
      <RefundModal
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
        onConfirm={handleInitiateRefundConfirm}
        caseData={currentCaseObj}
      />
    </div>
  );
}
