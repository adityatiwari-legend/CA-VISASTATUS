import React, { useEffect } from 'react';
import applicationsData from '../data/applications.json';
import StatusBadge from './StatusBadge';

/**
 * Professional Demo Application Records Modal Component
 * 
 * Title: Demo application records
 * Subtitle: Select a fictional record to automatically populate the status form.
 * Displays desktop table and turns into stacked cards on mobile.
 */
export default function DemoModal({ isOpen, onClose, onSelectRecord }) {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="gov-modal-overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="gov-modal">
        
        {/* Modal Header */}
        <div className="gov-modal-header">
          <div>
            <h2 className="gov-modal-title" id="modalTitle">
              Demo application records
            </h2>
            <p className="text-small" style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)' }}>
              Select a fictional record to automatically populate the status form.
            </p>
          </div>
          <button 
            type="button" 
            className="gov-modal-close" 
            onClick={onClose} 
            aria-label="Close demo applications dialog"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="gov-modal-body">
          
          {/* Desktop Table View */}
          <div className="gov-modal-table-container">
            <table className="gov-table">
              <thead>
                <tr>
                  <th scope="col">Application #</th>
                  <th scope="col">Applicant</th>
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
                    <td><code style={{ fontSize: '0.875rem' }}>{app.displayDob}</code></td>
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

          {/* Mobile Stacked Cards View (<640px) */}
          <div className="gov-modal-cards-container">
            {applicationsData.map(app => (
              <div key={app.applicationNumber} className="gov-modal-record-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)' }}>
                    {app.applicationNumber}
                  </span>
                  <StatusBadge status={app.status} />
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginBottom: '4px' }}>
                  {app.applicantName}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                  {app.applicationType} &bull; DOB: {app.displayDob}
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                  onClick={() => {
                    onSelectRecord(app);
                    onClose();
                  }}
                >
                  Use This Record
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="gov-modal-footer">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
