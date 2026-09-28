import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ErrorSummary from '../components/ErrorSummary';
import { getApplicationStatus } from '../services/applicationService';

/**
 * Polished Government-Service Application Status Sign-In Page
 * 
 * Features:
 * - Proper H1 & descriptive lead
 * - Form container constrained to max-width: 650px
 * - Inputs with 50px height, 1px solid #7A7A7A, 16px text
 * - Canada.ca Error Summary box that pushes form down naturally
 * - Primary button [ Check status ] and secondary [ View demo applications ]
 * - Desktop sidebar secondary navigation with collapsible mobile support
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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
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
      validationErrors.push({
        text: 'Enter the application number shown on your demonstration record.',
        href: '#applicationNumber'
      });
      setHasAppError(true);
    }

    if (!dateOfBirth.trim()) {
      validationErrors.push({
        text: 'Enter your date of birth.',
        href: '#dateOfBirth'
      });
      setHasDobError(true);
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await getApplicationStatus(applicationNumber, dateOfBirth);

      if (result.success && result.application) {
        navigate(`/application-status/${encodeURIComponent(result.application.applicationNumber)}`, {
          state: { application: result.application }
        });
      } else {
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
              
              {/* Mobile Collapsible Button */}
              <button 
                type="button" 
                className="gov-sidebar-mobile-toggle"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                aria-expanded={mobileSidebarOpen}
              >
                <span>Immigration and Visa Menu</span>
                <span>{mobileSidebarOpen ? '▲' : '▼'}</span>
              </button>

              <div className={`gov-sidebar-content ${mobileSidebarOpen ? 'open' : ''}`}>
                <nav className="gov-sidebar-nav">
                  <div className="gov-sidebar-title">Immigration and Visa</div>
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

                {/* Sample Test Records Card */}
                <div className="gov-alert" style={{ borderLeftColor: 'var(--color-blue-link)', padding: '16px', background: '#FFFFFF', border: '1px solid var(--color-gray-border)', borderLeftWidth: '4px' }}>
                  <h3 style={{ fontSize: '0.9375rem', marginTop: 0, marginBottom: '6px' }}>
                    Need sample test data?
                  </h3>
                  <p className="text-small" style={{ marginBottom: '12px' }}>
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
              </div>
            </aside>

            {/* Main Column */}
            <section className="gov-main-body" aria-labelledby="statusHeading">
              <h1 id="statusHeading">Check your application status</h1>
              <p className="lead-text">
                Enter your application details below to view the status and progress history of a demonstration application.
              </p>

              {/* Form Section Constrained to Max 650px */}
              <div className="gov-form-container">
                
                {/* Canada.ca Error Summary Box */}
                <ErrorSummary errors={errors} />

                <form onSubmit={handleSubmit} noValidate>
                  
                  {/* Field 1: APPLICATION NUMBER */}
                  <div className={`gov-form-group ${hasAppError ? 'has-error' : ''}`}>
                    <label htmlFor="applicationNumber" className="gov-form-label">
                      Application number
                    </label>
                    <span className="gov-form-hint" id="appHint">
                      Enter the application number shown on your demonstration record (Example: <code>DEMO-2026-001</code>).
                    </span>
                    {hasAppError && (
                      <span className="gov-form-error-msg">
                        Please enter a valid demonstration application number.
                      </span>
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

                  {/* Field 2: DATE OF BIRTH */}
                  <div className={`gov-form-group ${hasDobError ? 'has-error' : ''}`}>
                    <label htmlFor="dateOfBirth" className="gov-form-label">
                      Date of birth
                    </label>
                    <span className="gov-form-hint" id="dobHint">
                      Format: <code>DD / MM / YYYY</code>
                    </span>
                    {hasDobError && (
                      <span className="gov-form-error-msg">
                        Please enter the date of birth matching this demonstration record.
                      </span>
                    )}
                    <input 
                      type="text" 
                      id="dateOfBirth" 
                      name="dateOfBirth" 
                      className="gov-form-input" 
                      placeholder="DD / MM / YYYY" 
                      aria-describedby="dobHint"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      disabled={isLoading}
                      autoComplete="off"
                    />
                  </div>

                  {/* Loading State Spinner */}
                  {isLoading && (
                    <div 
                      className="gov-alert gov-alert-info" 
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', margin: '16px 0' }}
                      role="status"
                    >
                      <div 
                        style={{
                          width: '20px',
                          height: '20px',
                          border: '3px solid #D9DDE1',
                          borderTopColor: 'var(--color-blue-link)',
                          borderRadius: '50%',
                          animation: 'govSpin 0.75s linear infinite',
                          flexShrink: 0
                        }}
                        aria-hidden="true"
                      />
                      <style>{`
                        @keyframes govSpin {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }
                      `}</style>
                      <span style={{ fontWeight: 600, color: 'var(--color-blue-hover)', fontSize: '1rem' }}>
                        Checking application status...
                      </span>
                    </div>
                  )}

                  {/* Action Buttons: Primary [ Check status ] & Secondary [ View demo applications ] */}
                  <div className="btn-group" style={{ marginTop: '24px' }}>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Checking...' : 'Check status'}
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

                  {/* Demo Disclaimer Subtext */}
                  <p className="text-small" style={{ marginTop: '16px', color: 'var(--color-text-secondary)' }}>
                    <strong>Demo application data only.</strong> This prototype does not connect to any government system or require authentic GCKey credentials.
                  </p>

                </form>
              </div>

            </section>

          </div>
        </div>
      </main>
    </>
  );
}
