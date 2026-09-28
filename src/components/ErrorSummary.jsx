import React, { useEffect, useRef } from 'react';

/**
 * Canada.ca Government-Style Error Summary Component
 * Displays "There is a problem" with bullet points and auto-focuses for screen readers.
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
      className="gov-error-summary visible" 
      ref={summaryRef}
      tabIndex={-1}
      role="alert" 
      aria-labelledby="errorSummaryHeading"
    >
      <h2 className="gov-error-summary-title" id="errorSummaryHeading">
        There is a problem
      </h2>
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
