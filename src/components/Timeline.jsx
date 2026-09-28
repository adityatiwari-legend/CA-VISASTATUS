import React from 'react';

/**
 * Reusable Dynamic Application Progress Timeline Component
 * 
 * Generated dynamically from application.timeline:
 * - Completed: ✓ (Green circle with checkmark)
 * - Current: ● (Red active indicator with ring)
 * - Required action: ! (Warning indicator)
 * - Pending: ○ (Outlined gray marker)
 */
export default function Timeline({ timeline }) {
  if (!timeline || !Array.isArray(timeline) || timeline.length === 0) {
    return null;
  }

  return (
    <div className="gov-timeline-section" style={{ marginTop: '28px', marginBottom: '32px' }}>
      <h2>Application progress timeline</h2>
      <div className="gov-timeline" role="region" aria-label="Application progress milestones">
        {timeline.map((step, index) => {
          const stepStatus = step.status || 'pending';
          
          let markerContent = null;
          let itemClass = stepStatus;

          if (stepStatus === 'completed') {
            markerContent = (
              <svg viewBox="0 0 20 20" aria-hidden="true" style={{ width: '14px', height: '14px', fill: '#FFFFFF' }}>
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            );
          } else if (stepStatus === 'action_required') {
            itemClass = 'current action-required';
            markerContent = (
              <span style={{ fontWeight: '900', fontSize: '13px', color: '#FFFFFF', lineHeight: 1 }}>!</span>
            );
          } else if (stepStatus === 'current') {
            markerContent = null; // Has white dot via CSS ::after
          } else {
            // Pending: empty circle
            markerContent = null;
          }

          return (
            <div key={index} className={`gov-timeline-item ${itemClass}`}>
              <div 
                className="gov-timeline-marker" 
                aria-hidden="true"
                style={stepStatus === 'action_required' ? { backgroundColor: 'var(--color-warning)', borderColor: 'var(--color-warning)' } : undefined}
              >
                {markerContent}
              </div>
              <div className="gov-timeline-content">
                <h3 className="gov-timeline-title" style={{ fontSize: '1.0625rem', marginTop: 0 }}>
                  {step.title}
                </h3>
                {step.date && (
                  <div className="gov-timeline-date">{step.date}</div>
                )}
                {step.description && (
                  <p className="gov-timeline-desc">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
