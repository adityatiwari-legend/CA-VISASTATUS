import React, { useState, useEffect } from 'react';
import applicationsData from '../data/applications.json';

/**
 * Screen 4: "Select a demonstration application" Modal
 * Matches exact reference:
 * - Clean dialog with header & close button
 * - Table with radio button selection
 * - Columns: [Radio], Application number, Applicant, Application type, Current status (with colored dot)
 * - Selected row highlighted in soft blue (#EDF4FA)
 * - Footer: [ Use selected application ] (Red) and [ Cancel ] (White/Outline)
 */
export default function DemoModal({ isOpen, onClose, onSelectRecord, initialSelectedId }) {
  const [selectedAppNumber, setSelectedAppNumber] = useState(
    initialSelectedId || applicationsData[0]?.applicationNumber || 'CAN-TRK-95822412'
  );

  useEffect(() => {
    if (initialSelectedId) {
      setSelectedAppNumber(initialSelectedId);
    } else if (applicationsData.length > 0) {
      setSelectedAppNumber(applicationsData[0].applicationNumber);
    }
  }, [initialSelectedId, isOpen]);

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

  const handleConfirm = () => {
    const record = applicationsData.find(a => a.applicationNumber === selectedAppNumber);
    if (record) {
      onSelectRecord(record);
    }
    onClose();
  };

  const getStatusMeta = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('approved')) {
      return { dotColor: '#16A34A', label: 'Approved — Demonstration Only' };
    }
    if (s.includes('refused')) {
      return { dotColor: '#DC2626', label: 'Refused — Demonstration Only' };
    }
    if (s.includes('biometrics required') || s.includes('additional documents') || s.includes('action')) {
      return { dotColor: '#D97706', label: status };
    }
    if (s.includes('processing')) {
      return { dotColor: '#16A34A', label: status };
    }
    if (s.includes('received')) {
      return { dotColor: '#2563EB', label: 'Application in progress' };
    }
    return { dotColor: '#2563EB', label: status };
  };

  return (
    <div 
      className="ca-modal-backdrop"
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="ca-modal-card">
        
        {/* Modal Header */}
        <div className="ca-modal-header">
          <div>
            <h2 className="ca-modal-title" id="modalTitle">
              Select a demonstration application
            </h2>
            <p className="ca-modal-subtitle">
              Choose a record below to automatically populate the form.
            </p>
          </div>
          <button 
            type="button" 
            className="ca-modal-close-btn" 
            onClick={onClose} 
            aria-label="Close dialog"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Modal Body / Table */}
        <div className="ca-modal-body">
          <table className="ca-modal-table">
            <thead>
              <tr>
                <th style={{ width: '44px', textAlign: 'center' }}></th>
                <th scope="col">Application number</th>
                <th scope="col">Applicant</th>
                <th scope="col">Application type</th>
                <th scope="col">Current status</th>
              </tr>
            </thead>
            <tbody>
              {applicationsData.map(app => {
                const isSelected = selectedAppNumber === app.applicationNumber;
                const { dotColor, label } = getStatusMeta(app.status);

                return (
                  <tr 
                    key={app.applicationNumber}
                    className={isSelected ? 'ca-modal-row selected' : 'ca-modal-row'}
                    onClick={() => setSelectedAppNumber(app.applicationNumber)}
                    onDoubleClick={handleConfirm}
                  >
                    <td style={{ textAlign: 'center' }}>
                      <input 
                        type="radio" 
                        name="demoAppSelection"
                        checked={isSelected}
                        onChange={() => setSelectedAppNumber(app.applicationNumber)}
                        aria-label={`Select ${app.applicationNumber}`}
                        className="ca-radio"
                      />
                    </td>
                    <td className="ca-app-num-cell">
                      {app.applicationNumber}
                    </td>
                    <td className="ca-applicant-cell">
                      {app.applicantName}
                    </td>
                    <td className="ca-app-type-cell">
                      {app.applicationType}
                    </td>
                    <td className="ca-status-cell">
                      <span 
                        className="ca-status-dot" 
                        style={{ backgroundColor: dotColor }}
                      />
                      <span>{label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="ca-modal-footer">
          <button
            type="button"
            className="ca-btn-modal-primary"
            onClick={handleConfirm}
          >
            Use selected application
          </button>
          <button 
            type="button" 
            className="ca-btn-modal-cancel" 
            onClick={onClose}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
