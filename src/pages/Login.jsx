import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ErrorSummary from '../components/ErrorSummary';
import { getApplicationStatus } from '../services/applicationService';

/**
 * Login / Status Lookup Page
 * 
 * Provides the public-service lookup form:
 * - Application Number
 * - Date of Birth
 * - [ Sign in ] button
 * - Loading spinner & "Checking application status..."
 * - Error handling via ErrorSummary component
 */
export default function Login({ onOpenDemoModal, prefilledRecord }) {
  const navigate = useNavigate();

  const [applicationNumber, setApplicationNumber] = useState(
    prefilledRecord ? prefilledRecord.applicationNumber : ''
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    prefilledRecord ? prefilledRecord.displayDob : ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [hasAppError, setHasAppError] = useState(false);
  const [hasDobError, setHasDobError] = useState(false);

  // If a prefilled record is passed from modal, update inputs
  React.useEffect(() => {
    if (prefilledRecord) {
      setApplicationNumber(prefilledRecord.applicationNumber);
      setDateOfBirth(prefilledRecord.displayDob);
      setErrors([]);
      setHasAppError(false);
      setHasDobError(false);
    }
  }, [prefilledRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setHasAppError(false);
    setHasDobError(false);

    const validationErrors = [];

    if (!applicationNumber.trim()) {
      validationErrors.push('Enter your demonstration application number.');
      setHasAppError(true);
    }

    if (!dateOfBirth.trim()) {
      validationErrors.push('Enter your date of birth.');
      setHasDobError(true);
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Call separated service layer
      const result = await getApplicationStatus(applicationNumber, dateOfBirth);

      if (result.success && result.application) {
        // Navigate to dynamic status result view
        navigate(`/application-status/${encodeURIComponent(result.application.applicationNumber)}`, {
          state: { application: result.application }
        });
      } else {
        // Business logic error state as specified
        if (result.error === 'NOT_FOUND') {
          setErrors(['We could not find a matching demonstration application.']);
          setHasAppError(true);
        } else if (result.error === 'DOB_MISMATCH') {
          setErrors(['The information entered does not match our demonstration records.']);
          setHasDobError(true);
        } else {
          setErrors([result.message || 'An error occurred while verifying the demonstration record.']);
        }
      }
    } catch (err) {
      setErrors(['A connection error occurred. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Breadcrumbs 
        items={[
          { label: 'Home', url: '/' },
          { label: 'Immigration and Visa', url: '/' },
          { label: 'Application Status' }
        ]} 
      />

      <main id="main-content" className="gov-main-content">
        <div className="gov-container">
          <div className="gov-layout-with-sidebar">

            {/* Desktop Left Secondary Navigation */}
            <aside className="gov-sidebar" aria-label="Secondary navigation">
              <nav className="gov-sidebar-nav">
                <div className="gov-sidebar-header">Immigration and Visa</div>
                <ul className="gov-sidebar-list">
                  <li className="gov-sidebar-item">
                    <Link to="/" className="gov-sidebar-link">Overview</Link>
                  </li>
                  <li className="gov-sidebar-item">
                    <Link to="/services#visitor" className="gov-sidebar-link">Visit</Link>
                  </li>
                  <li className="gov-sidebar-item">
                    <Link to="/services#study" className="gov-sidebar-link">Study</Link>
                  </li>
                  <li className="gov-sidebar-item">
                    <Link to="/services#work" className="gov-sidebar-link">Work</Link>
                  </li>
                  <li className="gov-sidebar-item">
                    <Link to="/services#pr" className="gov-sidebar-link">Permanent Residence</Link>
                  </li>
                  <li className="gov-sidebar-item">
                    <Link to="/login" className="gov-sidebar-link active">Application Status</Link>
                  </li>
                  <li className="gov-sidebar-item">
                    <Link to="/help" className="gov-sidebar-link">Help &amp; FAQ</Link>
                  </li>
                </ul>
              </nav>

              {/* Sample Data Helper Box */}
              <div className="gov-alert" style={{ borderLeftColor: 'var(--color-blue-link)', padding: '14px', background: '#FFFFFF', border: '1px solid var(--color-gray-border)', borderLeftWidth: '4px' }}>
                <h3 style={{ fontSize: '0.9375rem', marginTop: 0, marginBottom: '6px' }}>Need sample test data?</h3>
                <p className="text-small" style={{ marginBottom: '10px' }}>
                  Select any of the 10 fictional demonstration records to auto-populate this form.
                </p>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm" 
                  style={{ width: '100%' }}
                  onClick={onOpenDemoModal}
                >
                  View 10 Demo Records
                </button>
              </div>
            </aside>

            {/* Main Column */}
            <section className="gov-main-body" aria-labelledby="statusHeading">
              <h1 id="statusHeading">Check your application status</h1>
              <p className="lead-text">
                Enter your demonstration details below to view file progress and status history.
              </p>

              {/* Canada.ca Error Summary Box */}
              <ErrorSummary errors={errors} />

              {/* Form Section */}
              <form className="gov-form" onSubmit={handleSubmit} noValidate>
                
                {/* Application Number Input */}
                <div className={`gov-form-group ${hasAppError ? 'has-error' : ''}`}>
                  <label htmlFor="applicationNumber" className="gov-form-label">
                    Application number
                  </label>
                  <span className="gov-form-hint" id="appHint">
                    Example: <code>DEMO-2026-001</code> to <code>DEMO-2026-010</code>
                  </span>
                  {hasAppError && (
                    <span className="gov-form-error-msg">Please enter a valid demonstration application number.</span>
                  )}
                  <input 
                    type="text" 
                    id="applicationNumber" 
                    name="applicationNumber" 
                    className="gov-form-input" 
                    placeholder="DEMO-2026-001" 
                    aria-describedby="appHint"
                    value={applicationNumber}
                    onChange={(e) => setApplicationNumber(e.target.value)}
                    disabled={isLoading}
                    autoComplete="off"
                    maxLength={20}
                  />
                </div>

                {/* Date of Birth Input */}
                <div className={`gov-form-group ${hasDobError ? 'has-error' : ''}`}>
                  <label htmlFor="dateOfBirth" className="gov-form-label">
                    Date of birth
                  </label>
                  <span className="gov-form-hint" id="dobHint">
                    Format: <code>DD / MM / YYYY</code> or <code>YYYY-MM-DD</code>
                  </span>
                  {hasDobError && (
                    <span className="gov-form-error-msg">Please enter the matching date of birth on file.</span>
                  )}
                  <input 
                    type="text" 
                    id="dateOfBirth" 
                    name="dateOfBirth" 
                    className="gov-form-input" 
                    placeholder="01 / 01 / 2000" 
                    aria-describedby="dobHint"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </div>

                {/* Loading Indicator State */}
                {isLoading && (
                  <div 
                    className="gov-alert gov-alert-info" 
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' }}
                    role="status"
                  >
                    <div 
                      style={{
                        width: '18px',
                        height: '18px',
                        border: '3px solid #D6D6D6',
                        borderTopColor: 'var(--color-blue-link)',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                        flexShrink: 0
                      }}
                      aria-hidden="true"
                    />
                    <style>{`
                      @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                    `}</style>
                    <span style={{ fontWeight: '600', color: 'var(--color-blue-dark)' }}>
                      Checking application status...
                    </span>
                  </div>
                )}

                {/* Submit & Secondary Buttons */}
                <div className="btn-group">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Checking...' : 'Sign in'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={onOpenDemoModal}
                    disabled={isLoading}
                  >
                    View demo applications
                  </button>
                </div>

                {/* Explicit Disclaimer Subtext */}
                <p className="text-small" style={{ marginTop: '14px', color: 'var(--color-text-muted)' }}>
                  <strong>Demo application data only.</strong> This prototype does not connect to any government system or require authentic GCKey credentials.
                </p>

              </form>

              {/* Informational Guidance Box */}
              <div className="gov-alert gov-alert-info" style={{ marginTop: '36px' }}>
                <h3 className="gov-alert-title">About this demonstration status verification</h3>
                <p>
                  This portal demonstrates a realistic public-service authentication and file verification flow. All 10 demo profiles feature distinct milestones including biometrics requirements, background verification, document requests, approval, and refusal.
                </p>
              </div>

            </section>

          </div>
        </div>
      </main>
    </>
  );
}
