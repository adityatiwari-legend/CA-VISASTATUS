import React from 'react';
import StatusBadge from './StatusBadge';

/**
 * Reusable Dynamic Application Details Component
 * 
 * Displays clean government-style key-value table:
 * - Application type
 * - Application number
 * - Submission date
 * - Last updated
 * - Current stage
 * - Status
 * Plus supporting administrative criteria (Office, Biometrics, Medical, Background check).
 */
export default function ApplicationDetails({ application }) {
  if (!application) return null;

  const details = application.applicationDetails || {};

  return (
    <div className="gov-details-section" style={{ marginTop: '24px', marginBottom: '32px' }}>
      <h2>Application details</h2>
      <div className="gov-table-container">
        <table className="gov-table gov-table-key-value">
          <caption className="sr-only">Detailed demonstration file records</caption>
          <tbody>
            <tr>
              <th scope="row">Application type</th>
              <td>
                {application.applicationType}
                {details.categoryCode && (
                  <span className="text-small" style={{ display: 'block', color: 'var(--color-text-muted)' }}>
                    Category: {details.categoryCode}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">Application number</th>
              <td><strong>{application.applicationNumber}</strong></td>
            </tr>
            <tr>
              <th scope="row">Applicant full name</th>
              <td>{application.applicantName}</td>
            </tr>
            <tr>
              <th scope="row">Submission date</th>
              <td>{application.submissionDate}</td>
            </tr>
            <tr>
              <th scope="row">Last updated</th>
              <td>{application.lastUpdated}</td>
            </tr>
            <tr>
              <th scope="row">Current stage</th>
              <td><strong>{application.currentStage}</strong></td>
            </tr>
            {application.office && (
              <tr>
                <th scope="row">Processing office</th>
                <td>{application.office}</td>
              </tr>
            )}
            {details.biometricsStatus && (
              <tr>
                <th scope="row">Biometrics status</th>
                <td>{details.biometricsStatus}</td>
              </tr>
            )}
            {details.medicalExam && (
              <tr>
                <th scope="row">Medical examination</th>
                <td>{details.medicalExam}</td>
              </tr>
            )}
            {details.backgroundCheck && (
              <tr>
                <th scope="row">Background check</th>
                <td>{details.backgroundCheck}</td>
              </tr>
            )}
            {application.estimatedProcessingDays && (
              <tr>
                <th scope="row">Estimated processing</th>
                <td>{application.estimatedProcessingDays}</td>
              </tr>
            )}
            <tr>
              <th scope="row">Current status</th>
              <td>
                <StatusBadge status={application.status} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
