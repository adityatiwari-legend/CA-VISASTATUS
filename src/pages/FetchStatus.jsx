import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ErrorSummary from '../components/ErrorSummary';
import { useAuth } from '../context/AuthContext';
import { getApplicationStatus } from '../services/applicationService';

/**
 * Fetch Visa Status Page
 * Allows authenticated users to query and fetch their official visa application status.
 * If unauthenticated, displays an official sign-in required gate.
 */
export default function FetchStatus() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isLoggedIn, login, logout } = useAuth();

  const queryTracking = searchParams.get('trackingId') || '';

  const [applicationNumber, setApplicationNumber] = useState(
    queryTracking || user?.preferredTrackingId || ''
  );
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [hasAppError, setHasAppError] = useState(false);
  const [hasDobError, setHasDobError] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (queryTracking) {
      setApplicationNumber(queryTracking);
    } else if (user?.preferredTrackingId && !applicationNumber) {
      setApplicationNumber(user.preferredTrackingId);
    }
    if (user?.dateOfBirth && !dateOfBirth) {
      setDateOfBirth(user.dateOfBirth);
    }
  }, [queryTracking, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setHasAppError(false);
    setHasDobError(false);

    const validationErrors = [];

    if (!applicationNumber.trim()) {
      validationErrors.push({
        text: 'Enter your Tracking ID, Passport number, or Application file number.',
        href: '#applicationNumber'
      });
      setHasAppError(true);
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const applicantName = user?.name || 'Applicant';
      const result = await getApplicationStatus(
        applicationNumber.trim(), 
        dateOfBirth.trim() || '11/12/1997',
        applicantName
      );

      if (result.success && result.application) {
        navigate(`/application-status/${encodeURIComponent(result.application.applicationNumber)}`, {
          state: { application: result.application }
        });
      } else {
        if (result.error === 'DOB_MISMATCH') {
          setErrors([result.message || 'The date of birth entered does not match our records.']);
          setHasDobError(true);
        } else {
          setErrors([result.message || 'We could not fetch the record. Please try again.']);
        }
      }
    } catch (err) {
      setErrors(['A connection error occurred while fetching your record. Please try again.']);
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
          { label: 'Fetch Visa Status' }
        ]} 
      />

      <main id="main-content" className="ca-main-content">
        <div className="gov-container">
          <div className="ca-layout-with-sidebar">

            {/* Left Sidebar */}
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
                    <Link to="/status" className="ca-sidebar-nav-item active">
                      Fetch Visa Status
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="ca-sidebar-nav-item">Processing Information</Link>
                  </li>
                  <li>
                    <Link to="/help" className="ca-sidebar-nav-item">Help &amp; FAQ</Link>
                  </li>
                </ul>

                {isLoggedIn && (
                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
                      Active Profile
                    </div>
                    <div style={{ fontSize: '12px', color: '#4B5563' }}>
                      {user?.name}
                    </div>
                    <button 
                      type="button" 
                      onClick={logout}
                      style={{ 
                        marginTop: '8px', 
                        background: 'none', 
                        border: 'none', 
                        color: '#D52B1E', 
                        fontSize: '12px', 
                        cursor: 'pointer',
                        padding: 0,
                        textDecoration: 'underline'
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </aside>

            {/* Right Main Content */}
            <section className="ca-main-body" aria-labelledby="statusHeading">
              
              <div className="ca-status-header-row">
                <div>
                  <h1 id="statusHeading" className="ca-page-title">
                    Fetch your application status
                  </h1>
                  <p className="ca-page-desc">
                    Enter your application details below to view the current status and official processing record.
                  </p>
                </div>
                <div>
                  <span className="ca-badge-demo-record" style={{ backgroundColor: '#DCFCE7', color: '#15803D', border: '1px solid #BBF7D0' }}>
                    LIVE VERIFICATION
                  </span>
                </div>
              </div>

              {/* Authentication Gate if not logged in */}
              {!isLoggedIn ? (
                <div style={{
                  background: '#FFFBEB',
                  border: '1px solid #FCD34D',
                  borderLeft: '5px solid #F59E0B',
                  borderRadius: '6px',
                  padding: '24px',
                  marginBottom: '28px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#D97706" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.1 0 2 .9 2 2v2h1c.55 0 1 .45 1 1v5c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1v-5c0-.55.45-1 1-1h1V9c0-1.1.9-2 2-2zm-1 4h2V9c0-.55-.45-1-1-1s-1 .45-1 1v2z"/>
                    </svg>
                    <div>
                      <h3 style={{ margin: '0 0 6px', fontSize: '18px', color: '#92400E', fontWeight: '700' }}>
                        Account Login Required to Fetch Visa Records
                      </h3>
                      <p style={{ margin: '0 0 16px', color: '#B45309', fontSize: '14px', lineHeight: '1.5' }}>
                        To fetch and inspect real-time visa status, work permits, and immigration decision letters, please sign in with your account. 
                        <strong> You can enter any details on the login page to sign in immediately.</strong>
                      </p>
                      
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <Link 
                          to="/login" 
                          className="ca-btn ca-btn-primary" 
                          style={{ textDecoration: 'none' }}
                        >
                          Sign In to Your Account &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Authenticated Banner */
                <div style={{
                  background: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderLeft: '4px solid #16A34A',
                  padding: '14px 18px',
                  borderRadius: '4px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ 
                      width: '28px', 
                      height: '28px', 
                      background: '#DCFCE7', 
                      color: '#15803D', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '13px'
                    }}>
                      ✓
                    </span>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '14px', color: '#166534' }}>
                        Signed in as {user.name} ({user.email})
                      </div>
                      <div style={{ fontSize: '12px', color: '#15803D' }}>
                        Portal session active &bull; You may fetch any visa or work permit status record below
                      </div>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={logout}
                    className="ca-btn ca-btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '13px' }}
                  >
                    Sign Out
                  </button>
                </div>
              )}

              {/* Information Alert */}
              <div className="ca-info-alert" role="status">
                <div className="ca-info-alert-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="#005EA8">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ca-info-alert-body">
                  <div className="ca-info-alert-title">Official Visa &amp; Work Permit Lookup</div>
                  <p className="ca-info-alert-text">
                    Enter your assigned Tracking ID (e.g. <code>CAN-TRK-95822412</code>), Passport number (e.g. <code>T3572678</code>), or file number to fetch your official immigration status.
                  </p>
                </div>
              </div>

              {/* Error Summary if issues exist */}
              <ErrorSummary errors={errors} />

              {/* Form Controls */}
              <form className="ca-status-form" onSubmit={handleSubmit} noValidate>
                
                {/* Tracking ID or Passport number field */}
                <div className={`ca-form-group ${hasAppError ? 'has-error' : ''}`}>
                  <label htmlFor="applicationNumber" className="ca-form-label">
                    Tracking ID, Passport number, or Application #
                  </label>
                  <span className="ca-form-sublabel" id="appHelpText">
                    Enter your Tracking ID (e.g. <code>CAN-TRK-95822412</code>) or Passport number (e.g. <code>T3572678</code>).
                  </span>
                  {hasAppError && (
                    <div className="ca-form-error-msg">Please enter a valid tracking ID or passport number.</div>
                  )}
                  <input 
                    type="text" 
                    id="applicationNumber" 
                    className="ca-form-input" 
                    placeholder="e.g. CAN-TRK-95822412 or T3572678"
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
                    Enter date of birth (e.g. <code>DD/MM/YYYY</code> or <code>YYYY-MM-DD</code>).
                  </span>
                  {hasDobError && (
                    <div className="ca-form-error-msg">Please enter date of birth.</div>
                  )}
                  <div className="ca-input-with-icon">
                    <input 
                      type="text" 
                      id="dateOfBirth" 
                      className="ca-form-input" 
                      placeholder="DD / MM / YYYY or YYYY-MM-DD"
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
                    <span>Fetching visa status from immigration database...</span>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="ca-form-actions">
                  <button 
                    type="submit" 
                    className="ca-btn ca-btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Fetching Status...' : 'Fetch Visa Status \u2192'}
                  </button>
                  
                  {isLoggedIn && (
                    <Link to="/services" className="ca-btn ca-btn-secondary" style={{ textDecoration: 'none' }}>
                      View Services
                    </Link>
                  )}
                </div>

              </form>

            </section>

          </div>
        </div>
      </main>
    </>
  );
}
