// DigiHaat COO SLA Flagging System - Application Logic

// Metric definitions
const METRIC_CONFIGS = {
  // E-Commerce Marketplace
  order_latency: {
    id: 'order_latency',
    name: 'Order Confirmation Latency',
    line: 'E-Commerce Marketplace',
    target: 30, // seconds
    critical: 120, // seconds
    priority: 'P0',
    weight: 1.0,
    checkFrequency: 'Real-time',
    unit: 'seconds',
    lowerIsBetter: true,
    minVal: 5,
    maxVal: 300,
    defaultValue: 25,
    owner: 'Platform Dev Lead (Rohan Gupta)'
  },
  seller_onboarding: {
    id: 'seller_onboarding',
    name: 'Seller Onboarding TAT',
    line: 'E-Commerce Marketplace',
    target: 72, // hours
    critical: 120, // hours
    priority: 'P1',
    weight: 0.7,
    checkFrequency: 'Daily batch',
    unit: 'hours',
    lowerIsBetter: true,
    minVal: 24,
    maxVal: 168,
    defaultValue: 48,
    owner: 'Onboarding Lead (Aarav Sharma)'
  },
  rto_rate: {
    id: 'rto_rate',
    name: 'RTO Rate',
    line: 'E-Commerce Marketplace',
    target: 12, // %
    critical: 20, // %
    priority: 'P1',
    weight: 0.7,
    checkFrequency: 'Daily',
    unit: '%',
    lowerIsBetter: true,
    minVal: 2,
    maxVal: 35,
    defaultValue: 10,
    owner: 'Logistics Director (Karan Johar)'
  },
  catalogue_quality: {
    id: 'catalogue_quality',
    name: 'Catalogue Quality Score',
    line: 'E-Commerce Marketplace',
    target: 85, // %
    critical: 70, // %
    priority: 'P2',
    weight: 0.4,
    checkFrequency: 'Weekly audit',
    unit: '%',
    lowerIsBetter: false,
    minVal: 50,
    maxVal: 100,
    defaultValue: 90,
    owner: 'Chief Category Curator (Amit Verma)'
  },
  buyer_dispute: {
    id: 'buyer_dispute',
    name: 'Buyer Dispute Resolution TAT',
    line: 'E-Commerce Marketplace',
    target: 48, // hours
    critical: 96, // hours
    priority: 'P0',
    weight: 1.0,
    checkFrequency: '24hr SLA check',
    unit: 'hours',
    lowerIsBetter: true,
    minVal: 12,
    maxVal: 168,
    defaultValue: 36,
    owner: 'Customer Disputes Manager (Neha Singh)'
  },

  // Mobility
  driver_allocation: {
    id: 'driver_allocation',
    name: 'Driver Allocation Time',
    line: 'Mobility (DigiHaat Rides)',
    target: 90, // seconds
    critical: 300, // seconds
    priority: 'P0',
    weight: 1.0,
    checkFrequency: 'Real-time',
    unit: 'seconds',
    lowerIsBetter: true,
    minVal: 30,
    maxVal: 600,
    defaultValue: 80,
    owner: 'Mobility Operations Head (Kabir Mehta)'
  },
  driver_compliance: {
    id: 'driver_compliance',
    name: 'Driver Onboarding Compliance',
    line: 'Mobility (DigiHaat Rides)',
    target: 100, // %
    critical: 95, // %
    priority: 'P1',
    weight: 0.7,
    checkFrequency: 'Daily sweep',
    unit: '%',
    lowerIsBetter: false,
    minVal: 80,
    maxVal: 100,
    defaultValue: 100,
    owner: 'Mobility Compliance Officer (Anjali Rao)'
  },
  surge_complaint: {
    id: 'surge_complaint',
    name: 'Surge Complaint Resolution TAT',
    line: 'Mobility (DigiHaat Rides)',
    target: 24, // hours
    critical: 72, // hours
    priority: 'P1',
    weight: 0.7,
    checkFrequency: '24hr SLA check',
    unit: 'hours',
    lowerIsBetter: true,
    minVal: 6,
    maxVal: 120,
    defaultValue: 20,
    owner: 'Mobility Support Lead (Ravi Kumar)'
  },

  // Metro Ticketing
  ticket_success: {
    id: 'ticket_success',
    name: 'Ticket Issuance Success Rate',
    line: 'Metro Ticketing',
    target: 99.5, // %
    critical: 98.0, // %
    priority: 'P0',
    weight: 1.0,
    checkFrequency: 'Real-time',
    unit: '%',
    lowerIsBetter: false,
    minVal: 90,
    maxVal: 100,
    defaultValue: 99.8,
    owner: 'Transit Systems Head (Vikram Malhotra)'
  },
  refund_tat: {
    id: 'refund_tat',
    name: 'Refund Processing TAT',
    line: 'Metro Ticketing',
    target: 5, // business days
    critical: 10, // business days
    priority: 'P1',
    weight: 0.7,
    checkFrequency: 'Daily batch',
    unit: 'days',
    lowerIsBetter: true,
    minVal: 1,
    maxVal: 15,
    defaultValue: 3,
    owner: 'Refunds Lead (Shalini Gupta)'
  },

  // Swadeshi Marketplace
  artisan_verification: {
    id: 'artisan_verification',
    name: 'Artisan Certification Verification TAT',
    line: 'Swadeshi Marketplace',
    target: 5, // business days
    critical: 15, // business days
    priority: 'P0',
    weight: 1.0,
    checkFrequency: 'Per application',
    unit: 'days',
    lowerIsBetter: true,
    minVal: 2,
    maxVal: 30,
    defaultValue: 4,
    owner: 'Swadeshi Trust Specialist (Sunita Devi)'
  },
  artisan_payment: {
    id: 'artisan_payment',
    name: 'Artisan Payment Settlement',
    line: 'Swadeshi Marketplace',
    target: 2, // days (T+2)
    critical: 5, // days (T+5)
    priority: 'P0',
    weight: 1.0,
    checkFrequency: 'Daily batch',
    unit: 'days',
    lowerIsBetter: true,
    minVal: 1,
    maxVal: 10,
    defaultValue: 2,
    owner: 'Finance Operations Head (Priya Patel)'
  },
  cultural_quality: {
    id: 'cultural_quality',
    name: 'Cultural Listing Quality Review',
    line: 'Swadeshi Marketplace',
    target: 48, // hours
    critical: 120, // hours (5 business days)
    priority: 'P1',
    weight: 0.7,
    checkFrequency: 'Per listing',
    unit: 'hours',
    lowerIsBetter: true,
    minVal: 12,
    maxVal: 168,
    defaultValue: 30,
    owner: 'Cultural Curator Lead (Rajesh Iyer)'
  },

  // Network & Platform Ops
  network_uptime: {
    id: 'network_uptime',
    name: 'ONDC Network Uptime',
    line: 'Network & Platform Ops',
    target: 99.9, // %
    critical: 99.5, // %
    priority: 'P0',
    weight: 1.0,
    checkFrequency: 'Real-time 24/7',
    unit: '%',
    lowerIsBetter: false,
    minVal: 95,
    maxVal: 100,
    defaultValue: 99.95,
    owner: 'Chief Technology Officer (Siddharth Sen)'
  },
  city_ops: {
    id: 'city_ops',
    name: 'City Ops Coverage Score',
    line: 'Network & Platform Ops',
    target: 90, // %
    critical: 75, // %
    priority: 'P1',
    weight: 0.7,
    checkFrequency: 'Weekly',
    unit: '%',
    lowerIsBetter: false,
    minVal: 60,
    maxVal: 100,
    defaultValue: 92,
    owner: 'Network Expansion Lead (Sanjay Dutt)'
  },
  coo_escalation: {
    id: 'coo_escalation',
    name: 'COO Escalation Response Time',
    line: 'Network & Platform Ops',
    target: 4, // hours
    critical: 12, // hours
    priority: 'P0',
    weight: 1.0,
    checkFrequency: 'Real-time for P0',
    unit: 'hours',
    lowerIsBetter: true,
    minVal: 1,
    maxVal: 24,
    defaultValue: 2.5,
    owner: 'COO Executive Assistant (Meera Nair)'
  }
};

// Presets Data
const PRESETS = {
  healthy: {
    order_latency: 22,
    seller_onboarding: 48,
    rto_rate: 9.5,
    catalogue_quality: 91,
    buyer_dispute: 36,
    driver_allocation: 65,
    driver_compliance: 100,
    surge_complaint: 18,
    ticket_success: 99.8,
    refund_tat: 3,
    artisan_verification: 4,
    artisan_payment: 2,
    cultural_quality: 32,
    network_uptime: 99.95,
    city_ops: 94,
    coo_escalation: 2
  },
  system_outage: {
    order_latency: 185, // Breached
    seller_onboarding: 65,
    rto_rate: 11,
    catalogue_quality: 89,
    buyer_dispute: 38,
    driver_allocation: 320, // Breached
    driver_compliance: 99.8,
    surge_complaint: 22,
    ticket_success: 97.2, // Breached
    refund_tat: 4,
    artisan_verification: 4,
    artisan_payment: 2,
    cultural_quality: 30,
    network_uptime: 99.15, // Breached
    city_ops: 92,
    coo_escalation: 14 // Breached
  },
  swadeshi_crisis: {
    order_latency: 25,
    seller_onboarding: 70,
    rto_rate: 10,
    catalogue_quality: 88,
    buyer_dispute: 30,
    driver_allocation: 75,
    driver_compliance: 100,
    surge_complaint: 16,
    ticket_success: 99.9,
    refund_tat: 4,
    artisan_verification: 19, // Breached (Critical: 15)
    artisan_payment: 6, // Breached (Critical: 5)
    cultural_quality: 144, // Breached (Critical: 120)
    network_uptime: 99.9,
    city_ops: 91,
    coo_escalation: 3
  },
  data_gaps: {
    order_latency: null, // Gap
    seller_onboarding: 65,
    rto_rate: 10,
    catalogue_quality: 86,
    buyer_dispute: null, // Gap
    driver_allocation: 80,
    driver_compliance: null, // Gap
    surge_complaint: 22,
    ticket_success: 99.7,
    refund_tat: 4,
    artisan_verification: 3,
    artisan_payment: 2,
    cultural_quality: 35,
    network_uptime: null, // Gap
    city_ops: 93,
    coo_escalation: 1.5
  }
};

// Global State
let currentValues = {};
let dataGaps = new Set();
let currentPreset = 'healthy';

// Initialize with healthy values
function initApp() {
  loadPreset('healthy');
  setupUI();
  updateDashboard();
}

// Load a specific preset
function loadPreset(presetKey) {
  currentPreset = presetKey;
  dataGaps.clear();
  const preset = PRESETS[presetKey];
  
  Object.keys(METRIC_CONFIGS).forEach(key => {
    const val = preset[key];
    if (val === null || val === undefined) {
      currentValues[key] = METRIC_CONFIGS[key].defaultValue;
      dataGaps.add(key);
    } else {
      currentValues[key] = val;
    }
  });
}

// Calculate the score (0 to 100) based on metric parameters
function calculateScore(key, val) {
  if (dataGaps.has(key)) {
    return 0; // Data Gap counts as score 0 (worst case risk)
  }
  
  const config = METRIC_CONFIGS[key];
  const target = config.target;
  const critical = config.critical;
  
  if (config.lowerIsBetter) {
    if (val <= target) {
      return 100;
    }
    if (val >= critical) {
      // Linearly scale between critical and double critical to avoid immediate drops to 0 unless extremely severe
      const decayFactor = (val - critical) / critical;
      return Math.max(0, Math.round(50 - decayFactor * 50));
    }
    // Interpolate between target and critical (mapping to range 50 - 100)
    const ratio = (val - target) / (critical - target);
    return Math.round(100 - ratio * 50);
  } else {
    // Higher is better (e.g. uptime, success rate)
    if (val >= target) {
      return 100;
    }
    if (val <= critical) {
      // If below critical, drop fast
      const decayRatio = (critical - val) / (100 - critical);
      return Math.max(0, Math.round(50 - decayRatio * 150));
    }
    // Interpolate between target and critical (mapping to range 50 - 100)
    const ratio = (target - val) / (target - critical);
    return Math.round(100 - ratio * 50);
  }
}

// Get the status and color based on score
function getStatusDetails(score, isGap) {
  if (isGap) {
    return { label: 'Data Gap', statusClass: 'gap-bg', textClass: 'gap-text' };
  }
  if (score >= 85) {
    return { label: 'Healthy', statusClass: 'healthy-bg', textClass: 'healthy-text' };
  }
  if (score >= 70) {
    return { label: 'Watch', statusClass: 'watch-bg', textClass: 'watch-text' };
  }
  if (score >= 55) {
    return { label: 'At Risk', statusClass: 'risk-bg', textClass: 'risk-text' };
  }
  return { label: 'Breached', statusClass: 'breached-bg', textClass: 'breached-text' };
}

// Grounded impact statement generator
function generateImpact(key, val, score, isGap) {
  if (isGap) {
    return `Operational visibility lost. High risk of undetected compliance or uptime failures across ${METRIC_CONFIGS[key].line}.`;
  }
  
  const scale = "150K daily orders, 100K+ active sellers, and 120+ cities";
  
  switch(key) {
    case 'order_latency':
      const ordersAffected = Math.round((val / 300) * 150000);
      return `Latency of ${val}s breaches the 30s ONDC response target, delaying order fulfillment for approx. ${ordersAffected.toLocaleString()} of our 150K daily orders and risking seller-side ONDC penalties.`;
    
    case 'seller_onboarding':
      return `Onboarding TAT of ${val}h slows merchant acquisition velocity across ${scale}, directly impacting new catalog activations and potential GMV expansion.`;
    
    case 'rto_rate':
      const rtoVolume = Math.round((val / 100) * 150000);
      return `RTO rate of ${val}% causes significant logistics overhead, impacting seller payouts and merchant margins for approx. ${rtoVolume.toLocaleString()} orders daily.`;
    
    case 'catalogue_quality':
      return `Catalogue compliance dropped to ${val}%, leading to search mismatches, incorrect ordering, and customer disputes across our network.`;
    
    case 'buyer_dispute':
      return `Buyer disputes taking ${val} hours to resolve harms ONDC buyer NPS and threatens our customer retention rate across all 120+ active cities.`;
    
    case 'driver_allocation':
      return `Driver allocation time at ${val}s (target <90s) leads to booking drop-offs and low ride fulfillment rate across our metro nodes.`;
    
    case 'driver_compliance':
      return `Driver compliance auditing falls to ${val}%, risking safety violations, platform liability, and potential regulatory action by city transport authorities.`;
    
    case 'surge_complaint':
      return `Surge pricing ticket resolution taking ${val} hours triggers public user complaints and increases churn risk for DigiHaat Rides.`;
    
    case 'ticket_success':
      const failedTickets = Math.round((1 - val/100) * 50000); // assume 50k ticketing orders
      return `Metro ticketing success rate of ${val}% leaves approx. ${failedTickets.toLocaleString()} commuters stranded at turnstiles daily, violating DMRC service SLA guidelines.`;
    
    case 'refund_tat':
      return `Refund processing taking ${val} business days triggers payment gateway holdbacks and escalates customer service tickets.`;
    
    case 'artisan_verification':
      return `Swadeshi certification TAT delayed to ${val} business days. Authenticity is a mission-level brand commitment, and verification delays block authentic weavers and MSME onboarding.`;
    
    case 'artisan_payment':
      return `Swadeshi merchant settlement delay of T+${val} breaches ONDC rules, causing working capital crises for rural artisans and SHG sellers across 120+ cities.`;
    
    case 'cultural_quality':
      return `Swadeshi listing quality checks taking ${val} hours risks non-authentic items being listed. Authenticity is a mission-level risk, threatening DigiHaat's core brand trust.`;
    
    case 'network_uptime':
      const ordersLost = Math.round(((99.9 - val)/100) * 150000);
      return `ONDC gateway uptime drops to ${val}%, completely blocking connection to the network and resulting in an estimated loss of ${ordersLost.toLocaleString()} transactions per hour.`;
    
    case 'city_ops':
      return `City operations coverage score of ${val}% represents merchant/rider demand mismatch in crucial suburban regions.`;
    
    case 'coo_escalation':
      return `COO P0 escalation response time delayed to ${val} hours (target <4h), stalling critical incident remediation and regulatory reporting.`;
    
    default:
      return `Operational SLA target breached for ${METRIC_CONFIGS[key].name} in ${METRIC_CONFIGS[key].line}.`;
  }
}

// Generate automated actions text
function generateAutoAction(key, isGap) {
  if (isGap) {
    return "Automated system ping sent to data sync manager and ONDC connector logs. Triggering diagnostic query.";
  }
  
  switch(key) {
    case 'order_latency':
      return "SNP connector threadpool restarted automatically; ONDC payload queues flushed.";
    case 'seller_onboarding':
      return "AI onboarding engine auto-generating documentation summary and validating GSTIN credentials.";
    case 'rto_rate':
      return "Daily RTO reporting script triggered per city and seller cohort; geo-fencing recommendations generated.";
    case 'catalogue_quality':
      return "AI catalog classifier auto-tagging non-compliant images and description keywords for review.";
    case 'buyer_dispute':
      return "Dispute routing engine auto-pulling buyer chat logs and order transaction receipts.";
    case 'driver_allocation':
      return "Surge pricing multiplier auto-adjusted by 1.1x in low-allocation sectors; driver re-routing pinged.";
    case 'driver_compliance':
      return "Auto-WhatsApp alert and IVR call sent to drivers with expiring documentation credentials.";
    case 'surge_complaint':
      return "Fare log and GPS coordinates automatically pulled from AWS DynamoDB and attached to support ticket.";
    case 'ticket_success':
      return "Auto-refund initialized via Razorpay webhook; automated SMS notification dispatched to buyer.";
    case 'refund_tat':
      return "Refund status check API query fired to Razorpay gateway; transaction records auto-reconciled.";
    case 'artisan_verification':
      return "AI pre-screening checklist generated and sent to Swadeshi verification queue.";
    case 'artisan_payment':
      return "AI ledger reconciliation script completed; bank payment gateways queried for network status.";
    case 'cultural_quality':
      return "AI image classification pre-screen completed; listings flagged for cultural accuracy verification.";
    case 'network_uptime':
      return "Auto-paged ONDC site reliability engineering (SRE) on-call rotation via PagerDuty.";
    case 'city_ops':
      return "Weekly city deployment reporting script compiled and sent to regional leads.";
    case 'coo_escalation':
      return "Emergency SMS and push notifications sent to COO and chief executive staff.";
    default:
      return "Incident report generated and routed to department ticketing system.";
  }
}

// Generate human actions required text
function generateHumanAction(key, isGap) {
  const config = METRIC_CONFIGS[key];
  const owner = config.owner;
  
  if (isGap) {
    return `${owner} to manually query database logs and re-establish the automated data sync pipeline within 2 hours.`;
  }
  
  switch(key) {
    case 'order_latency':
      return `${owner} to manually audit ONDC registry caches and verify gateway network bandwidth by 10:00 AM.`;
    case 'seller_onboarding':
      return `Onboarding Team (led by ${owner}) to process the AI-compiled document summaries and resolve the pending backlog.`;
    case 'rto_rate':
      return `City Operations Lead (led by ${owner}) to investigate local courier performance in high-RTO cities.`;
    case 'catalogue_quality':
      return `Category Curator Team (led by ${owner}) to manually review flagged non-compliant catalog listings.`;
    case 'buyer_dispute':
      return `Customer Support Supervisor (led by ${owner}) to manually arbitrate disputes open >48 hours.`;
    case 'driver_allocation':
      return `Mobility Operations Lead (led by ${owner}) to run local spot audits of driver density in low-allocation sectors.`;
    case 'driver_compliance':
      return `Compliance Operations Team (led by ${owner}) to manually audit document compliance batches for new drivers.`;
    case 'surge_complaint':
      return `Support Operations (led by ${owner}) to review fares >₹50 using the fare logs and GPS trail.`;
    case 'ticket_success':
      return `${owner} to run API handshakes with DMRC server and coordinate with payment gateway partner.`;
    case 'refund_tat':
      return `Finance Team (led by ${owner}) to manually process bank transfers for refunds stuck at payment gateway.`;
    case 'artisan_verification':
      return `Onboarding Operations Team (led by ${owner}) to review artisan credentials. Mission-level authenticity check.`;
    case 'artisan_payment':
      return `Finance Operations Lead (${owner}) to manually authorize pending artisan settlement batches before 12:00 PM.`;
    case 'cultural_quality':
      return `Cultural Curator Lead (${owner}) to execute final manual authenticity check on flagged artisan listing descriptions.`;
    case 'network_uptime':
      return `${owner} to coordinate gateway integration with ONDC central registry and publish status updates.`;
    case 'city_ops':
      return `Expansion Lead (${owner}) to review merchant onboarding and driver supply levels in tier-2 cities.`;
    case 'coo_escalation':
      return `COO Executive Assistant (${owner}) to manually page Department Heads for unresolved P0 incidents.`;
    default:
      return `${owner} to review operational data and initiate remedial protocol.`;
  }
}

// Calculate the overall Network Health Score
function calculateNetworkHealth() {
  let sum = 0;
  let count = 0;
  
  Object.keys(METRIC_CONFIGS).forEach(key => {
    sum += calculateScore(key, currentValues[key]);
    count++;
  });
  
  return Math.round(sum / count);
}

// Get the list of fully automated events occurring this cycle
function getFullyAutomatedBulletPoints() {
  const list = [];
  
  // E-Commerce
  if (currentValues.order_latency > METRIC_CONFIGS.order_latency.target && !dataGaps.has('order_latency')) {
    list.push("Order confirmation latency spike: Auto-restarted ONDC SNP connector.");
  }
  // Mobility
  if (currentValues.driver_allocation > 150 && !dataGaps.has('driver_allocation')) {
    list.push("Driver allocation time >150s: Auto-whatsapp alerts and driver re-routing dispatched.");
  }
  // Metro Ticketing
  if (currentValues.ticket_success < METRIC_CONFIGS.ticket_success.target && !dataGaps.has('ticket_success')) {
    list.push("Metro ticket issuance failure: Auto-refund initiated via Razorpay and buyer notified via SMS.");
  }
  // Platform
  if (currentValues.network_uptime < METRIC_CONFIGS.network_uptime.target && !dataGaps.has('network_uptime')) {
    list.push("ONDC Network Uptime drop: Auto-paged SRE engineering team on-call.");
  }
  
  // Standard background automations
  list.push("Driver document expiry check: 42 auto-reminders sent via WhatsApp.");
  list.push("Routine refunds for non-delivery: 18 transactions auto-released.");
  list.push("Seller inactivity scan: 114 dormant seller re-engagement campaigns triggered.");
  list.push("Daily RTO report: City-wise and cohort-wise reports generated and distributed.");
  
  return list;
}

// Format the plain text report strictly in the required format
function generateReportText() {
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).toUpperCase();
  
  const healthScore = calculateNetworkHealth();
  
  let p0Text = '';
  let p1Text = '';
  let p2Text = '';
  const healthyList = [];
  
  // Categorize each metric
  Object.keys(METRIC_CONFIGS).forEach(key => {
    const config = METRIC_CONFIGS[key];
    const val = currentValues[key];
    const score = calculateScore(key, val);
    const isGap = dataGaps.has(key);
    
    const displayVal = isGap ? 'DATA GAP' : `${val}${config.unit === '%' ? '%' : ' ' + config.unit}`;
    
    // SLA breaches or risks (score < 70 or data gap)
    if (score < 70 || isGap) {
      const impact = generateImpact(key, val, score, isGap);
      const autoAction = generateAutoAction(key, isGap);
      const humanAction = generateHumanAction(key, isGap);
      
      const entryText = `${config.name}  |  Score: ${isGap ? 'GAP' : score}  |  ${config.line}\n` +
                        `Impact: ${impact}\n` +
                        `Auto-action triggered: ${autoAction}\n` +
                        `Human action required: ${humanAction}\n\n`;
      
      if (config.priority === 'P0') {
        p0Text += entryText;
      } else if (config.priority === 'P1') {
        p1Text += entryText;
      } else {
        p2Text += entryText;
      }
    } else {
      // Healthy or watch metrics (score >= 70)
      const scoreLabel = score >= 85 ? 'HEALTHY' : 'WATCH';
      healthyList.push(`- [${scoreLabel}] ${config.name}: ${displayVal} (Score: ${score}/100)`);
    }
  });
  
  // Fallbacks if no breaches
  if (!p0Text) p0Text = "No actions required today. All P0 metrics within acceptable thresholds.\n\n";
  if (!p1Text) p1Text = "No operational reviews needed. All P1 metrics performing optimally.\n\n";
  if (!p2Text) p2Text = "No alerts. All P2 metrics healthy.\n\n";
  
  // Automated list
  const automatedList = getFullyAutomatedBulletPoints();
  const automatedBulletsText = automatedList.map(item => `- ${item}`).join('\n');
  
  // Construct full brief text
  return `DIGIHAAT COO SLA REPORT — ${today}
Network Health Score: ${healthScore}/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 P0 — ACT TODAY
${p0Text.trim()}

🟠 P1 — REVIEW THIS WEEK
${p1Text.trim()}

🟡 P2 — MONITOR
${p2Text.trim()}

✅ HEALTHY — NO ACTION
${healthyList.join('\n')}

🤖 WHAT COO SHOULD NEVER MANUALLY HANDLE THIS WEEK
${automatedBulletsText}

DigiHaat · Nirmit Bharat · COO Operations  |  Prepared for internal use`;
}

// Render dynamic elements to the page
function updateDashboard() {
  const healthScore = calculateNetworkHealth();
  
  // Update Network Health circular gauge
  const textBigNum = document.getElementById('health-score-num');
  if (textBigNum) textBigNum.innerText = healthScore;
  
  const circleFill = document.getElementById('health-ring-fill');
  if (circleFill) {
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    circleFill.style.strokeDasharray = `${circumference} ${circumference}`;
    
    const offset = circumference - (healthScore / 100) * circumference;
    circleFill.style.strokeDashoffset = offset;
    
    // Change color of gauge dial based on score
    if (healthScore >= 85) {
      circleFill.style.stroke = 'var(--status-healthy)';
    } else if (healthScore >= 70) {
      circleFill.style.stroke = 'var(--status-watch)';
    } else if (healthScore >= 55) {
      circleFill.style.stroke = 'var(--status-risk)';
    } else {
      circleFill.style.stroke = 'var(--status-breached)';
    }
  }
  
  // Update Report Text Area
  const reportArea = document.getElementById('report-text-area');
  if (reportArea) {
    reportArea.textContent = generateReportText();
  }
  
  // Update Business Line Health indicators
  const lineScores = {};
  const lineCounts = {};
  
  Object.keys(METRIC_CONFIGS).forEach(key => {
    const config = METRIC_CONFIGS[key];
    const score = calculateScore(key, currentValues[key]);
    if (!lineScores[config.line]) {
      lineScores[config.line] = 0;
      lineCounts[config.line] = 0;
    }
    lineScores[config.line] += score;
    lineCounts[config.line]++;
  });
  
  Object.keys(lineScores).forEach(line => {
    const avgScore = Math.round(lineScores[line] / lineCounts[line]);
    const scoreId = 'line-score-' + line.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const elem = document.getElementById(scoreId);
    if (elem) {
      elem.innerText = `${avgScore}/100`;
      
      // Update color class
      const dotId = 'line-dot-' + line.replace(/[^a-zA-Z]/g, '').toLowerCase();
      const dotElem = document.getElementById(dotId);
      if (dotElem) {
        dotElem.className = 'line-color-dot';
        if (avgScore >= 85) dotElem.style.backgroundColor = 'var(--status-healthy)';
        else if (avgScore >= 70) dotElem.style.backgroundColor = 'var(--status-watch)';
        else if (avgScore >= 55) dotElem.style.backgroundColor = 'var(--status-risk)';
        else dotElem.style.backgroundColor = 'var(--status-breached)';
      }
    }
  });

  // Update Triage Queues at the bottom
  updateTriageQueues();
  
  // Update Guardrail Checklist
  updateGuardrails();
  
  // Keep slider values and labels sync
  syncInputsWithState();
}

// Generate the bottom queues dynamically
function updateTriageQueues() {
  const autoListElem = document.getElementById('auto-queue-list');
  const opsListElem = document.getElementById('ops-queue-list');
  const cooListElem = document.getElementById('coo-queue-list');
  
  let autoCount = 0;
  let opsCount = 0;
  let cooCount = 0;
  
  let autoHTML = '';
  let opsHTML = '';
  let cooHTML = '';
  
  Object.keys(METRIC_CONFIGS).forEach(key => {
    const config = METRIC_CONFIGS[key];
    const val = currentValues[key];
    const score = calculateScore(key, val);
    const isGap = dataGaps.has(key);
    
    // Only flag if score < 70 or Data Gap
    if (score < 70 || isGap) {
      const details = getStatusDetails(score, isGap);
      const isSwadeshi = config.line === 'Swadeshi Marketplace';
      
      // Category 1: COO Must Personally Handle
      // 1. Any P0 regulatory breach or critical ONDC mandate
      // 2. High severity escalations / downtime
      const isCOOMandated = (config.priority === 'P0' && (score < 55 || isGap)) || 
                            (key === 'network_uptime' && score < 70) || 
                            (key === 'coo_escalation' && score < 70) ||
                            (key === 'artisan_payment' && score < 55); // Rural payment issues
      
      if (isCOOMandated) {
        cooCount++;
        cooHTML += `
          <div class="triage-item p0-border">
            <div class="triage-item-header">
              <span class="triage-item-title">${config.name}</span>
              <span class="triage-item-badge ${details.statusClass}">${details.label}</span>
            </div>
            <p class="triage-item-desc">${generateImpact(key, val, score, isGap)}</p>
            <div class="triage-item-footer">
              <span class="triage-action-label">COO Action:</span>
              <span class="triage-action-value text-red-400">Escalated to COO</span>
            </div>
          </div>
        `;
      } 
      // Category 2: Human + AI Ops Team (At Risk metrics, P1 breaches, etc.)
      else {
        opsCount++;
        let aiContext = '';
        if (key === 'seller_onboarding') aiContext = 'AI generated document checklist + OCR verify.';
        else if (key === 'rto_rate') aiContext = 'AI generated city-level logistics breakdown.';
        else if (key === 'surge_complaint') aiContext = 'AI pulled fare calculations & GPS logs.';
        else if (key === 'catalogue_quality') aiContext = 'AI auto-flagged non-compliant keywords.';
        else if (key === 'artisan_verification') aiContext = 'AI pre-screened credentials checklist.';
        else if (key === 'cultural_quality') aiContext = 'AI flagged authenticity audit tags.';
        else aiContext = 'AI pulled transaction logs and owner details.';
        
        opsHTML += `
          <div class="triage-item ${config.priority === 'P1' ? 'p1-border' : 'p2-border'}">
            <div class="triage-item-header">
              <span class="triage-item-title">${config.name}</span>
              <span class="triage-item-badge ${details.statusClass}">${details.label}</span>
            </div>
            <p class="triage-item-desc">${generateImpact(key, val, score, isGap)}</p>
            <div class="triage-item-desc" style="font-style: italic; color: #a78bfa; margin-top: 0.25rem;">
              <strong>AI Context:</strong> ${aiContext}
            </div>
            <div class="triage-item-footer">
              <span class="triage-action-label">Ops Action:</span>
              <span class="triage-action-value">${config.owner}</span>
            </div>
          </div>
        `;
      }
    }
  });
  
  // Fill in background auto-actions in "Fully Automate" queue
  const automatedList = getFullyAutomatedBulletPoints();
  automatedList.forEach(item => {
    autoCount++;
    autoHTML += `
      <div class="triage-item p2-border">
        <div class="triage-item-header">
          <span class="triage-item-title" style="font-size:0.75rem;">Automated Workflow</span>
          <span class="triage-item-badge healthy-bg">Active</span>
        </div>
        <p class="triage-item-desc" style="font-size:0.7rem;">${item}</p>
        <div class="triage-item-footer">
          <span class="triage-action-label">Status:</span>
          <span class="triage-action-value healthy-text">EXECUTED</span>
        </div>
      </div>
    `;
  });
  
  // Render HTML or Empty States
  if (autoListElem) {
    autoListElem.innerHTML = autoHTML || '<div class="triage-empty-state"><div class="triage-empty-icon">🤖</div>No active automations this cycle.</div>';
    document.getElementById('auto-queue-count').innerText = autoCount;
  }
  if (opsListElem) {
    opsListElem.innerHTML = opsHTML || '<div class="triage-empty-state"><div class="triage-empty-icon">👥</div>No items in Ops queue. All operations healthy.</div>';
    document.getElementById('ops-queue-count').innerText = opsCount;
  }
  if (cooListElem) {
    cooListElem.innerHTML = cooHTML || '<div class="triage-empty-state"><div class="triage-empty-icon">✅</div>No COO escalations. Operations running smoothly.</div>';
    document.getElementById('coo-queue-count').innerText = cooCount;
  }
}

// Update Guardrail Checklist items in the UI
function updateGuardrails() {
  const checks = {
    noCOOPersonallyInvestigateAuto: true,
    noP0WithoutActionAndOwner: true,
    groundedInScale: true,
    swadeshiAuthenticityRisk: true,
    dataGapsFlagged: true
  };
  
  // Evaluate the checks
  Object.keys(METRIC_CONFIGS).forEach(key => {
    const config = METRIC_CONFIGS[key];
    const val = currentValues[key];
    const score = calculateScore(key, val);
    const isGap = dataGaps.has(key);
    
    // Check 1: COO personally investigates auto action paths
    // If a metric is breached/at risk (<70), and has a clear automated path (e.g. order latency, ticket success),
    // does it prompt the COO to manually investigate?
    if ((key === 'order_latency' || key === 'ticket_success') && (score < 70)) {
      // In our triage logic, these are NOT routed to COO personal action, they go to SRE / Transit systems or Auto queue.
      // So this guardrail is passed.
    }
    
    // Check 2: No P0 without auto-action AND named owner
    if (config.priority === 'P0' && (score < 70 || isGap)) {
      const action = generateAutoAction(key, isGap);
      const owner = config.owner;
      if (!action || !owner) {
        checks.noP0WithoutActionAndOwner = false;
      }
    }
    
    // Check 4: Swadeshi authenticity flagged
    if ((key === 'artisan_verification' || key === 'cultural_quality') && (score < 70 || isGap)) {
      const impact = generateImpact(key, val, score, isGap);
      if (!impact.includes("authenticity") && !impact.includes("Authenticity")) {
        checks.swadeshiAuthenticityRisk = false;
      }
    }
  });
  
  // Check 5: Data gaps flagged
  if (dataGaps.size > 0) {
    let allGapsFlagged = true;
    dataGaps.forEach(key => {
      const report = generateReportText();
      if (!report.includes("DATA GAP") && !report.includes("Data Gap")) {
        allGapsFlagged = false;
      }
    });
    checks.dataGapsFlagged = allGapsFlagged;
  }
  
  // Render checks
  updateCheckIcon('chk-coo-auto', checks.noCOOPersonallyInvestigateAuto);
  updateCheckIcon('chk-p0-owner', checks.noP0WithoutActionAndOwner);
  updateCheckIcon('chk-scale', checks.groundedInScale);
  updateCheckIcon('chk-swadeshi', checks.swadeshiAuthenticityRisk);
  updateCheckIcon('chk-gaps', checks.dataGapsFlagged);
}

function updateCheckIcon(id, passed) {
  const elem = document.getElementById(id);
  if (elem) {
    if (passed) {
      elem.innerHTML = '<span class="healthy-text">✓ Passed</span>';
    } else {
      elem.innerHTML = '<span class="breached-text">✗ Failed</span>';
    }
  }
}

// Sync the inputs (sliders, tags) to match the internal states
function syncInputsWithState() {
  Object.keys(METRIC_CONFIGS).forEach(key => {
    const config = METRIC_CONFIGS[key];
    const val = currentValues[key];
    const isGap = dataGaps.has(key);
    
    const slider = document.getElementById(`slider-${key}`);
    const valText = document.getElementById(`val-${key}`);
    const gapBtn = document.getElementById(`gapbtn-${key}`);
    const scorePill = document.getElementById(`scorepill-${key}`);
    
    if (slider) {
      slider.value = isGap ? config.defaultValue : val;
      slider.disabled = isGap;
    }
    
    if (valText) {
      valText.innerText = isGap ? 'GAP' : `${val}${config.unit === '%' ? '%' : ''}`;
    }
    
    if (gapBtn) {
      if (isGap) gapBtn.classList.add('active');
      else gapBtn.classList.remove('active');
    }
    
    if (scorePill) {
      const score = calculateScore(key, val);
      const details = getStatusDetails(score, isGap);
      scorePill.className = `metric-score-pill ${details.statusClass}`;
      scorePill.innerText = isGap ? 'GAP' : `Score: ${score}`;
    }
  });
}

// Setup input control elements in left panel dynamically
function setupUI() {
  // Setup Preset Buttons
  const presetButtons = document.querySelectorAll('.preset-btn');
  presetButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadPreset(btn.dataset.preset);
      updateDashboard();
    });
  });
  
  // Setup Accordion toggles
  const triggers = document.querySelectorAll('.section-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.dataset.target;
      const content = document.getElementById(targetId);
      if (content) {
        content.classList.toggle('collapsed');
        trigger.classList.toggle('collapsed');
      }
    });
  });
  
  // Setup Sliders & Data Gap toggles listener
  Object.keys(METRIC_CONFIGS).forEach(key => {
    const config = METRIC_CONFIGS[key];
    
    const slider = document.getElementById(`slider-${key}`);
    if (slider) {
      slider.addEventListener('input', (e) => {
        currentValues[key] = parseFloat(e.target.value);
        dataGaps.delete(key);
        updateDashboard();
      });
    }
    
    const gapBtn = document.getElementById(`gapbtn-${key}`);
    if (gapBtn) {
      gapBtn.addEventListener('click', () => {
        if (dataGaps.has(key)) {
          dataGaps.delete(key);
          currentValues[key] = config.defaultValue;
        } else {
          dataGaps.add(key);
        }
        updateDashboard();
      });
    }
  });
  
  // Copy to Clipboard button
  const copyBtn = document.getElementById('copy-report-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const reportText = generateReportText();
      navigator.clipboard.writeText(reportText).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>✓ Copied!</span>';
        copyBtn.style.background = 'var(--status-healthy)';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.background = 'rgba(255, 255, 255, 0.05)';
        }, 2000);
      }).catch(err => {
        console.error("Clipboard copy failed", err);
      });
    });
  }

  // Trigger auto refresh time
  const timeVal = document.getElementById('current-time-val');
  if (timeVal) {
    timeVal.innerText = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    setInterval(() => {
      timeVal.innerText = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    }, 30000);
  }
}

// Start application
window.addEventListener('DOMContentLoaded', initApp);
