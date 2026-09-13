// Stateful enterprise database store for ResolveAI Demo Environment

const initialCustomers = [
  {
    id: "CUST-9021",
    name: "Arjun Rao",
    email: "arjun.rao@example.com",
    phone: "+91 98765 43210",
    since: "2024",
    status: "Verified",
    standing: "Good standing",
    totalSpent: "₹34,995",
    totalOrders: 5,
    previousCases: [
      { id: "RV-3120", date: "2025-11-12", issue: "Address modification", status: "Resolved" },
      { id: "RV-2911", date: "2025-08-04", issue: "Product inquiry", status: "Closed" }
    ],
    riskScore: "Low (0.02)"
  },
  {
    id: "CUST-8412",
    name: "Meera Nair",
    email: "meera.nair@example.com",
    phone: "+91 98123 76543",
    since: "2023",
    status: "Verified",
    standing: "VIP Customer",
    totalSpent: "₹89,200",
    totalOrders: 12,
    previousCases: [
      { id: "RV-4100", date: "2026-01-15", issue: "Warranty extension", status: "Resolved" }
    ],
    riskScore: "Low (0.01)"
  },
  {
    id: "CUST-7301",
    name: "Rahul Menon",
    email: "rahul.menon@example.com",
    phone: "+91 97654 32109",
    since: "2025",
    status: "Verified",
    standing: "Good standing",
    totalSpent: "₹12,400",
    totalOrders: 2,
    previousCases: [],
    riskScore: "Low (0.05)"
  },
  {
    id: "CUST-6119",
    name: "Ananya Shetty",
    email: "ananya.shetty@example.com",
    phone: "+91 99887 76655",
    since: "2024",
    status: "Verified",
    standing: "Good standing",
    totalSpent: "₹45,000",
    totalOrders: 6,
    previousCases: [
      { id: "RV-3950", date: "2025-12-01", issue: "Invoice copy", status: "Resolved" }
    ],
    riskScore: "Medium (0.14)"
  },
  {
    id: "CUST-5002",
    name: "Vikram Das",
    email: "vikram.das@example.com",
    phone: "+91 91234 56789",
    since: "2025",
    status: "Verified",
    standing: "Good standing",
    totalSpent: "₹18,900",
    totalOrders: 3,
    previousCases: [],
    riskScore: "Low (0.04)"
  }
];

const initialOrders = [
  {
    id: "#RV-4821",
    customerId: "CUST-9021",
    customerName: "Arjun Rao",
    product: "Wireless Noise-Canceling Headphones (Pro Studio Edition)",
    sku: "WNC-H800-BLK",
    amount: 4999,
    formattedAmount: "₹4,999",
    orderDate: "2026-09-08 14:20:00",
    deliveryDate: "2026-09-10 11:15:00",
    status: "Delivered",
    carrier: "Express Logistics India",
    trackingId: "EX-9920148",
    shippingAddress: "142 Indiranagar 100ft Road, Bengaluru, KA 560038"
  },
  {
    id: "#RV-4798",
    customerId: "CUST-8412",
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
    id: "#RV-4751",
    customerId: "CUST-7301",
    customerName: "Rahul Menon",
    product: "4K Ultra-HD Monitor Arm (Dual Desk Mount)",
    sku: "MA-DUAL-4K",
    amount: 3299,
    formattedAmount: "₹3,299",
    orderDate: "2026-09-05 18:40:00",
    deliveryDate: "2026-09-07 16:30:00",
    status: "Delivered",
    carrier: "Delhivery",
    trackingId: "DL-1102934",
    shippingAddress: "88 HSR Layout Sector 1, Bengaluru, KA 560102"
  },
  {
    id: "#RV-4692",
    customerId: "CUST-6119",
    customerName: "Ananya Shetty",
    product: "USB-C Multi-Port Docking Hub 11-in-1",
    sku: "HUB-11IN1-SLV",
    amount: 2899,
    formattedAmount: "₹2,899",
    orderDate: "2026-09-04 11:05:00",
    deliveryDate: "2026-09-06 14:00:00",
    status: "Delivered",
    carrier: "Express Logistics India",
    trackingId: "EX-8812903",
    shippingAddress: "12 Whitefield Main Rd, Bengaluru, KA 560066"
  },
  {
    id: "#RV-4680",
    customerId: "CUST-5002",
    customerName: "Vikram Das",
    product: "Smart ANC Earbuds Pro",
    sku: "ANC-EB-WHT",
    amount: 3499,
    formattedAmount: "₹3,499",
    orderDate: "2026-09-03 16:12:00",
    deliveryDate: "2026-09-05 10:45:00",
    status: "Delivered",
    carrier: "BlueDart Express",
    trackingId: "BD-7734190",
    shippingAddress: "77 Jayanagar 4th T Block, Bengaluru, KA 560041"
  }
];

const initialPayments = [
  {
    id: "TX-8831",
    orderId: "#RV-4821",
    amount: "₹4,999",
    method: "UPI (HDFC Bank)",
    status: "SUCCESS",
    timestamp: "2026-09-08 14:21:05",
    isDuplicate: false,
    gatewayRef: "GATEWAY-HDFC-9910"
  },
  {
    id: "TX-8832",
    orderId: "#RV-4821",
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
    orderId: "#RV-4798",
    amount: "₹6,499",
    method: "Credit Card (ICICI)",
    status: "SUCCESS",
    timestamp: "2026-09-07 09:10:45",
    isDuplicate: false
  },
  {
    id: "TX-8712",
    orderId: "#RV-4751",
    amount: "₹3,299",
    method: "Net Banking (SBI)",
    status: "SUCCESS",
    timestamp: "2026-09-05 18:40:12",
    isDuplicate: false
  }
];

const initialCases = [
  {
    id: "#RV-4821",
    customerId: "CUST-9021",
    customerName: "Arjun Rao",
    orderId: "#RV-4821",
    intentsSummary: "Payment + Delivery",
    detectedIntents: [
      { id: 1, label: "DUPLICATE PAYMENT", category: "Payment" },
      { id: 2, label: "DAMAGED DELIVERY", category: "Logistics" },
      { id: 3, label: "REFUND REQUEST", category: "Financial" },
      { id: 4, label: "REPLACEMENT REQUEST", category: "Fulfillment" }
    ],
    priority: "HIGH",
    status: "INVESTIGATING", // NEW -> INVESTIGATING -> WAITING -> ESCALATED -> RESOLVED
    created: "2 min ago",
    timestamp: "14:32:00",
    owner: "ResolveAI",
    customerMessage: "I was charged twice for order #RV-4821, and the package arrived damaged. I want a refund and a replacement.",
    investigationCompleted: false,
    refundInitiated: false,
    escalatedToHuman: false,
    humanAgent: null,
    replacementApproved: false,
    finalResolutionText: null,
    timelineEvents: [
      { time: "14:32:04", title: "Customer identity verified", details: "Arjun Rao (CUST-9021) • Good Standing", status: "completed" },
      { time: "14:32:05", title: "Order #RV-4821 located", details: "Wireless Noise-Canceling Headphones • ₹4,999", status: "completed" },
      { time: "14:32:05", title: "Delivery status checked", details: "Marked delivered by Express Logistics on 2026-09-10", status: "completed" },
      { time: "14:32:06", title: "Product details retrieved", details: "SKU: WNC-H800-BLK • Category: Audio", status: "completed" },
      { time: "14:32:06", title: "Payment records checked", details: "Cross-referencing payment gateway logs", status: "completed" },
      { time: "14:32:06", title: "Two successful transactions detected", details: "TX-8831 (₹4,999) & TX-8832 (₹4,999) for order #RV-4821", status: "completed" },
      { time: "14:32:07", title: "Previous support history checked", details: "2 past cases (1 resolved, 1 closed) • Low risk score", status: "completed" },
      { time: "14:32:07", title: "Replacement policy checked", details: "Physical damage complaint requires human approval per Policy §7.1", status: "completed" },
      { time: "14:32:07", title: "Refund policy checked", details: "Duplicate payment qualifies for automated refund under Policy §4.2", status: "completed" }
    ],
    evidence: {
      payment: "Two successful transactions (TX-8831 & TX-8832) are associated with order #RV-4821.",
      delivery: "Order marked delivered on 2026-09-10 by Express Logistics India.",
      complaint: "Customer explicitly reports physical outer packaging & unit damage.",
      policyRefund: "Refund appears eligible under Auto-Refund Policy §4.2 (Duplicate Charge).",
      policyReplacement: "Replacement dispatch requires human agent approval per Escalation Matrix §7.1."
    },
    qwenAnalysis: {
      role: "AI Reasoning Engine",
      mode: "Qwen-powered workflow concept — demo mode",
      intent: "Multi-issue support case (Duplicate Charge + Goods Damaged)",
      rootCause: "System payment gateway double-submission combined with transit physical damage.",
      recommendedResolution: [
        "1. Initiate duplicate-payment refund workflow for TX-8832 (₹4,999).",
        "2. Escalate replacement request for human approval with compiled evidence package."
      ],
      confidence: "High (98.4%)"
    }
  },
  {
    id: "#RV-4798",
    customerId: "CUST-8412",
    customerName: "Meera Nair",
    orderId: "#RV-4798",
    intentsSummary: "Delivery Delayed",
    detectedIntents: [
      { id: 1, label: "DELIVERY DELAY", category: "Logistics" },
      { id: 2, label: "ETA INQUIRY", category: "Tracking" }
    ],
    priority: "MEDIUM",
    status: "WAITING",
    created: "18 min ago",
    timestamp: "14:14:00",
    owner: "ResolveAI",
    customerMessage: "Where is my mechanical keyboard order #RV-4798? It was supposed to be delivered yesterday.",
    investigationCompleted: true,
    refundInitiated: false,
    escalatedToHuman: false,
    humanAgent: null,
    replacementApproved: false,
    timelineEvents: [
      { time: "14:14:02", title: "Customer identity verified", details: "Meera Nair (CUST-8412) • VIP Standing", status: "completed" },
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
      mode: "Qwen-powered workflow concept — demo mode",
      intent: "Logistics status inquiry",
      rootCause: "Carrier localized transit delay.",
      recommendedResolution: ["Send automated real-time tracking link and apology notification."],
      confidence: "High (99.1%)"
    }
  },
  {
    id: "#RV-4751",
    customerId: "CUST-7301",
    customerName: "Rahul Menon",
    orderId: "#RV-4751",
    intentsSummary: "Refund Status",
    detectedIntents: [
      { id: 1, label: "REFUND STATUS", category: "Financial" }
    ],
    priority: "LOW",
    status: "RESOLVED",
    created: "1 hr ago",
    timestamp: "13:30:00",
    owner: "ResolveAI",
    customerMessage: "Has my return refund for order #RV-4751 been processed yet?",
    investigationCompleted: true,
    refundInitiated: true,
    escalatedToHuman: false,
    humanAgent: null,
    replacementApproved: false,
    finalResolutionText: "Refund of ₹3,299 processed to SBI Net Banking on 2026-09-07.",
    timelineEvents: [
      { time: "13:30:02", title: "Customer identity verified", details: "Rahul Menon (CUST-7301)", status: "completed" },
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
      mode: "Qwen-powered workflow concept — demo mode",
      intent: "Refund status inquiry",
      rootCause: "Standard bank processing timeframe notification.",
      recommendedResolution: ["Inform customer of completed bank reference number."],
      confidence: "High (99.8%)"
    }
  },
  {
    id: "#RV-4692",
    customerId: "CUST-6119",
    customerName: "Ananya Shetty",
    orderId: "#RV-4692",
    intentsSummary: "Account Verification Issue",
    detectedIntents: [
      { id: 1, label: "ACCOUNT VERIFICATION", category: "Security" },
      { id: 2, label: "LOGIN LOCK", category: "Auth" }
    ],
    priority: "MEDIUM",
    status: "ESCALATED",
    created: "3 hrs ago",
    timestamp: "11:30:00",
    owner: "Priya Sharma",
    customerMessage: "I cannot access my invoice for order #RV-4692 because my two-factor auth phone number changed.",
    investigationCompleted: true,
    refundInitiated: false,
    escalatedToHuman: true,
    humanAgent: "Priya Sharma",
    replacementApproved: false,
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
      mode: "Qwen-powered workflow concept — demo mode",
      intent: "Account Security / 2FA Reset",
      rootCause: "User phone number change.",
      recommendedResolution: ["Escalate to human agent for manual identity check."],
      confidence: "High (95.0%)"
    }
  },
  {
    id: "#RV-4680",
    customerId: "CUST-5002",
    customerName: "Vikram Das",
    orderId: "#RV-4680",
    intentsSummary: "Wrong Item Delivered",
    detectedIntents: [
      { id: 1, label: "WRONG ITEM", category: "Logistics" }
    ],
    priority: "HIGH",
    status: "INVESTIGATING",
    created: "4 hrs ago",
    timestamp: "10:15:00",
    owner: "ResolveAI",
    customerMessage: "I ordered white earbuds but received black ones in order #RV-4680.",
    investigationCompleted: false,
    refundInitiated: false,
    escalatedToHuman: false,
    humanAgent: null,
    replacementApproved: false,
    timelineEvents: [
      { time: "10:15:02", title: "Order located", details: "#RV-4680 Smart ANC Earbuds", status: "completed" }
    ],
    evidence: {
      payment: "TX-7734 verified.",
      delivery: "Delivered.",
      complaint: "SKU mismatch.",
      policyRefund: "Eligible",
      policyReplacement: "Eligible"
    },
    qwenAnalysis: {
      role: "AI Reasoning Engine",
      mode: "Qwen-powered workflow concept — demo mode",
      intent: "Product mispack",
      rootCause: "Warehouse packing error.",
      recommendedResolution: ["Issue return shipping label and queue replacement."],
      confidence: "High (96.5%)"
    }
  }
];

// Escalations queue derived or synced
const getEscalationsFromCases = (cases) => {
  return cases
    .filter(c => c.escalatedToHuman || c.status === "ESCALATED")
    .map(c => ({
      caseId: c.id,
      priority: c.priority,
      customerName: c.customerName,
      reason: c.id === "#RV-4821" 
        ? "Replacement request requires human approval per Policy §7.1" 
        : "Manual identity verification required for 2FA phone update",
      aiRecommendation: c.id === "#RV-4821"
        ? "Approve replacement item dispatch (Duplicate refund auto-completed)"
        : "Verify customer ID document and reset 2FA",
      agent: c.humanAgent || "Priya Sharma",
      status: c.status === "RESOLVED" ? "RESOLVED" : "PENDING",
      timestamp: c.timestamp
    }));
};

// In-Memory Database Store Class
class DataStore {
  constructor() {
    this.resetData();
  }

  resetData() {
    this.customers = JSON.parse(JSON.stringify(initialCustomers));
    this.orders = JSON.parse(JSON.stringify(initialOrders));
    this.payments = JSON.parse(JSON.stringify(initialPayments));
    this.cases = JSON.parse(JSON.stringify(initialCases));
  }

  getCases() {
    return this.cases;
  }

  getCaseById(id) {
    return this.cases.find(c => c.id === id || c.id === `#${id.replace(/^#/, '')}`);
  }

  getCustomers() {
    return this.customers;
  }

  getCustomerById(id) {
    return this.customers.find(c => c.id === id);
  }

  getOrders() {
    return this.orders;
  }

  getOrderById(id) {
    return this.orders.find(o => o.id === id || o.id === `#${id.replace(/^#/, '')}`);
  }

  getPayments() {
    return this.payments;
  }

  getEscalations() {
    return getEscalationsFromCases(this.cases);
  }

  // Action: Trigger/Run AI Investigation simulation for a case
  runInvestigation(caseId) {
    const caseObj = this.getCaseById(caseId);
    if (!caseObj) return null;

    caseObj.status = "INVESTIGATING";
    caseObj.investigationCompleted = true;

    // Ensure timestamp events exist
    const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    if (!caseObj.timelineEvents.some(e => e.title.includes("Investigation completed"))) {
      caseObj.timelineEvents.push({
        time: nowTime,
        title: "Investigation completed",
        details: "Concise auditable findings compiled & Qwen reasoning engine executed",
        status: "completed"
      });
    }

    return caseObj;
  }

  // Action: Initiate Demo Refund for a case
  initiateRefund(caseId, transactionId = "TX-8832") {
    const caseObj = this.getCaseById(caseId);
    if (!caseObj) return null;

    caseObj.refundInitiated = true;
    caseObj.status = caseObj.escalatedToHuman ? "ESCALATED" : "WAITING";

    const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    caseObj.timelineEvents.push({
      time: nowTime,
      title: "Refund workflow initiated [DEMO ACTION]",
      details: `Transaction ${transactionId} marked for duplicate refund ₹4,999. Status: Refund Requested.`,
      status: "completed",
      isDemoAction: true
    });

    return caseObj;
  }

  // Action: Escalate case to human agent (Priya Sharma)
  escalateCase(caseId, reason = "Replacement requires human approval according to demo policy.") {
    const caseObj = this.getCaseById(caseId);
    if (!caseObj) return null;

    caseObj.escalatedToHuman = true;
    caseObj.status = "ESCALATED";
    caseObj.humanAgent = "Priya Sharma";

    const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    caseObj.timelineEvents.push({
      time: nowTime,
      title: "Case escalated to Human Agent",
      details: `Context package compiled. Routed to Senior Support Agent Priya Sharma. Reason: ${reason}`,
      status: "completed"
    });

    return caseObj;
  }

  // Action: Human Agent Approves Replacement
  approveReplacement(caseId) {
    const caseObj = this.getCaseById(caseId);
    if (!caseObj) return null;

    caseObj.replacementApproved = true;
    caseObj.status = "RESOLVED";
    caseObj.owner = caseObj.humanAgent || "Priya Sharma";

    const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    caseObj.timelineEvents.push({
      time: nowTime,
      title: "Replacement Approved by Human Agent [DEMO ACTION]",
      details: `Order #RV-4821 replacement unit dispatch authorized. Replacement Order #REP-4821 created.`,
      status: "completed",
      isDemoAction: true
    });

    caseObj.finalResolutionText = "Hi Arjun,\n\nWe've identified the duplicate payment on order #RV-4821 and initiated the refund workflow.\n\nYour replacement request has also been approved.\n\nNo further information is required from you at this time.\n\n— ResolveAI Support";

    return caseObj;
  }

  // Analytics summary generator
  getAnalytics() {
    const totalCases = this.cases.length;
    const resolvedCases = this.cases.filter(c => c.status === "RESOLVED").length;
    const escalatedCases = this.cases.filter(c => c.escalatedToHuman || c.status === "ESCALATED").length;
    const activeInvestigations = this.cases.filter(c => c.status === "INVESTIGATING").length;

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

export const store = new DataStore();
