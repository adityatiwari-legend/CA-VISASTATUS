/**
 * Application Status Service Layer
 * 
 * Separates UI components from data-fetching and business logic.
 * Designed so that `applications.json` can be seamlessly swapped
 * with `fetch('/api/application-status')` in future backend iterations
 * without changing any React UI components.
 */

import applicationsData from '../data/applications.json';

// Simulated network latency to demonstrate government-service loading state
const SIMULATED_LATENCY_MS = 450;

/**
 * Normalizes dates from various formats (YYYY-MM-DD, DD/MM/YYYY, etc.)
 * to standard YYYY-MM-DD for reliable comparison.
 */
function normalizeDate(rawDate) {
  if (!rawDate) return '';
  const clean = rawDate.trim().replace(/\s+/g, '');

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
 * Retrieve status for a specific demonstration application.
 * 
 * @param {string} applicationNumber - e.g. "DEMO-2026-001"
 * @param {string} dateOfBirth - e.g. "2000-01-01" or "01/01/2000"
 * @returns {Promise<{ success: boolean, application?: object, error?: string }>}
 */
export async function getApplicationStatus(applicationNumber, dateOfBirth) {
  // Simulate network request (ready for replacement with fetch('/api/application-status'))
  await new Promise(resolve => setTimeout(resolve, SIMULATED_LATENCY_MS));

  if (!applicationNumber || !applicationNumber.trim()) {
    return {
      success: false,
      error: 'MISSING_APPLICATION_NUMBER',
      message: 'Enter your demonstration application number.'
    };
  }

  if (!dateOfBirth || !dateOfBirth.trim()) {
    return {
      success: false,
      error: 'MISSING_DOB',
      message: 'Enter your date of birth.'
    };
  }

  const cleanAppNum = applicationNumber.trim().toUpperCase();
  const normalizedDob = normalizeDate(dateOfBirth);

  // 1. Locate file by application number
  const record = applicationsData.find(
    app => app.applicationNumber.toUpperCase() === cleanAppNum
  );

  if (!record) {
    return {
      success: false,
      error: 'NOT_FOUND',
      message: 'We could not find a matching demonstration application.'
    };
  }

  // 2. Verify Date of Birth
  const recordNormalizedDob = normalizeDate(record.dateOfBirth);
  if (normalizedDob !== recordNormalizedDob) {
    return {
      success: false,
      error: 'DOB_MISMATCH',
      message: 'The information entered does not match our demonstration records.'
    };
  }

  // 3. Return successfully matched application
  return {
    success: true,
    application: record
  };
}

/**
 * Retrieve application by application number alone (e.g. for direct URL parameters or internal lookups).
 */
export async function getApplicationByNumber(applicationNumber) {
  await new Promise(resolve => setTimeout(resolve, 200));

  if (!applicationNumber) return null;
  const cleanAppNum = applicationNumber.trim().toUpperCase();
  return applicationsData.find(app => app.applicationNumber.toUpperCase() === cleanAppNum) || null;
}

/**
 * Retrieve all demonstration applications for the sample data selector modal.
 */
export async function getAllDemoApplications() {
  return applicationsData;
}
