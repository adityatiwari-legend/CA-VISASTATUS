/**
 * Application Status Service Layer
 * 
 * Fetches and parses records dynamically from `canada.xlsx` (via `/canada.xlsx`)
 * with fallback to bundled `applications.json`.
 * Supports authentication lookup by:
 * - Tracking ID (e.g. CAN-TRK-95822412)
 * - Passport Number (Username from excel, e.g. T3572678)
 * - Work Permit Document Number (e.g. E816756874)
 * with Date of Birth validation in multiple standard formats.
 */

import * as XLSX from 'xlsx';
import defaultApplicationsData from '../data/applications.json';

const SIMULATED_LATENCY_MS = 350;

// Cache parsed records in memory
let cachedRecords = null;
let loadPromise = null;

/**
 * Normalizes dates from various formats (YYYY-MM-DD, DD/MM/YYYY, etc.)
 * to standard YYYY-MM-DD for reliable comparison.
 */
export function normalizeDate(rawDate) {
  if (!rawDate) return '';
  const clean = String(rawDate).trim().replace(/\s+/g, '');

  // Matches YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    return clean;
  }

  // Matches DD/MM/YYYY or DD-MM-YYYY
  const dmyMatch = clean.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmyMatch) {
    const day = dmyMatch[1].padStart(2, '0');
    const month = dmyMatch[2].padStart(2, '0');
    const year = dmyMatch[3];
    return `${year}-${month}-${day}`;
  }

  return clean;
}

/**
 * Parses raw Excel rows into structured application objects
 */
function parseExcelRows(rawRows) {
  if (!rawRows || rawRows.length < 6) return [];

  const maxCol = Math.max(...rawRows.map(r => (r ? r.length : 0)));
  const records = [];

  for (let c = 1; c < maxCol; c++) {
    const name = rawRows[0] && rawRows[0][c] ? String(rawRows[0][c]).trim() : '';
    if (!name) continue;

    const dobRaw = rawRows[1] ? rawRows[1][c] : '';
    let dobIso = '';
    let dobDisplay = '';

    if (typeof dobRaw === 'number') {
      dobIso = XLSX.SSF.format('yyyy-mm-dd', dobRaw);
      const parts = dobIso.split('-');
      dobDisplay = `${parts[2]}/${parts[1]}/${parts[0]}`;
    } else if (dobRaw instanceof Date) {
      dobIso = dobRaw.toISOString().split('T')[0];
      const parts = dobIso.split('-');
      dobDisplay = `${parts[2]}/${parts[1]}/${parts[0]}`;
    } else if (dobRaw) {
      const str = String(dobRaw).split(' ')[0].trim();
      dobIso = normalizeDate(str);
      const parts = dobIso.split('-');
      dobDisplay = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : str;
    }

    const passport = rawRows[2] && rawRows[2][c] ? String(rawRows[2][c]).trim() : '';
    const workPermit = rawRows[3] && rawRows[3][c] ? String(rawRows[3][c]).trim() : '';
    const country = rawRows[4] && rawRows[4][c] ? String(rawRows[4][c]).trim() : 'Canada';
    const status = rawRows[5] && rawRows[5][c] ? String(rawRows[5][c]).trim() : 'Approved';
    
    // Tracking ID from row 6 or fallback generated
    const trackingId = (rawRows[6] && rawRows[6][c] && String(rawRows[6][c]).trim())
      ? String(rawRows[6][c]).trim()
      : `CAN-TRK-${Math.floor(10000000 + Math.random() * 90000000)}`;

    records.push({
      applicationNumber: trackingId,
      trackingId,
      passportNumber: passport,
      documentNumber: workPermit,
      issuingCountry: country,
      dateOfBirth: dobIso,
      displayDob: dobDisplay,
      applicantName: name,
      applicationType: 'Work Permit',
      status: status || 'Approved',
      submissionDate: 'June 15, 2026',
      lastUpdated: 'September 25, 2026',
      currentStage: 'Final Decision — Approved',
      statusDescription: `Your application for a Canadian Work Permit has been officially approved. Your Work Permit document (No. ${workPermit}) has been issued and registered with Immigration, Refugees and Citizenship Canada (IRCC).`,
      actionRequired: 'Your Work Permit has been approved. Please carry your official approval documentation and valid passport upon entry to Canada.',
      alertType: 'success',
      alertTitle: 'Application Approved',
      office: 'Immigration, Refugees and Citizenship Canada — Operations Support Centre',
      estimatedProcessingDays: 'Completed',
      timeline: [
        {
          title: 'Application submitted',
          date: 'June 15, 2026',
          status: 'completed',
          description: 'Application package and processing fee received.'
        },
        {
          title: 'Biometrics collection & verification',
          date: 'July 02, 2026',
          status: 'completed',
          description: 'Biometrics enrolled and confirmed.'
        },
        {
          title: 'Eligibility & background review',
          date: 'August 20, 2026',
          status: 'completed',
          description: 'Eligibility, documentation, and background review completed.'
        },
        {
          title: 'Final decision — Approved',
          date: 'September 25, 2026',
          status: 'completed',
          description: `Work Permit approved. Document No. ${workPermit} issued.`
        }
      ],
      applicationDetails: {
        categoryCode: 'WP / W-1 Temporary Foreign Worker',
        biometricsStatus: 'Enrolled & Valid',
        medicalExam: 'Passed',
        backgroundCheck: 'Passed',
        documentNumber: workPermit,
        passportNumber: passport,
        issuingCountry: country
      }
    });
  }

  return records;
}

/**
 * Loads applications from canada.xlsx or falls back to bundled JSON
 */
export async function loadApplications() {
  if (cachedRecords && cachedRecords.length > 0) {
    return cachedRecords;
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = (async () => {
    try {
      const response = await fetch('/canada.xlsx');
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        const wb = XLSX.read(buffer, { type: 'array' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const parsed = parseExcelRows(rawRows);
        if (parsed.length > 0) {
          cachedRecords = parsed;
          return cachedRecords;
        }
      }
    } catch (e) {
      console.warn('Could not fetch /canada.xlsx, using bundled applications records:', e);
    }

    cachedRecords = defaultApplicationsData;
    return cachedRecords;
  })();

  return loadPromise;
}

/**
 * Retrieve status for a specific application.
 * Accepts:
 * - Tracking ID (e.g. "CAN-TRK-95822412")
 * - Passport Number (Username, e.g. "T3572678")
 * - Work Permit Document Number (e.g. "E816756874")
 * @param {string} identifier - Tracking ID or Passport Number
 * @param {string} dateOfBirth - e.g. "11/12/1997" or "1997-12-11"
 * @returns {Promise<{ success: boolean, application?: object, error?: string, message?: string }>}
 */
export async function getApplicationStatus(identifier, dateOfBirth) {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_LATENCY_MS));

  if (!identifier || !identifier.trim()) {
    return {
      success: false,
      error: 'MISSING_IDENTIFIER',
      message: 'Enter your Tracking ID or Passport Number.'
    };
  }

  if (!dateOfBirth || !dateOfBirth.trim()) {
    return {
      success: false,
      error: 'MISSING_DOB',
      message: 'Enter your date of birth.'
    };
  }

  const cleanIdentifier = identifier.trim().toUpperCase();
  const normalizedDob = normalizeDate(dateOfBirth);

  const records = await loadApplications();

  // Find record matching Tracking ID, Passport Number, or Document Number
  const record = records.find(app => 
    (app.trackingId && app.trackingId.toUpperCase() === cleanIdentifier) ||
    (app.applicationNumber && app.applicationNumber.toUpperCase() === cleanIdentifier) ||
    (app.passportNumber && app.passportNumber.toUpperCase() === cleanIdentifier) ||
    (app.documentNumber && app.documentNumber.toUpperCase() === cleanIdentifier)
  );

  if (!record) {
    return {
      success: false,
      error: 'NOT_FOUND',
      message: 'We could not find a matching application with the provided Tracking ID or Passport Number.'
    };
  }

  // Verify Date of Birth
  const recordNormalizedDob = normalizeDate(record.dateOfBirth);
  if (normalizedDob !== recordNormalizedDob) {
    return {
      success: false,
      error: 'DOB_MISMATCH',
      message: 'The date of birth entered does not match our records.'
    };
  }

  return {
    success: true,
    application: record
  };
}

/**
 * Retrieve application by identifier alone (e.g. for direct URL parameters).
 */
export async function getApplicationByNumber(identifier) {
  if (!identifier) return null;
  const clean = identifier.trim().toUpperCase();
  const records = await loadApplications();

  return records.find(app => 
    (app.trackingId && app.trackingId.toUpperCase() === clean) ||
    (app.applicationNumber && app.applicationNumber.toUpperCase() === clean) ||
    (app.passportNumber && app.passportNumber.toUpperCase() === clean) ||
    (app.documentNumber && app.documentNumber.toUpperCase() === clean)
  ) || null;
}

/**
 * Retrieve all applications.
 */
export async function getAllApplications() {
  return loadApplications();
}

