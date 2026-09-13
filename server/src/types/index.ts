export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  since: string;
  status: 'Verified' | 'Unverified';
  standing: 'Good standing' | 'VIP Customer' | 'Under Review';
  totalSpent: string;
  totalOrders: number;
  riskScore: string;
  previousCases: {
    id: string;
    date: string;
    issue: string;
    status: 'Resolved' | 'Closed' | 'Pending';
  }[];
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  product: string;
  sku: string;
  amount: number;
  formattedAmount: string;
  orderDate: string;
  deliveryDate: string;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Cancelled';
  carrier: string;
  trackingId: string;
  shippingAddress: string;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: string;
  method: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'REFUNDED';
  timestamp: string;
  isDuplicate: boolean;
  gatewayRef?: string;
  note?: string;
}

export interface DetectedIntent {
  id: number;
  label: string;
  category: 'Payment' | 'Logistics' | 'Financial' | 'Fulfillment' | 'Security';
}

export interface TimelineEvent {
  time: string;
  title: string;
  details: string;
  status: 'completed' | 'pending' | 'failed';
  isDemoAction?: boolean;
}

export interface EvidenceFindings {
  payment: string;
  delivery: string;
  complaint: string;
  policyRefund: string;
  policyReplacement: string;
}

export interface QwenAnalysis {
  role: string;
  mode: string; // "Qwen-Powered Reasoning" or "Reasoning Engine — Demo Mode"
  intent: string;
  rootCause: string;
  recommendedResolution: string[];
  confidence: string;
}

export interface PolicyRule {
  id: string;
  code: string; // e.g. "Policy 4.2", "Policy 7.1"
  name: string;
  category: 'Refund' | 'Replacement' | 'Identity';
  determination: 'SAFE_TO_AUTOMATE' | 'REQUIRES_HUMAN_APPROVAL';
  condition: string;
}

export interface SupportCase {
  id: string;
  customerId: string;
  customerName: string;
  orderId: string;
  intentsSummary: string;
  detectedIntents: DetectedIntent[];
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'NEW' | 'INVESTIGATING' | 'WAITING' | 'ESCALATED' | 'RESOLVED';
  created: string;
  timestamp: string;
  owner: string;
  customerMessage: string;
  investigationCompleted: boolean;
  refundInitiated: boolean;
  escalatedToHuman: boolean;
  humanAgent: string | null;
  replacementApproved: boolean;
  finalResolutionText: string | null;
  timelineEvents: TimelineEvent[];
  evidence: EvidenceFindings;
  qwenAnalysis: QwenAnalysis;
}

export interface EscalationPackage {
  caseId: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  customerName: string;
  reason: string;
  aiRecommendation: string;
  agent: string;
  status: 'PENDING' | 'RESOLVED';
  timestamp: string;
  investigationCompleted: boolean;
  evidence: EvidenceFindings;
  actionsTaken: string[];
  recommendedNextAction: string;
  policyReferences: string[];
}
