import { Customer, Order, Payment, SupportCase, EscalationPackage } from '../types/index';
import { enterproService } from '../services/enterproOrchestrationService';

const initialCustomers: Customer[] = [
  {
    id: "CUS-10482",
    name: "Arjun Rao",
    email: "arjun.rao@example.com",
    phone: "+91 98765 43210",
    since: "2024",
    status: "Verified",
    standing: "Good standing",
    totalSpent: "₹34,995",
    totalOrders: 5,
    riskScore: "Low (0.02)",
    previousCases: [
      { id: "RV-3128", date: "2025-11-12", issue: "Address modification", status: "Resolved" },
      { id: "RV-2911", date: "2025-08-04", issue: "Product inquiry", status: "Closed" }
    ]
  },
  {
    id: "CUS-84120",
    name: "Meera Nair",
    email: "meera.nair@example.com",
    phone: "+91 98123 76543",
    since: "2023",
    status: "Verified",
    standing: "VIP Customer",
    totalSpent: "₹89,200",
    totalOrders: 12,
    riskScore: "Low (0.01)",
    previousCases: [
      { id: "RV-4100", date: "2026-01-15", issue: "Warranty extension", status: "Resolved" }
    ]
  },
  {
    id: "CUS-73019",
    name: "Rahul Menon",
    email: "rahul.menon@example.com",
    phone: "+91 97654 32109",
    since: "2025",
    status: "Verified",
    standing: "Good standing",
    totalSpent: "₹12,400",
    totalOrders: 2,
    riskScore: "Low (0.05)",
    previousCases: []
  },
  {
    id: "CUS-61194",
    name: "Ananya Shetty",
    email: "ananya.shetty@example.com",
    phone: "+91 99887 76655",
    since: "2024",
    status: "Verified",
    standing: "Good standing",
    totalSpent: "₹45,000",
    totalOrders: 6,
    riskScore: "Medium (0.14)",
    previousCases: [
      { id: "RV-3950", date: "2025-12-01", issue: "Invoice copy", status: "Resolved" }
    ]
  },
  {
    id: "CUS-50021",
    name: "Vikram Das",
    email: "vikram.das@example.com",
    phone: "+91 91234 56789",
    since: "2025",
    status: "Verified",
    standing: "Good standing",
    totalSpent: "₹18,900",
    totalOrders: 3,
    riskScore: "Low (0.04)",
    previousCases: []
  }
];

const initialOrders: Order[] = [
  {
    id: "RV-4821",
    customerId: "CUS-10482",
    customerName: "Arjun Rao",
    product: "Sony WH-1000XM5 (Wireless Noise-Canceling Headphones)",
    sku: "SONY-WH1000XM5-BLK",
    amount: 4999,
    formattedAmount: "₹4,999",
    orderDate: "2026-09-08 14:20:00",
    deliveryDate: "2026-09-10",
    status: "Delivered",
    carrier: "Express Logistics India",
    trackingId: "EX-9920148",
    shippingAddress: "142 Indiranagar 100ft Road, Bengaluru, KA 560038"
  },
  {
    id: "RV-4798",
    customerId: "CUS-84120",
    customerName: "Meera Nair",
    product: "Ergonomic Mechanical Keyboard (RGB Silent)",
    sku: "EMK-R90-GRY",
    amount: 6499,
    formattedAmount: "₹6,499",
    orderDate: "2026-09-07 09:10:00",
    deliveryDate: "In Transit (Expected Today)",
    status: "In Transit",
    carrier: "BlueDart Express",
    trackingId: "BD-8830192",
    shippingAddress: "45 Koramangala 4th Block, Bengaluru, KA 560034"
  },
  {
    id: "RV-4751",
    customerId: "CUS-73019",
    customerName: "Rahul Menon",
    product: "4K Ultra-HD Monitor Arm (Dual Desk Mount)",
    sku: "MA-DUAL-4K",
    amount: 3299,
    formattedAmount: "₹3,299",
    orderDate: "2026-09-05 18:40:00",
    deliveryDate: "2026-09-07",
    status: "Delivered",
    carrier: "Delhivery",
    trackingId: "DL-1102934",
    shippingAddress: "88 HSR Layout Sector 1, Bengaluru, KA 560102"
  },
  {
    id: "RV-4692",
    customerId: "CUS-61194",
    customerName: "Ananya Shetty",
    product: "USB-C Multi-Port Docking Hub 11-in-1",
    sku: "HUB-11IN1-SLV",
    amount: 2899,
    formattedAmount: "₹2,899",
    orderDate: "2026-09-04 11:05:00",
    deliveryDate: "2026-09-06",
    status: "Delivered",
    carrier: "Express Logistics India",
    trackingId: "EX-8812903",
    shippingAddress: "12 Whitefield Main Rd, Bengaluru, KA 560066"
  },
  {
    id: "RV-4680",
    customerId: "CUS-50021",
    customerName: "Vikram Das",
    product: "Smart ANC Earbuds Pro",
    sku: "ANC-EB-WHT",
    amount: 3499,
    formattedAmount: "₹3,499",
    orderDate: "2026-09-03 16:12:00",
    deliveryDate: "2026-09-05",
    status: "Delivered",
    carrier: "BlueDart Express",
    trackingId: "BD-7734190",
    shippingAddress: "77 Jayanagar 4th T Block, Bengaluru, KA 560041"
  }
];

const initialPayments: Payment[] = [
  {
    id: "TX-8831",
    orderId: "RV-4821",
    amount: "₹4,999",
    method: "UPI (HDFC Bank)",
    status: "SUCCESS",
    timestamp: "2026-09-08 14:21:05",
    isDuplicate: false,
    gatewayRef: "GATEWAY-HDFC-9910"
  },
  {
    id: "TX-8832",
    orderId: "RV-4821",
    amount: "₹4,999",
    method: "UPI (HDFC Bank)",
    status: "SUCCESS",
    timestamp: "2026-09-08 14:21:08",
    isDuplicate: true,
    note: "Potential duplicate transaction (Retry glitch detected)",
    gatewayRef: "GATEWAY-HDFC-9911"
  },
  {
    id: "TX-8790",
    orderId: "RV-4798",
    amount: "₹6,499",
    method: "Credit Card (ICICI)",
    status: "SUCCESS",
    timestamp: "2026-09-07 09:10:45",
    isDuplicate: false
  },
  {
    id: "TX-8712",
    orderId: "RV-4751",
    amount: "₹3,299",
    method: "Net Banking (SBI)",
    status: "SUCCESS",
    timestamp: "2026-09-05 18:40:12",
    isDuplicate: false
  }
];

const initialCases: SupportCase[] = [
  {
    id: "RV-4821",
    customerId: "CUS-10482",
    customerName: "Arjun Rao",
    orderId: "RV-4821",
    intentsSummary: "Duplicate payment + Damaged delivery",
    detectedIntents: [
      { id: 1, label: "DUPLICATE PAYMENT", category: "Payment" },
      { id: 2, label: "DAMAGED DELIVERY", category: "Logistics" },
      { id: 3, label: "REFUND REQUEST", category: "Financial" },
      { id: 4, label: "REPLACEMENT REQUEST", category: "Fulfillment" }
    ],
    priority: "HIGH",
    status: "INVESTIGATING",
    created: "2 min ago",
    timestamp: "14:32:00",
    owner: "ResolveAI",
    customerMessage: "I was charged twice for order RV-4821 and the package arrived damaged. I want a refund and a replacement.",
    investigationCompleted: false,
    refundInitiated: false,
    escalatedToHuman: false,
    humanAgent: null,
    replacementApproved: false,
    finalResolutionText: null,
    timelineEvents: [
      { time: "14:32:04", title: "Customer identity verified", details: "Arjun Rao (CUS-10482) • Customer since 2024 • Good Standing", status: "completed" },
      { time: "14:32:05", title: "Order RV-4821 located", details: "Sony WH-1000XM5 • ₹4,999 • Express Logistics India", status: "completed" },
      { time: "14:32:05", title: "Delivery status checked", details: "Marked delivered on 2026-09-10 by Express Logistics India", status: "completed" },
      { time: "14:32:06", title: "Product details retrieved", details: "SKU: SONY-WH1000XM5-BLK • Premium Audio Category", status: "completed" },
      { time: "14:32:06", title: "Payment records checked", details: "Two successful transactions TX-8831 and TX-8832 associated with order RV-4821", status: "completed" },
      { time: "14:32:07", title: "Support history retrieved", details: "2 previous cases (RV-3128 resolved, RV-2911 closed) • Low Risk Score", status: "completed" },
      { time: "14:32:07", title: "Policies checked", details: "Auto-Refund Policy 4.2 matched for duplicate; Escalation Matrix 7.1 matched for damage replacement", status: "completed" }
    ],
    evidence: {
      payment: "Two successful transactions TX-8831 and TX-8832 are associated with order RV-4821.",
      delivery: "Order marked delivered on 2026-09-10 by Express Logistics India.",
      complaint: "Customer reports physical outer packaging and unit damage.",
      policyRefund: "Refund appears eligible under Auto-Refund Policy 4.2.",
      policyReplacement: "Replacement requires human approval under Escalation Matrix 7.1."
    },
    qwenAnalysis: {
      role: "AI Reasoning Engine",
      mode: "Reasoning Engine — Demo Mode",
      intent: "Multi-issue support case (Duplicate Charge + Goods Damaged)",
      rootCause: "Payment gateway double-submission combined with transit physical damage.",
      recommendedResolution: [
        "1. Initiate duplicate-payment refund for TX-8832 (₹4,999).",
        "2. Escalate replacement request for human approval with compiled evidence package."
      ],
      confidence: "High (98.4%)"
    }
  },
  {
    id: "RV-4798",
    customerId: "CUS-84120",
    customerName: "Meera Nair",
    orderId: "RV-4798",
    intentsSummary: "Delivery delayed",
    detectedIntents: [
      { id: 1, label: "DELIVERY DELAY", category: "Logistics" },
      { id: 2, label: "ETA INQUIRY", category: "Logistics" }
    ],
    priority: "MEDIUM",
    status: "WAITING",
    created: "18 min ago",
    timestamp: "14:14:00",
    owner: "ResolveAI",
    customerMessage: "Where is my mechanical keyboard order RV-4798? It was supposed to be delivered yesterday.",
    investigationCompleted: true,
    refundInitiated: false,
    escalatedToHuman: false,
    humanAgent: null,
    replacementApproved: false,
    finalResolutionText: null,
    timelineEvents: [
      { time: "14:14:02", title: "Customer identity verified", details: "Meera Nair (CUS-84120) • VIP Standing", status: "completed" },
      { time: "14:14:05", title: "Carrier API queried", details: "BlueDart live status: Weather delay in transit", status: "completed" }
    ],
    evidence: {
      payment: "Single successful transaction TX-8790 (₹6,499).",
      delivery: "In Transit with BlueDart. Revised ETA: Today 6:00 PM.",
      complaint: "Tracking delay inquiry.",
      policyRefund: "Not applicable at this stage.",
      policyReplacement: "Not applicable."
    },
    qwenAnalysis: {
      role: "AI Reasoning Engine",
      mode: "Reasoning Engine — Demo Mode",
      intent: "Logistics status inquiry",
      rootCause: "Carrier localized transit delay.",
      recommendedResolution: ["Send automated real-time tracking link and apology notification."],
      confidence: "High (99.1%)"
    }
  },
  {
    id: "RV-4751",
    customerId: "CUS-73019",
    customerName: "Rahul Menon",
    orderId: "RV-4751",
    intentsSummary: "Refund status",
    detectedIntents: [
      { id: 1, label: "REFUND STATUS", category: "Financial" }
    ],
    priority: "LOW",
    status: "RESOLVED",
    created: "1 hr ago",
    timestamp: "13:30:00",
    owner: "ResolveAI",
    customerMessage: "Has my return refund for order RV-4751 been processed yet?",
    investigationCompleted: true,
    refundInitiated: true,
    escalatedToHuman: false,
    humanAgent: null,
    replacementApproved: false,
    finalResolutionText: "Refund of ₹3,299 processed to SBI Net Banking on 2026-09-07.",
    timelineEvents: [
      { time: "13:30:02", title: "Customer identity verified", details: "Rahul Menon (CUS-73019)", status: "completed" },
      { time: "13:30:04", title: "Bank transaction checked", details: "Refund TX-REF-8801 cleared", status: "completed" }
    ],
    evidence: {
      payment: "Refund TX-REF-8801 processed successfully.",
      delivery: "Return item received at warehouse.",
      complaint: "Status check.",
      policyRefund: "Resolved.",
      policyReplacement: "N/A"
    },
    qwenAnalysis: {
      role: "AI Reasoning Engine",
      mode: "Reasoning Engine — Demo Mode",
      intent: "Refund status inquiry",
      rootCause: "Standard bank processing timeframe notification.",
      recommendedResolution: ["Inform customer of completed bank reference number."],
      confidence: "High (99.8%)"
    }
  },
  {
    id: "RV-4692",
    customerId: "CUS-61194",
    customerName: "Ananya Shetty",
    orderId: "RV-4692",
    intentsSummary: "Account verification issue",
    detectedIntents: [
      { id: 1, label: "ACCOUNT VERIFICATION", category: "Security" },
      { id: 2, label: "LOGIN LOCK", category: "Security" }
    ],
    priority: "MEDIUM",
    status: "ESCALATED",
    created: "3 hrs ago",
    timestamp: "11:30:00",
    owner: "Priya Sharma",
    customerMessage: "I cannot access my invoice for order RV-4692 because my two-factor auth phone number changed.",
    investigationCompleted: true,
    refundInitiated: false,
    escalatedToHuman: true,
    humanAgent: "Priya Sharma",
    replacementApproved: false,
    finalResolutionText: null,
    timelineEvents: [
      { time: "11:30:05", title: "Security protocol triggered", details: "2FA phone mismatch detected", status: "completed" },
      { time: "11:30:08", title: "Escalated to SecOps Support", details: "Identity verification required", status: "completed" }
    ],
    evidence: {
      payment: "TX-8812 verified.",
      delivery: "Delivered.",
      complaint: "2FA phone update.",
      policyRefund: "N/A",
      policyReplacement: "N/A"
    },
    qwenAnalysis: {
      role: "AI Reasoning Engine",
      mode: "Reasoning Engine — Demo Mode",
      intent: "Account Security / 2FA Reset",
      rootCause: "User phone number change.",
      recommendedResolution: ["Escalate to human agent for manual identity check."],
      confidence: "High (95.0%)"
    }
  }
];

export class MockDataStore {
  private customers: Customer[];
  private orders: Order[];
  private payments: Payment[];
  private cases: SupportCase[];

  constructor() {
    this.customers = JSON.parse(JSON.stringify(initialCustomers));
    this.orders = JSON.parse(JSON.stringify(initialOrders));
    this.payments = JSON.parse(JSON.stringify(initialPayments));
    this.cases = JSON.parse(JSON.stringify(initialCases));
  }

  public resetData(): void {
    this.customers = JSON.parse(JSON.stringify(initialCustomers));
    this.orders = JSON.parse(JSON.stringify(initialOrders));
    this.payments = JSON.parse(JSON.stringify(initialPayments));
    this.cases = JSON.parse(JSON.stringify(initialCases));
  }

  public getCases(): SupportCase[] {
    return this.cases;
  }

  public getCaseById(id: string): SupportCase | undefined {
    const normalize = (s: string) => s.replace(/^#/, '').toUpperCase();
    const target = normalize(id);
    return this.cases.find(c => normalize(c.id) === target);
  }

  public getCustomers(): Customer[] {
    return this.customers;
  }

  public getCustomerById(id: string): Customer | undefined {
    return this.customers.find(c => c.id === id);
  }

  public getOrders(): Order[] {
    return this.orders;
  }

  public getOrderById(id: string): Order | undefined {
    const normalize = (s: string) => s.replace(/^#/, '').toUpperCase();
    const target = normalize(id);
    return this.orders.find(o => normalize(o.id) === target);
  }

  public getPayments(): Payment[] {
    return this.payments;
  }

  public getEscalations(): EscalationPackage[] {
    return this.cases
      .filter(c => c.escalatedToHuman || c.status === 'ESCALATED')
      .map(c => enterproService.compileEscalationPackage(c, c.id === 'RV-4821' 
        ? 'Replacement request requires human approval under Escalation Matrix Policy 7.1' 
        : '2FA phone update requires manual verification'));
  }

  public runInvestigation(caseId: string): SupportCase | null {
    const caseObj = this.getCaseById(caseId);
    if (!caseObj) return null;

    caseObj.status = 'INVESTIGATING';
    caseObj.investigationCompleted = true;

    const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    if (!caseObj.timelineEvents.some(e => e.title.includes('Investigation completed'))) {
      caseObj.timelineEvents.push({
        time: nowTime,
        title: 'Investigation completed',
        details: 'Auditable evidence compiled and Qwen reasoning engine executed',
        status: 'completed'
      });
    }

    return caseObj;
  }

  public initiateRefund(caseId: string, transactionId: string = 'TX-8832'): SupportCase | null {
    const caseObj = this.getCaseById(caseId);
    if (!caseObj) return null;

    caseObj.refundInitiated = true;
    caseObj.status = caseObj.escalatedToHuman ? 'ESCALATED' : 'WAITING';

    const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    caseObj.timelineEvents.push({
      time: nowTime,
      title: 'Refund workflow initiated [DEMO ACTION]',
      details: `Transaction ${transactionId} marked for duplicate refund (₹4,999). Status: Refund Requested.`,
      status: 'completed',
      isDemoAction: true
    });

    return caseObj;
  }

  public escalateCase(caseId: string, reason?: string): SupportCase | null {
    const caseObj = this.getCaseById(caseId);
    if (!caseObj) return null;

    caseObj.escalatedToHuman = true;
    caseObj.status = 'ESCALATED';
    caseObj.humanAgent = 'Priya Sharma';

    const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    caseObj.timelineEvents.push({
      time: nowTime,
      title: 'Case escalated to Human Agent',
      details: `Context package compiled by ResolveAI. Routed to Senior Agent Priya Sharma. Reason: ${reason || 'Replacement requires human approval'}`,
      status: 'completed'
    });

    return caseObj;
  }

  public approveReplacement(caseId: string): SupportCase | null {
    const caseObj = this.getCaseById(caseId);
    if (!caseObj) return null;

    caseObj.replacementApproved = true;
    caseObj.status = 'RESOLVED';
    caseObj.owner = caseObj.humanAgent || 'Priya Sharma';

    const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    caseObj.timelineEvents.push({
      time: nowTime,
      title: 'Replacement Approved by Human Agent [DEMO ACTION]',
      details: `Order RV-4821 replacement unit dispatch authorized. Replacement Order #REP-4821 created.`,
      status: 'completed',
      isDemoAction: true
    });

    caseObj.finalResolutionText = "Hi Arjun,\n\nWe've identified the duplicate payment on order RV-4821 and initiated the refund workflow.\n\nYour replacement request has also been approved.\n\nNo further information is required from you at this time.\n\n— ResolveAI Support";

    return caseObj;
  }

  public getAnalytics() {
    const totalCases = this.cases.length;
    const resolvedCases = this.cases.filter(c => c.status === 'RESOLVED').length;
    const escalatedCases = this.cases.filter(c => c.escalatedToHuman || c.status === 'ESCALATED').length;

    return {
      disclaimer: "ILLUSTRATIVE DEMO DATA",
      kpis: {
        totalCases: 142,
        openCases: totalCases,
        needsAttention: 2,
        aiResolved: 111,
        humanEscalations: escalatedCases,
        avgResolutionTime: "3.2s AI / 4.5m Human",
        aiSuccessRate: "78.2%"
      },
      categoryDistribution: [
        { category: "Duplicate Payment", percentage: 35, count: 50 },
        { category: "Damaged Goods", percentage: 28, count: 40 },
        { category: "Logistics Delay", percentage: 20, count: 28 },
        { category: "Account & 2FA", percentage: 17, count: 24 }
      ],
      resolutionPaths: [
        { path: "Autonomous Full Resolution", percentage: 62 },
        { path: "AI Investigation + Safe Auto-Refund + Human Escalation", percentage: 25 },
        { path: "Direct Human Handoff", percentage: 13 }
      ]
    };
  }
}

export const mockStore = new MockDataStore();
