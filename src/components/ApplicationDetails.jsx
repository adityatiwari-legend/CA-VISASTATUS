import React from 'react';

/**
 * Enhanced 2-Column Application Details Component
 * 
 * Replaces cramped table styling with a clean, highly readable 2-column grid:
 * - Application type
 * - Application number
 * - Submitted date
 * - Last updated
 * - Current stage
 * - Processing office
 * - Biometrics status
 * - Medical examination
 * - Background check
 */
export default function ApplicationDetails({ application }) {
  if (!application) return null;

  const details = application.applicationDetails || {};

  return (
    <section className="gov-details-section" aria-labelledby="detailsHeading">
      <h2 id="detailsHeading">Application details</h2>
      <div className="gov-details-grid">
        
        <div className="gov-details-cell">
          <span className="gov-details-label">Application type</span>
          <div className="gov-details-value">{application.applicationType}</div>
          {details.categoryCode && (
            <span className="text-small" style={{ color: 'var(--color-text-secondary)', display: 'block', marginTop: '2px' }}>
              Category: {details.categoryCode}
            </span>
          )}
        </div>

        <div className="gov-details-cell">
          <span className="gov-details-label">Application number</span>
          <div className="gov-details-value">{application.applicationNumber}</div>
        </div>

        <div className="gov-details-cell">
          <span className="gov-details-label">Submitted</span>
          <div className="gov-details-value">{application.submissionDate}</div>
        </div>

        <div className="gov-details-cell">
          <span className="gov-details-label">Last updated</span>
          <div className="gov-details-value">{application.lastUpdated}</div>
        </div>

        <div className="gov-details-cell">
          <span className="gov-details-label">Current stage</span>
          <div className="gov-details-value" style={{ color: 'var(--color-red-primary)' }}>
            {application.currentStage}
          </div>
        </div>

        {application.office && (
          <div className="gov-details-cell">
            <span className="gov-details-label">Processing office</span>
            <div className="gov-details-value">{application.office}</div>
          </div>
        )}

        {details.biometricsStatus && (
          <div className="gov-details-cell">
            <span className="gov-details-label">Biometrics status</span>
            <div className="gov-details-value">{details.biometricsStatus}</div>
          </div>
        )}

        {details.medicalExam && (
          <div className="gov-details-cell">
            <span className="gov-details-label">Medical examination</span>
            <div className="gov-details-value">{details.medicalExam}</div>
          </div>
        )}

        {details.backgroundCheck && (
          <div className="gov-details-cell">
            <span className="gov-details-label">Background check</span>
            <div className="gov-details-value">{details.backgroundCheck}</div>
          </div>
        )}

        {application.estimatedProcessingDays && (
          <div className="gov-details-cell">
            <span className="gov-details-label">Estimated processing</span>
            <div className="gov-details-value">{application.estimatedProcessingDays}</div>
          </div>
        )}

      </div>
    </section>
  );
}
