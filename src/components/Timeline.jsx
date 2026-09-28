import React from 'react';

/**
 * Enhanced Vertical Application Progress Timeline Component
 * 
 * Visually communicates progress with connecting lines and distinct states:
 * - Completed: solid check circle (green #278400)
 * - Current: red highlighted circle (#D52B1E) with active ring
 * - Action Required: amber warning circle (#E5A100)
 * - Pending: gray outlined circle
 */
export default function Timeline({ timeline }) {
  if (!timeline || !Array.isArray(timeline) || timeline.length === 0) {
    return null;
  }

  return (
    <section className="gov-timeline-container" aria-labelledby="timelineHeading">
      <h2 id="timelineHeading">Application progress</h2>
      <div className="gov-timeline" role="region" aria-label="Application progress milestones">
        {timeline.map((step, index) => {
          const stepStatus = step.status || 'pending';
          
          let markerContent = null;
          let itemClass = stepStatus;

          if (stepStatus === 'completed') {
            markerContent = (
              <svg viewBox="0 0 20 20" aria-hidden="true" style={{ width: '16px', height: '16px', fill: '#FFFFFF' }}>
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            );
          } else if (stepStatus === 'action_required') {
            itemClass = 'action-required';
            markerContent = (
              <svg viewBox="0 0 20 20" aria-hidden="true" style={{ width: '16px', height: '16px', fill: '#FFFFFF' }}>
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            );
          } else if (stepStatus === 'current') {
            // Styled with red center dot via CSS ::after
            markerContent = null;
          } else {
            // Pending: gray outlined circle
            markerContent = null;
          }

          return (
            <div key={index} className={`gov-timeline-item ${itemClass}`}>
              <div 
                className="gov-timeline-node" 
                aria-hidden="true"
              >
                {markerContent}
              </div>
              <div className="gov-timeline-content">
                <h3 className="gov-timeline-title">
                  {step.title}
                </h3>
                {step.date ? (
                  <div className="gov-timeline-date">{step.date}</div>
                ) : (
                  <div className="gov-timeline-date" style={{ color: stepStatus === 'current' ? 'var(--color-red-primary)' : 'var(--color-text-secondary)' }}>
                    {stepStatus === 'current' ? 'In progress' : stepStatus === 'action_required' ? 'Action required' : 'Pending'}
                  </div>
                )}
                {step.description && (
                  <p className="gov-timeline-desc">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
