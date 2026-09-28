import React from 'react';
import applicationsData from '../data/applications.json';
import StatusBadge from './StatusBadge';

/**
 * Accessible Demo Applications Modal
 * Lists all 10 fictional demonstration records with 1-click auto-fill capability.
 */
export default function DemoModal({ isOpen, onClose, onSelectRecord }) {
  if (!isOpen) return null;

  return (
    <div 
      className="gov-modal-overlay active" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="gov-modal">
        <div className="gov-modal-header">
          <h2 className="gov-modal-title" id="modalTitle">
            Predefined Demonstration Applications (10 Records)
          </h2>
          <button 
            type="button" 
            className="gov-modal-close" 
            onClick={onClose} 
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>
        <div className="gov-modal-body">
          <p className="text-small" style={{ marginBottom: '16px' }}>
            Select any of the 10 fictional records below to test the status lookup and verification flow. All data is simulated client-side.
          </p>
          <div className="gov-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th scope="col">Application #</th>
                  <th scope="col">Applicant Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">DOB</th>
                  <th scope="col" style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {applicationsData.map(app => (
                  <tr key={app.applicationNumber}>
                    <td><strong>{app.applicationNumber}</strong></td>
                    <td>{app.applicantName}</td>
                    <td>{app.applicationType}</td>
                    <td><StatusBadge status={app.status} /></td>
                    <td><code>{app.displayDob}</code></td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          onSelectRecord(app);
                          onClose();
                        }}
                      >
                        Use Record
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="gov-modal-footer">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
