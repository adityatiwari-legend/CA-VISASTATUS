import React from 'react';

/**
 * Reusable StatusBadge Component
 * 
 * Decides visual presentation based on status state:
 * - Neutral/Information (Submitted, Received, Processing, Background Verification, Decision Pending)
 * - Warning (Biometrics required, Additional documents required)
 * - Success (Approved — Demonstration Only)
 * - Danger/Error (Refused — Demonstration Only)
 */
export default function StatusBadge({ status }) {
  if (!status) return null;

  const normalized = status.toLowerCase();

  let badgeClass = 'status-processing';

  if (normalized.includes('approved')) {
    badgeClass = 'status-approved';
  } else if (normalized.includes('refused')) {
    badgeClass = 'status-refused';
  } else if (normalized.includes('required') || normalized.includes('warning') || normalized.includes('documents')) {
    badgeClass = 'status-warning';
  } else if (normalized.includes('received')) {
    badgeClass = 'status-received';
  } else if (normalized.includes('submitted')) {
    badgeClass = 'status-submitted';
  }

  return (
    <span className={`gov-badge gov-badge-status ${badgeClass}`} role="status">
      {status}
    </span>
  );
}
