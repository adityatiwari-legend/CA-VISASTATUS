import React, { useEffect, useRef } from 'react';

/**
 * Canada.ca Government Digital Service Error Summary Component
 * Displays "There is a problem" with red left border, error icon, and bullet points.
 */
export default function ErrorSummary({ errors = [] }) {
  const summaryRef = useRef(null);

  useEffect(() => {
    if (errors.length > 0 && summaryRef.current) {
      summaryRef.current.focus();
    }
  }, [errors]);

  if (!errors || errors.length === 0) return null;

  return (
    <div 
      className="gov-error-summary" 
      ref={summaryRef}
      tabIndex={-1}
      role="alert" 
      aria-labelledby="errorSummaryHeading"
    >
      <div className="gov-error-summary-header">
        <svg className="gov-error-summary-icon" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <h2 className="gov-error-summary-title" id="errorSummaryHeading">
          There is a problem
        </h2>
      </div>
      <ul className="gov-error-summary-list">
        {errors.map((err, idx) => (
          <li key={idx}>
            {typeof err === 'string' ? (
              <span>{err}</span>
            ) : (
              <a href={err.href || '#'}>{err.text}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
