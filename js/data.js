/**
 * Predefined Fictional Demonstration Records
 * Exactly 10 Fictional Records as specified
 * All names, numbers, and dates are completely fictional.
 */

const DEMO_APPLICATIONS = [
  {
    applicationNumber: "DEMO-2026-001",
    applicantName: "Alex Morgan",
    dateOfBirth: "1992-04-15", // 15/04/1992
    displayDob: "15/04/1992",
    applicationType: "Visitor Visa",
    categoryCode: "V-1 Temporary Resident",
    status: "Application Submitted",
    statusClass: "status-submitted",
    statusBadgeType: "info",
    submissionDate: "September 12, 2026",
    lastUpdated: "September 12, 2026",
    currentStage: "Intake & Document Verification",
    office: "Regional Processing Centre — Demo Office",
    estimatedProcessingDays: "14–21 business days",
    biometricsRequired: true,
    biometricsStatus: "Pending submission instructions",
    medicalExamStatus: "Not required at this stage",
    backgroundCheckStatus: "Not started",
    alertType: "info",
    alertTitle: "Application submitted successfully",
    alertMessage: "This demonstration application has been received into the intake queue. The submission package is currently undergoing initial completeness checks.",
    statusExplanation: "Your demonstration application has been successfully submitted and logged in the demonstration queue. Once intake processing is complete, the application status will transition to 'Application Received' and formal document assessment will begin.",
    actionRequired: "No action required at this moment. You will be notified if additional demonstration documents or biometrics are requested.",
    timeline: [
      {
        title: "Application submitted",
        date: "September 12, 2026",
        status: "completed",
        description: "Application package received via online demonstration intake."
      },
      {
        title: "Intake review",
        date: "In progress",
        status: "current",
        description: "Checking completeness of forms and supporting fee records."
      },
      {
        title: "Biometrics collection",
        date: "Pending",
        status: "pending",
        description: "Instructions for biometric capture will follow upon intake approval."
      },
      {
        title: "Background & eligibility review",
        date: "Pending",
        status: "pending",
        description: "Verification of travel intent and eligibility requirements."
      },
      {
        title: "Final decision",
        date: "Pending",
        status: "pending",
        description: "Demonstration determination will be rendered."
      }
    ]
  },
  {
    applicationNumber: "DEMO-2026-002",
    applicantName: "Daniel Carter",
    dateOfBirth: "2001-08-22", // 22/08/2001
    displayDob: "22/08/2001",
    applicationType: "Study Permit",
    categoryCode: "SP-2 Post-Secondary",
    status: "Application Received",
    statusClass: "status-received",
    statusBadgeType: "info",
    submissionDate: "September 04, 2026",
    lastUpdated: "September 08, 2026",
    currentStage: "File Creation & Officer Allocation",
    office: "Central Student Assessment Unit — Demo",
    estimatedProcessingDays: "6–8 weeks",
    biometricsRequired: true,
    biometricsStatus: "Instructions issued on Sep 08, 2026",
    medicalExamStatus: "Exemption verified",
    backgroundCheckStatus: "Pending allocation",
    alertType: "info",
    alertTitle: "Application received and acknowledged",
    alertMessage: "Your demonstration study permit application has completed intake triage and has been officially opened for file review.",
    statusExplanation: "The demonstration processing centre has verified that the mandatory forms and educational institution acceptance documents are included. Your file has been queued for assignment to a reviewing officer.",
    actionRequired: "Ensure your Designated Learning Institution (DLI) acceptance verification remains active. Biometrics collection request is prepared.",
    timeline: [
      {
        title: "Application submitted",
        date: "September 04, 2026",
        status: "completed",
        description: "Applicant submitted study permit request and DLI acceptance letter."
      },
      {
        title: "Application received",
        date: "September 08, 2026",
        status: "completed",
        description: "Completeness check passed. Official file DEMO-2026-002 registered."
      },
      {
        title: "Officer allocation",
        date: "In progress",
        status: "current",
        description: "Queued for primary eligibility and financial sufficiency review."
      },
      {
        title: "Biometrics verification",
        date: "Pending",
        status: "pending",
        description: "Awaiting applicant biometric appointment."
      },
      {
        title: "Final decision",
        date: "Pending",
        status: "pending",
        description: "Final study permit determination."
      }
    ]
  },
  {
    applicationNumber: "DEMO-2026-003",
    applicantName: "Sophia Williams",
    dateOfBirth: "1988-11-10", // 10/11/1988
    displayDob: "10/11/1988",
    applicationType: "Work Permit",
    categoryCode: "WP-LMIA Exempt C20",
    status: "Processing",
    statusClass: "status-processing",
    statusBadgeType: "info",
    submissionDate: "August 20, 2026",
    lastUpdated: "September 18, 2026",
    currentStage: "Eligibility Assessment",
    office: "International Mobility Review Branch — Demo",
    estimatedProcessingDays: "3–4 weeks remaining",
    biometricsRequired: true,
    biometricsStatus: "Enrolled Sep 02, 2026 — Valid",
    medicalExamStatus: "Passed",
    backgroundCheckStatus: "Queued",
    alertType: "info",
    alertTitle: "Application under active assessment",
    alertMessage: "A processing officer is currently reviewing your demonstration employment credentials and employer compliance records.",
    statusExplanation: "This demonstration application is actively being assessed. The reviewing officer is evaluating proof of job qualification, compensation threshold, and temporary entry requirements according to public-service guidelines.",
    actionRequired: "No further action is required at this time. Standard assessment is progressing within normal demonstration operational guidelines.",
    timeline: [
      {
        title: "Application submitted",
        date: "August 20, 2026",
        status: "completed",
        description: "Employer offer letter and work permit package submitted."
      },
      {
        title: "Application received",
        date: "August 24, 2026",
        status: "completed",
        description: "File opened and biometrics instruction issued."
      },
      {
        title: "Biometrics enrolled",
        date: "September 02, 2026",
        status: "completed",
        description: "Biometrics verified and linked to demonstration profile."
      },
      {
        title: "Officer eligibility review",
        date: "In progress",
        status: "current",
        description: "Evaluating foreign worker qualification and employer declaration."
      },
      {
        title: "Final decision",
        date: "Pending",
        status: "pending",
        description: "Issuance of work permit letter of introduction."
      }
    ]
  },
  {
    applicationNumber: "DEMO-2026-004",
    applicantName: "Noah Bennett",
    dateOfBirth: "1995-03-05", // 05/03/1995
    displayDob: "05/03/1995",
    applicationType: "Visitor Visa",
    categoryCode: "V-1 Tourist / Family Visit",
    status: "Biometrics Required",
    statusClass: "status-warning",
    statusBadgeType: "warning",
    submissionDate: "September 10, 2026",
    lastUpdated: "September 14, 2026",
    currentStage: "Biometric Enrolment Pending",
    office: "Consular Services Division — Demo",
    estimatedProcessingDays: "Awaiting biometric appointment",
    biometricsRequired: true,
    biometricsStatus: "Action Required — Biometric Instruction Letter Issued",
    medicalExamStatus: "Not required",
    backgroundCheckStatus: "Paused until biometrics captured",
    alertType: "warning",
    alertTitle: "Action required: Biometrics collection",
    alertMessage: "A Biometric Instruction Letter (BIL) has been generated for this demonstration record. You must book an appointment at a designated Visa Application Centre.",
    statusExplanation: "To continue processing your demonstration visa application, your fingerprints and photo must be enrolled. Processing is temporarily paused until your biometric records are transmitted by the collection centre.",
    actionRequired: "Book an appointment at a demonstration Visa Application Centre (VAC) within 30 days of the instruction date. Bring your passport and demonstration Biometric Instruction Letter.",
    timeline: [
      {
        title: "Application submitted",
        date: "September 10, 2026",
        status: "completed",
        description: "Visitor visa application filed online."
      },
      {
        title: "Application received",
        date: "September 13, 2026",
        status: "completed",
        description: "Initial completeness review completed."
      },
      {
        title: "Biometrics required",
        date: "Action Required",
        status: "current",
        description: "Biometric Instruction Letter (BIL) issued. Waiting for appointment."
      },
      {
        title: "Background verification",
        date: "Pending",
        status: "pending",
        description: "Will begin automatically upon biometrics confirmation."
      },
      {
        title: "Final decision",
        date: "Pending",
        status: "pending",
        description: "Final visitor visa determination."
      }
    ]
  },
  {
    applicationNumber: "DEMO-2026-005",
    applicantName: "Emma Anderson",
    dateOfBirth: "2000-07-19", // 19/07/2000
    displayDob: "19/07/2000",
    applicationType: "Study Permit",
    categoryCode: "SP-1 University Undergraduate",
    status: "Biometrics Completed",
    statusClass: "status-processing",
    statusBadgeType: "info",
    submissionDate: "August 15, 2026",
    lastUpdated: "September 19, 2026",
    currentStage: "Medical & Eligibility Assessment",
    office: "Student Processing Section — Demo",
    estimatedProcessingDays: "2–3 weeks remaining",
    biometricsRequired: true,
    biometricsStatus: "Completed on Sep 18, 2026 — Verified",
    medicalExamStatus: "Passed on Sep 05, 2026",
    backgroundCheckStatus: "In progress",
    alertType: "info",
    alertTitle: "Biometrics confirmed — Review resumed",
    alertMessage: "Biometric details have been successfully received and validated. Demonstration application processing has resumed.",
    statusExplanation: "Your demonstration fingerprints and photograph have been matched and verified against the demonstration immigration database. The application is now with the senior reviewing officer for financial verification and course curriculum validation.",
    actionRequired: "No further action is required from you at this time. We will update this demonstration record as soon as the assessment concludes.",
    timeline: [
      {
        title: "Application submitted",
        date: "August 15, 2026",
        status: "completed",
        description: "Undergraduate study permit package received."
      },
      {
        title: "Application received",
        date: "August 19, 2026",
        status: "completed",
        description: "Completeness check passed."
      },
      {
        title: "Biometrics enrolled & verified",
        date: "September 18, 2026",
        status: "completed",
        description: "Biometric record transmitted and verified."
      },
      {
        title: "Eligibility assessment",
        date: "In progress",
        status: "current",
        description: "Officer verifying financial proof and genuine student intent."
      },
      {
        title: "Final decision",
        date: "Pending",
        status: "pending",
        description: "Demonstration permit decision."
      }
    ]
  },
  {
    applicationNumber: "DEMO-2026-006",
    applicantName: "Lucas Martin",
    dateOfBirth: "1985-01-30", // 30/01/1985
    displayDob: "30/01/1985",
    applicationType: "Permanent Residence",
    categoryCode: "PR-Economic / Provincial Nominee",
    status: "Background Verification",
    statusClass: "status-processing",
    statusBadgeType: "info",
    submissionDate: "May 10, 2026",
    lastUpdated: "September 25, 2026",
    currentStage: "Background & Security Verification",
    office: "Case Processing Centre — Central PR Unit",
    estimatedProcessingDays: "4–6 weeks",
    biometricsRequired: true,
    biometricsStatus: "Completed & Valid",
    medicalExamStatus: "Passed — Valid until May 2027",
    backgroundCheckStatus: "In progress with partner security agencies (Demo)",
    alertType: "info",
    alertTitle: "Background and security screening in progress",
    alertMessage: "This demonstration permanent residence file has satisfied primary statutory eligibility and is currently undergoing standard inter-agency security checks.",
    statusExplanation: "Background verification is an essential standard requirement for all demonstration permanent residence applications. This involves routine verification of identity, international travel history, and security clearances. Timeframes vary depending on travel history complexity.",
    actionRequired: "Ensure your contact email and residence address remain up to date. You will be notified when verification finishes.",
    timeline: [
      {
        title: "Application submitted",
        date: "May 10, 2026",
        status: "completed",
        description: "Permanent residence nomination package submitted."
      },
      {
        title: "Acknowledgment of Receipt (AOR)",
        date: "June 02, 2026",
        status: "completed",
        description: "Official confirmation and file number DEMO-2026-006 created."
      },
      {
        title: "Eligibility review passed",
        date: "August 14, 2026",
        status: "completed",
        description: "Officer confirmed work experience, language scores, and police certificates."
      },
      {
        title: "Background verification",
        date: "In progress",
        status: "current",
        description: "Demonstration statutory security and admissibility checks underway."
      },
      {
        title: "Final decision & COPR",
        date: "Pending",
        status: "pending",
        description: "Confirmation of Permanent Residence issuance pending."
      }
    ]
  },
  {
    applicationNumber: "DEMO-2026-007",
    applicantName: "Olivia Wilson",
    dateOfBirth: "1993-09-12", // 12/09/1993
    displayDob: "12/09/1993",
    applicationType: "Work Permit",
    categoryCode: "WP-Intra-Company Transferee",
    status: "Additional Documents Required",
    statusClass: "status-warning",
    statusBadgeType: "warning",
    submissionDate: "July 28, 2026",
    lastUpdated: "September 21, 2026",
    currentStage: "Document Request (ADR) Issued",
    office: "Specialized Processing Centre — Demo",
    estimatedProcessingDays: "Pending document upload",
    biometricsRequired: true,
    biometricsStatus: "Completed",
    medicalExamStatus: "Passed",
    backgroundCheckStatus: "Paused pending documentation",
    alertType: "warning",
    alertTitle: "Important: Additional demonstration documents required",
    alertMessage: "A procedural fairness / document request letter has been issued for this demonstration application. Please review the requested items below.",
    statusExplanation: "During detailed evaluation, the processing officer determined that an updated employment verification letter and proof of continuous qualifying foreign employment are required before a final determination can be reached.",
    actionRequired: "Upload: (1) Updated Letter of Employment signed within the last 30 days, (2) Most recent 3 months of corporate payroll statements. Response deadline: October 21, 2026.",
    timeline: [
      {
        title: "Application submitted",
        date: "July 28, 2026",
        status: "completed",
        description: "Intra-company transferee work permit filed."
      },
      {
        title: "Biometrics & preliminary review",
        date: "August 18, 2026",
        status: "completed",
        description: "Biometrics validated and initial screening conducted."
      },
      {
        title: "Additional documents required",
        date: "Action Required",
        status: "current",
        description: "Official request letter issued for supplementary employment records."
      },
      {
        title: "Review of submitted materials",
        date: "Pending",
        status: "pending",
        description: "Assessment will resume once documents are uploaded."
      },
      {
        title: "Final decision",
        date: "Pending",
        status: "pending",
        description: "Final determination."
      }
    ]
  },
  {
    applicationNumber: "DEMO-2026-008",
    applicantName: "Ethan Brooks",
    dateOfBirth: "1990-06-25", // 25/06/1990
    displayDob: "25/06/1990",
    applicationType: "Express Entry",
    categoryCode: "EE-Federal Skilled Worker Class",
    status: "Decision Pending",
    statusClass: "status-processing",
    statusBadgeType: "info",
    submissionDate: "April 18, 2026",
    lastUpdated: "September 24, 2026",
    currentStage: "Final Review & Sign-off",
    office: "Central Intake & Decisions Directorate — Demo",
    estimatedProcessingDays: "3–7 business days",
    biometricsRequired: true,
    biometricsStatus: "Completed & Verified",
    medicalExamStatus: "Passed",
    backgroundCheckStatus: "Completed successfully",
    alertType: "info",
    alertTitle: "Assessment complete — Final decision pending",
    alertMessage: "All statutory checks, eligibility assessments, and background verifications have concluded. The file is awaiting final supervisory sign-off.",
    statusExplanation: "Your demonstration application has navigated all assessment stages. A designated supervisory officer is completing the final formal administrative review. You will receive an official notification once the decision letter is dispatched.",
    actionRequired: "No action required. The final demonstration outcome will be posted to this portal shortly.",
    timeline: [
      {
        title: "Application submitted",
        date: "April 18, 2026",
        status: "completed",
        description: "Express Entry post-ITA electronic application submitted."
      },
      {
        title: "Eligibility assessment",
        date: "June 29, 2026",
        status: "completed",
        description: "Comprehensive Ranking System (CRS) credentials verified."
      },
      {
        title: "Background & medical clearance",
        date: "September 15, 2026",
        status: "completed",
        description: "Security and medical clearances successfully confirmed."
      },
      {
        title: "Final decision pending",
        date: "In progress",
        status: "current",
        description: "Supervising officer conducting final file authorization."
      },
      {
        title: "Official decision dispatch",
        date: "Pending",
        status: "pending",
        description: "Issuance of demonstration decision notification."
      }
    ]
  },
  {
    applicationNumber: "DEMO-2026-009",
    applicantName: "Mia Thompson",
    dateOfBirth: "1997-12-08", // 08/12/1997
    displayDob: "08/12/1997",
    applicationType: "Visitor Visa",
    categoryCode: "V-1 Multiple Entry",
    status: "Approved — Demonstration Only",
    statusClass: "status-approved",
    statusBadgeType: "success",
    submissionDate: "August 02, 2026",
    lastUpdated: "September 22, 2026",
    currentStage: "Demonstration Document Ready",
    office: "Consular Services Processing Network — Demo",
    estimatedProcessingDays: "Completed",
    biometricsRequired: true,
    biometricsStatus: "Completed & Archived",
    medicalExamStatus: "Exempt",
    backgroundCheckStatus: "Completed",
    alertType: "success",
    alertTitle: "Application decision: Approved — Demonstration Only",
    alertMessage: "This demonstration application has been reviewed and marked as APPROVED for prototype demonstration purposes. A fictional counterfoil visa record has been issued.",
    statusExplanation: "The demonstration visa application satisfied all simulated statutory criteria under the demonstration immigration framework. A simulated passport submission request / electronic visa counterfoil has been generated for testing.",
    actionRequired: "This is a prototype demonstration record only. No real visa, travel authorization, or travel document has been issued by the Government of Canada.",
    timeline: [
      {
        title: "Application submitted",
        date: "August 02, 2026",
        status: "completed",
        description: "Online application and itinerary details submitted."
      },
      {
        title: "Biometrics verified",
        date: "August 12, 2026",
        status: "completed",
        description: "Fingerprint and photo identity confirmed."
      },
      {
        title: "Eligibility & security check",
        date: "September 05, 2026",
        status: "completed",
        description: "Travel purpose and financial sufficiency validated."
      },
      {
        title: "Approved — Demonstration Only",
        date: "September 22, 2026",
        status: "completed",
        description: "Demonstration approval granted. Counterfoil simulation valid for 5 years."
      }
    ]
  },
  {
    applicationNumber: "DEMO-2026-010",
    applicantName: "James Parker",
    dateOfBirth: "1982-02-14", // 14/02/1982
    displayDob: "14/02/1982",
    applicationType: "Permanent Residence",
    categoryCode: "PR-Federal Skilled Trades",
    status: "Refused — Demonstration Only",
    statusClass: "status-refused",
    statusBadgeType: "danger",
    submissionDate: "March 15, 2026",
    lastUpdated: "September 15, 2026",
    currentStage: "File Closed — Determination Finalized",
    office: "Centralized Refusal Review Section — Demo",
    estimatedProcessingDays: "Closed",
    biometricsRequired: true,
    biometricsStatus: "Completed",
    medicalExamStatus: "Passed",
    backgroundCheckStatus: "Assessment finalized",
    alertType: "danger",
    alertTitle: "Application decision: Refused — Demonstration Only",
    alertMessage: "This demonstration application has received a simulated refusal decision for prototype testing purposes.",
    statusExplanation: "Following complete evaluation, the demonstration officer determined that the simulated submission did not meet the mandatory continuous qualifying trades experience requirements under the demonstration criteria.",
    actionRequired: "This is a prototype demonstration record only. A simulated refusal explanation letter is documented for demonstration and UI testing purposes.",
    timeline: [
      {
        title: "Application submitted",
        date: "March 15, 2026",
        status: "completed",
        description: "Permanent residence trades stream application filed."
      },
      {
        title: "Completeness check",
        date: "April 02, 2026",
        status: "completed",
        description: "Initial intake documents accepted."
      },
      {
        title: "Eligibility assessment",
        date: "July 20, 2026",
        status: "completed",
        description: "Officer assessed trade certification and qualifying hours."
      },
      {
        title: "Procedural inquiry issued",
        date: "August 10, 2026",
        status: "completed",
        description: "Opportunity provided to substantiate qualifying experience."
      },
      {
        title: "Refused — Demonstration Only",
        date: "September 15, 2026",
        status: "completed",
        description: "Simulated refusal determination recorded. File archived."
      }
    ]
  }
];

// Helper functions for application queries
function getApplicationByNumber(appNumber) {
  if (!appNumber) return null;
  const clean = appNumber.trim().toUpperCase();
  return DEMO_APPLICATIONS.find(app => app.applicationNumber.toUpperCase() === clean) || null;
}

function getApplicationByFields(appNumber, dob, appType) {
  if (!appNumber) return null;
  const cleanNumber = appNumber.trim().toUpperCase();
  const app = DEMO_APPLICATIONS.find(a => a.applicationNumber.toUpperCase() === cleanNumber);
  
  if (!app) return { error: "not_found", field: "applicationNumber" };
  
  // If DOB is provided, check matching (allow flexible formats: YYYY-MM-DD or DD/MM/YYYY)
  if (dob && dob.trim() !== "") {
    const cleanDob = dob.trim().replace(/\s+/g, "");
    const formattedYMD = app.dateOfBirth; // 1992-04-15
    const [y, m, d] = formattedYMD.split("-");
    const dmySlash = `${d}/${m}/${y}`; // 15/04/1992
    const dmyDash = `${d}-${m}-${y}`;  // 15-04-1992
    
    const matchesDob = 
      cleanDob === formattedYMD || 
      cleanDob === dmySlash || 
      cleanDob === dmyDash ||
      cleanDob.replace(/[-/]/g, "") === `${d}${m}${y}` ||
      cleanDob.replace(/[-/]/g, "") === `${y}${m}${d}`;
      
    if (!matchesDob) {
      return { error: "dob_mismatch", field: "dob" };
    }
  }

  // If application type is provided and not "all", check match
  if (appType && appType !== "all" && appType.trim() !== "") {
    if (app.applicationType.toLowerCase() !== appType.toLowerCase()) {
      return { error: "type_mismatch", field: "applicationType" };
    }
  }

  return { success: true, application: app };
}

// Search index containing services, guides, and demo applications
const SEARCH_INDEX = [
  {
    title: "Check Application Status",
    url: "status.html",
    category: "Services",
    description: "Use the demonstration status checker to view the real-time processing simulation of predefined fictional visa and immigration files."
  },
  {
    title: "Visitor Visas (Temporary Resident)",
    url: "services.html#visitor",
    category: "Visit",
    description: "Find information about requirements, eligibility, processing times, and documentation needed to visit Canada temporarily for tourism or family."
  },
  {
    title: "Study Permits & Student Visas",
    url: "services.html#study",
    category: "Study",
    description: "Understand requirements for attending a Designated Learning Institution, provincial attestation letters (PAL), and post-graduation options."
  },
  {
    title: "Work Permits & Labour Market Verification",
    url: "services.html#work",
    category: "Work",
    description: "Explore employer-specific work permits, open work permits, Intra-Company Transferees, and temporary foreign worker processing."
  },
  {
    title: "Permanent Residence Streams",
    url: "services.html#pr",
    category: "Immigration",
    description: "Overview of economic immigration streams, Express Entry (FSW, CEC, FST), Provincial Nominee Programs (PNP), and family sponsorship."
  },
  {
    title: "Biometrics Collection Guidelines",
    url: "help.html#biometrics",
    category: "Help & Guidance",
    description: "Instructions for booking biometric appointments at Visa Application Centres (VAC), fee guidelines, and Biometric Instruction Letter (BIL) validity."
  },
  {
    title: "Understanding Status Stages & Timelines",
    url: "help.html#status-stages",
    category: "Help & Guidance",
    description: "Detailed breakdown of public-service application statuses: Submitted, Received, Processing, Biometrics Required, and Background Verification."
  },
  {
    title: "Demonstration Portal Disclaimer & Purpose",
    url: "help.html#disclaimer",
    category: "About Demo",
    description: "Important information regarding the fictional nature of this prototype and official links to the real Government of Canada immigration portal."
  },
  // Include demo applicant records in search for quick access
  ...DEMO_APPLICATIONS.map(app => ({
    title: `${app.applicantName} (${app.applicationNumber})`,
    url: `status.html?app=${app.applicationNumber}`,
    category: `Demo Record — ${app.applicationType}`,
    description: `Fictional record for ${app.applicantName} applying for a ${app.applicationType}. Current status: ${app.status}.`
  }))
];
