import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ErrorSummary from '../components/ErrorSummary';
import { getApplicationStatus } from '../services/applicationService';

/**
 * Status Verification / Sign In Page matching exact reference (Top-Right screen):
 * - Clean left sidebar with "Application Status" active (red left bar + light blue background)
 * - Blue information alert: "This is a demonstration service"
 * - Application number & Date of birth inputs (with calendar icon)
 * - [ Check status → ] and [ 📄 View demo applications ]
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
        text: 'Enter your date of birth as shown on your demonstration record.',
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

      <main id="main-content" className="ca-main-content">
        <div className="gov-container">
          <div className="ca-layout-with-sidebar">

            {/* Left Sidebar (Exact layout matching screenshot) */}
            <aside className="ca-sidebar" aria-label="Secondary navigation">
              
              <button 
                type="button" 
                className="ca-sidebar-mobile-toggle"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                aria-expanded={mobileSidebarOpen}
              >
                <span>Immigration and Visa Menu</span>
                <span>{mobileSidebarOpen ? '▲' : '▼'}</span>
              </button>

              <div className={`ca-sidebar-card ${mobileSidebarOpen ? 'open' : ''}`}>
                <div className="ca-sidebar-heading">Immigration and Visa</div>
                <ul className="ca-sidebar-nav-list">
                  <li>
                    <Link to="/" className="ca-sidebar-nav-item">Overview</Link>
                  </li>
                  <li>
                    <Link to="/services#visitor" className="ca-sidebar-nav-item">Visit</Link>
                  </li>
                  <li>
                    <Link to="/services#study" className="ca-sidebar-nav-item">Study</Link>
                  </li>
                  <li>
                    <Link to="/services#work" className="ca-sidebar-nav-item">Work</Link>
                  </li>
                  <li>
                    <Link to="/services#pr" className="ca-sidebar-nav-item">Permanent Residence</Link>
                  </li>
                  <li>
                    <Link to="/login" className="ca-sidebar-nav-item active">
                      Application Status
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="ca-sidebar-nav-item">Processing Information</Link>
                  </li>
                  <li>
                    <Link to="/help" className="ca-sidebar-nav-item">Help &amp; FAQ</Link>
                  </li>
                </ul>
              </div>
            </aside>

            {/* Right Main Content */}
            <section className="ca-main-body" aria-labelledby="statusHeading">
              
              <h1 id="statusHeading" className="ca-page-title">
                Check your application status
              </h1>
              <p className="ca-page-desc">
                Enter your application details below to view the status and progress history of a demonstration application.
              </p>

              {/* Blue Alert: This is a demonstration service */}
              <div className="ca-info-alert" role="status">
                <div className="ca-info-alert-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="#005EA8">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ca-info-alert-body">
                  <div className="ca-info-alert-title">This is a demonstration service</div>
                  <p className="ca-info-alert-text">
                    Use the sample application numbers to explore how the status tracking works. This does not connect to any government system.
                  </p>
                </div>
              </div>

              {/* Error Summary if issues exist */}
              <ErrorSummary errors={errors} />

              {/* Form Controls */}
              <form className="ca-status-form" onSubmit={handleSubmit} noValidate>
                
                {/* Application number field */}
                <div className={`ca-form-group ${hasAppError ? 'has-error' : ''}`}>
                  <label htmlFor="applicationNumber" className="ca-form-label">
                    Application number
                  </label>
                  <span className="ca-form-sublabel" id="appHelpText">
                    Enter the application number shown on your demonstration record.
                  </span>
                  {hasAppError && (
                    <div className="ca-form-error-msg">Please enter a valid application number.</div>
                  )}
                  <input 
                    type="text" 
                    id="applicationNumber" 
                    className="ca-form-input" 
                    placeholder="e.g. DEMO-2026-001"
                    value={applicationNumber}
                    onChange={(e) => setApplicationNumber(e.target.value)}
                    disabled={isLoading}
                    autoComplete="off"
                    aria-describedby="appHelpText"
                  />
                </div>

                {/* Date of birth field */}
                <div className={`ca-form-group ${hasDobError ? 'has-error' : ''}`}>
                  <label htmlFor="dateOfBirth" className="ca-form-label">
                    Date of birth
                  </label>
                  <span className="ca-form-sublabel" id="dobHelpText">
                    Enter your date of birth as shown on your demonstration record.
                  </span>
                  {hasDobError && (
                    <div className="ca-form-error-msg">Please enter a valid date of birth.</div>
                  )}
                  <div className="ca-input-with-icon">
                    <input 
                      type="text" 
                      id="dateOfBirth" 
                      className="ca-form-input" 
                      placeholder="DD / MM / YYYY"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      disabled={isLoading}
                      autoComplete="off"
                      aria-describedby="dobHelpText"
                    />
                    <span className="ca-input-calendar-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Loading indicator */}
                {isLoading && (
                  <div className="ca-form-loading-state" role="status">
                    <div className="ca-spinner" aria-hidden="true" />
                    <span>Checking application status...</span>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="ca-form-actions">
                  <button 
                    type="submit" 
                    className="ca-btn ca-btn-primary"
                    disabled={isLoading}
                  >
                    Check status &rarr;
                  </button>
                  <button 
                    type="button" 
                    className="ca-btn ca-btn-secondary ca-btn-with-icon"
                    onClick={onOpenDemoModal}
                    disabled={isLoading}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span>View demo applications</span>
                  </button>
                </div>

              </form>

            </section>

          </div>
        </div>
      </main>
    </>
  );
}
