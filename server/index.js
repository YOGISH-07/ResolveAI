import express from 'express';
import cors from 'cors';
import { store } from './data/store.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Request Logger
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// GET /api/cases - List all cases
app.get('/api/cases', (req, res) => {
  const cases = store.getCases();
  res.json({ success: true, data: cases });
});

// GET /api/cases/:id - Case detail
app.get('/api/cases/:id', (req, res) => {
  const caseId = req.params.id;
  const caseObj = store.getCaseById(caseId);
  if (!caseObj) {
    return res.status(404).json({ success: false, message: 'Case not found' });
  }

  const customer = store.getCustomerById(caseObj.customerId);
  const order = store.getOrderById(caseObj.orderId);
  const payments = store.getPayments().filter(p => p.orderId === caseObj.orderId);

  res.json({
    success: true,
    data: {
      ...caseObj,
      customerContext: customer,
      orderContext: order,
      paymentContext: payments
    }
  });
});

// POST /api/cases/:id/investigate - Trigger investigation
app.post('/api/cases/:id/investigate', (req, res) => {
  const caseId = req.params.id;
  const updatedCase = store.runInvestigation(caseId);
  if (!updatedCase) {
    return res.status(404).json({ success: false, message: 'Case not found' });
  }
  res.json({ success: true, message: 'Investigation executed successfully', data: updatedCase });
});

// POST /api/cases/:id/refund - Initiate demo refund
app.post('/api/cases/:id/refund', (req, res) => {
  const caseId = req.params.id;
  const { transactionId } = req.body;
  const updatedCase = store.initiateRefund(caseId, transactionId || 'TX-8832');
  if (!updatedCase) {
    return res.status(404).json({ success: false, message: 'Case not found' });
  }
  res.json({ 
    success: true, 
    message: 'Demo refund workflow initiated. No real transaction executed.', 
    data: updatedCase 
  });
});

// POST /api/cases/:id/escalate - Escalate to human agent
app.post('/api/cases/:id/escalate', (req, res) => {
  const caseId = req.params.id;
  const { reason } = req.body;
  const updatedCase = store.escalateCase(caseId, reason);
  if (!updatedCase) {
    return res.status(404).json({ success: false, message: 'Case not found' });
  }
  res.json({ 
    success: true, 
    message: 'Case escalated to Human Agent Priya Sharma.', 
    data: updatedCase 
  });
});

// POST /api/cases/:id/approve-replacement - Approve replacement (Human Agent Action)
app.post('/api/cases/:id/approve-replacement', (req, res) => {
  const caseId = req.params.id;
  const updatedCase = store.approveReplacement(caseId);
  if (!updatedCase) {
    return res.status(404).json({ success: false, message: 'Case not found' });
  }
  res.json({ 
    success: true, 
    message: 'Replacement approved. Demo order #REP-4821 created. Case marked RESOLVED.', 
    data: updatedCase 
  });
});

// POST /api/cases/reset - Reset demo state
app.post('/api/cases/reset', (req, res) => {
  store.resetData();
  res.json({ success: true, message: 'Demo environment reset to initial state.' });
});

// GET /api/customers - Customers directory
app.get('/api/customers', (req, res) => {
  res.json({ success: true, data: store.getCustomers() });
});

// GET /api/orders - Orders ledger
app.get('/api/orders', (req, res) => {
  res.json({ success: true, data: store.getOrders() });
});

// GET /api/escalations - Escalations queue
app.get('/api/escalations', (req, res) => {
  res.json({ success: true, data: store.getEscalations() });
});

// GET /api/analytics - Analytics metrics
app.get('/api/analytics', (req, res) => {
  res.json({ success: true, data: store.getAnalytics() });
});

app.listen(PORT, () => {
  console.log(`[RESOLVEAI Backend Server] Listening on http://localhost:${PORT}`);
});
