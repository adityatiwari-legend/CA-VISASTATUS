import React from 'react';

/**
 * Reusable StatusBadge Component
 * 
 * Provides accessible status indicators with distinct icons, high-contrast labels,
 * and semantic styling for all public-service stages.
 */
export default function StatusBadge({ status, size = 'default' }) {
  if (!status) return null;

  const normalized = status.toLowerCase();

  let badgeClass = 'status-processing';
  let icon = null;
  let accessibleLabel = status;

  if (normalized.includes('approved')) {
    badgeClass = 'status-approved';
    accessibleLabel = `Status: ${status} (Demonstration)`;
    icon = (
      <svg className="gov-badge-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    );
  } else if (normalized.includes('refused')) {
    badgeClass = 'status-refused';
    accessibleLabel = `Status: ${status} (Demonstration)`;
    icon = (
      <svg className="gov-badge-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    );
  } else if (normalized.includes('required') || normalized.includes('additional documents') || normalized.includes('warning')) {
    badgeClass = 'status-warning';
    accessibleLabel = `Action required: ${status}`;
    icon = (
      <svg className="gov-badge-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    );
  } else if (normalized.includes('received')) {
    badgeClass = 'status-received';
    accessibleLabel = `Status: ${status}`;
    icon = (
      <svg className="gov-badge-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    );
  } else if (normalized.includes('submitted')) {
    badgeClass = 'status-submitted';
    accessibleLabel = `Status: ${status}`;
    icon = (
      <svg className="gov-badge-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
    );
  } else if (normalized.includes('background') || normalized.includes('verification')) {
    badgeClass = 'status-processing';
    accessibleLabel = `Status: ${status}`;
    icon = (
      <svg className="gov-badge-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    );
  } else if (normalized.includes('decision pending')) {
    badgeClass = 'status-processing';
    accessibleLabel = `Status: ${status}`;
    icon = (
      <svg className="gov-badge-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    );
  } else {
    // Standard processing
    badgeClass = 'status-processing';
    accessibleLabel = `Status: ${status}`;
    icon = (
      <svg className="gov-badge-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
      </svg>
    );
  }

  const isLarge = size === 'large';

  return (
    <span 
      className={`gov-badge ${badgeClass} ${isLarge ? 'gov-badge-lg' : ''}`} 
      role="status" 
      aria-label={accessibleLabel}
    >
      {icon}
      <span>{status}</span>
    </span>
  );
}
