import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { mockStore } from './data/mockStore';
import { qwenReasoningService } from './services/qwenReasoningService';
import { policyEngine } from './services/policyEngine';

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = '0.0.0.0';

app.use(cors());
app.use(express.json());

// API Request Logging
app.use((req: Request, res: Response, next) => {
  console.log(`[ResolveAI API] ${req.method} ${req.url}`);
  next();
});

// Health Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'resolveai-api'
  });
});

// GET /api/cases - List all support cases
app.get('/api/cases', (req: Request, res: Response) => {
  const cases = mockStore.getCases();
  res.json({ success: true, data: cases });
});

// GET /api/cases/:id - Case detail with context
app.get('/api/cases/:id', (req: Request, res: Response) => {
  const caseId = (req.params.id as string) || '';
  const caseObj = mockStore.getCaseById(caseId);
  if (!caseObj) {
    return res.status(404).json({ success: false, message: 'Case not found' });
  }

  const customer = mockStore.getCustomerById(caseObj.customerId);
  const order = mockStore.getOrderById(caseObj.orderId);
  const payments = mockStore.getPayments().filter(p => p.orderId === caseObj.orderId);
  const policyRefund = policyEngine.evaluateRefundAction(caseObj);
  const policyReplacement = policyEngine.evaluateReplacementAction(caseObj);

  res.json({
    success: true,
    data: {
      ...caseObj,
      customerContext: customer,
      orderContext: order,
      paymentContext: payments,
      evaluatedPolicies: {
        refund: policyRefund,
        replacement: policyReplacement
      }
    }
  });
});

// POST /api/cases/:id/investigate - Trigger investigation
app.post('/api/cases/:id/investigate', async (req: Request, res: Response) => {
  const caseId = (req.params.id as string) || '';
  const updatedCase = mockStore.runInvestigation(caseId);
  if (!updatedCase) {
    return res.status(404).json({ success: false, message: 'Case not found' });
  }

  // Update Qwen Analysis dynamically using Qwen Reasoning Service
  const qwenAnalysis = await qwenReasoningService.analyzeCase(updatedCase);
  updatedCase.qwenAnalysis = qwenAnalysis;

  res.json({
    success: true,
    message: 'Autonomous investigation executed successfully',
    data: updatedCase
  });
});

// POST /api/cases/:id/refund - Initiate demo refund workflow
app.post('/api/cases/:id/refund', (req: Request, res: Response) => {
  const caseId = (req.params.id as string) || '';
  const { transactionId } = req.body;
  const updatedCase = mockStore.initiateRefund(caseId, transactionId || 'TX-8832');
  if (!updatedCase) {
    return res.status(404).json({ success: false, message: 'Case not found' });
  }

  res.json({
    success: true,
    message: 'Demo refund workflow initiated. No real financial transaction executed.',
    data: updatedCase
  });
});

// POST /api/cases/:id/escalate - Escalate to human agent
app.post('/api/cases/:id/escalate', (req: Request, res: Response) => {
  const caseId = (req.params.id as string) || '';
  const { reason } = req.body;
  const updatedCase = mockStore.escalateCase(caseId, reason);
  if (!updatedCase) {
    return res.status(404).json({ success: false, message: 'Case not found' });
  }

  res.json({
    success: true,
    message: 'Case escalated to Senior Support Agent Priya Sharma.',
    data: updatedCase
  });
});

// POST /api/cases/:id/approve-replacement - Approve replacement (Human Agent)
app.post('/api/cases/:id/approve-replacement', (req: Request, res: Response) => {
  const caseId = (req.params.id as string) || '';
  const updatedCase = mockStore.approveReplacement(caseId);
  if (!updatedCase) {
    return res.status(404).json({ success: false, message: 'Case not found' });
  }

  res.json({
    success: true,
    message: 'Replacement approved. Demo order #REP-4821 created. Case marked RESOLVED.',
    data: updatedCase
  });
});

// POST /api/cases/reset - Reset demo environment to initial state
app.post('/api/cases/reset', (req: Request, res: Response) => {
  mockStore.resetData();
  res.json({ success: true, message: 'Demo environment reset to initial state.' });
});

// GET /api/customers - Customers directory
app.get('/api/customers', (req: Request, res: Response) => {
  res.json({ success: true, data: mockStore.getCustomers() });
});

// GET /api/orders - Orders ledger
app.get('/api/orders', (req: Request, res: Response) => {
  res.json({ success: true, data: mockStore.getOrders() });
});

// GET /api/escalations - Escalations queue
app.get('/api/escalations', (req: Request, res: Response) => {
  res.json({ success: true, data: mockStore.getEscalations() });
});

// GET /api/analytics - Operational analytics
app.get('/api/analytics', (req: Request, res: Response) => {
  res.json({ success: true, data: mockStore.getAnalytics() });
});

// PROD: Serve React static build files from dist/
const distPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(distPath));

// PROD: SPA Fallback for all non-API routes
app.use((req: Request, res: Response) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`[RESOLVEAI Production Server] Listening on http://${HOST}:${PORT}`);
});
