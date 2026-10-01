import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { useAuth } from '../context/AuthContext';

/**
 * Dummy Login Page for Visa Status Portal
 * Allows the user to enter ANY details (or click a quick demo user)
 * and hit Login to become authenticated and then fetch visa status.
 */
export default function Login() {
  const navigate = useNavigate();
  const { user, isLoggedIn, login, logout } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated network verification delay
    setTimeout(() => {
      const finalUsername = username.trim() || 'Applicant User';
      const loggedInUser = login({
        username: finalUsername,
        password: password.trim() || 'dummy-pass',
        trackingId: trackingId.trim(),
        email: finalUsername.includes('@') ? finalUsername : `${finalUsername.toLowerCase().replace(/\s+/g, '.')}@example.com`
      });

      setIsLoading(false);

      // Redirect to fetch visa status page
      if (trackingId.trim()) {
        navigate(`/status?trackingId=${encodeURIComponent(trackingId.trim())}`);
      } else {
        navigate('/status');
      }
    }, 400);
  };

  return (
    <>
      <Breadcrumbs 
        items={[
          { label: 'Home', url: '/' },
          { label: 'Immigration and Visa', url: '/' },
          { label: 'Sign In' }
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
                <span>Account Navigation</span>
                <span>{mobileSidebarOpen ? '▲' : '▼'}</span>
              </button>

              <div className={`ca-sidebar-card ${mobileSidebarOpen ? 'open' : ''}`}>
                <div className="ca-sidebar-heading">Portal Services</div>
                <ul className="ca-sidebar-nav-list">
                  <li>
                    <Link to="/" className="ca-sidebar-nav-item">Overview</Link>
                  </li>
                  <li>
                    <Link to="/status" className="ca-sidebar-nav-item">
                      Fetch Visa Status
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="ca-sidebar-nav-item">Services Directory</Link>
                  </li>
                  <li>
                    <Link to="/help" className="ca-sidebar-nav-item">Help &amp; FAQ</Link>
                  </li>
                </ul>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                    Need Assistance?
                  </div>
                  <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: '1.5' }}>
                    This demonstration portal accepts any login credentials to let you review and fetch live immigration status files.
                  </p>
                </div>
              </div>
            </aside>

            {/* Right Main Content */}
            <section className="ca-main-body" aria-labelledby="loginHeading">
              
              <div className="ca-status-header-row">
                <div>
                  <h1 id="loginHeading" className="ca-page-title">
                    Sign in to your account
                  </h1>
                  <p className="ca-page-desc">
                    Access your Canadian immigration profile and fetch real-time visa application status.
                  </p>
                </div>
                <div>
                  <span className="ca-badge-demo-record" style={{ backgroundColor: '#EEF2FF', color: '#3730A3', border: '1px solid #C7D2FE' }}>
                    SECURE SIGN-IN
                  </span>
                </div>
              </div>

              {/* Notice Banner */}
              <div className="ca-info-alert" role="status" style={{ borderLeftColor: '#2563EB', background: '#EFF6FF' }}>
                <div className="ca-info-alert-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="#2563EB" width="20" height="20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ca-info-alert-body">
                  <div className="ca-info-alert-title" style={{ color: '#1E40AF' }}>
                    Instant Demonstration Login
                  </div>
                  <p className="ca-info-alert-text" style={{ color: '#1E3A8A' }}>
                    <strong>Enter any details below</strong> (any username or email and any password) and click <strong>Sign In</strong>. 
                    You will immediately be logged in and can fetch your visa status.
                  </p>
                </div>
              </div>

              {/* Already Logged In Banner */}
              {isLoggedIn && user && (
                <div style={{
                  background: '#F0FDF4',
                  border: '1px solid #86EFAC',
                  borderLeft: '4px solid #16A34A',
                  padding: '16px 20px',
                  borderRadius: '4px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ fontWeight: '700', color: '#166534', fontSize: '15px' }}>
                      ✓ Currently signed in as {user.name} ({user.email})
                    </div>
                    <div style={{ fontSize: '13px', color: '#15803D', marginTop: '2px' }}>
                      Session ID: {user.sessionId || 'ACTIVE'} &bull; Logged in at {user.loginTime}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to="/status" className="ca-btn ca-btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                      Fetch Visa Status &rarr;
                    </Link>
                    <button 
                      type="button" 
                      onClick={logout} 
                      className="ca-btn ca-btn-secondary"
                      style={{ padding: '8px 16px', fontSize: '14px' }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}

              {/* Login Box */}
              <div className="ca-login-card">

                <form className="ca-status-form" onSubmit={handleSubmit} noValidate>
                  
                  {/* Username / Email field */}
                  <div className="ca-form-group">
                    <label htmlFor="loginUsername" className="ca-form-label">
                      Username, Email address, or GCKey ID
                    </label>
                    <span className="ca-form-sublabel" id="userHelpText">
                      Type any name, email, or identifier (e.g. <code>aditya</code>, <code>alex.morgan</code>, or <code>user@example.com</code>).
                    </span>
                    <div className="ca-input-with-icon">
                      <input 
                        type="text" 
                        id="loginUsername" 
                        className="ca-form-input" 
                        placeholder="Enter any username or email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                        autoComplete="username"
                        aria-describedby="userHelpText"
                      />
                      <span className="ca-input-calendar-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Password field */}
                  <div className="ca-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label htmlFor="loginPassword" className="ca-form-label" style={{ marginBottom: 0 }}>
                        Password
                      </label>
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ background: 'none', border: 'none', color: '#005EA8', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        {showPassword ? 'Hide password' : 'Show password'}
                      </button>
                    </div>
                    <span className="ca-form-sublabel" id="passHelpText">
                      Enter any password (e.g. <code>password123</code> or whatever you like).
                    </span>
                    <div className="ca-input-with-icon">
                      <input 
                        type={showPassword ? 'text' : 'password'} 
                        id="loginPassword" 
                        className="ca-form-input" 
                        placeholder="Enter any password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        autoComplete="current-password"
                        aria-describedby="passHelpText"
                      />
                      <span className="ca-input-calendar-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Optional Tracking ID / File Shortcut */}
                  <div className="ca-form-group" style={{ background: '#F8FAFC', padding: '14px 16px', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
                    <label htmlFor="loginTracking" className="ca-form-label" style={{ fontSize: '14px', marginBottom: '2px' }}>
                      Application / Tracking ID <span style={{ fontWeight: 'normal', color: '#6B7280' }}>(Optional shortcut)</span>
                    </label>
                    <span className="ca-form-sublabel" style={{ marginBottom: '8px' }}>
                      Pre-link an application to fetch immediately (e.g. <code>CAN-TRK-95822412</code> or any ID).
                    </span>
                    <input 
                      type="text" 
                      id="loginTracking" 
                      className="ca-form-input" 
                      placeholder="e.g. CAN-TRK-95822412, T3572678, or leave blank"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Remember me checkbox */}
                  <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0 24px' }}>
                    <input 
                      type="checkbox" 
                      id="rememberMe" 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#D52B1E' }}
                    />
                    <label htmlFor="rememberMe" style={{ marginLeft: '10px', fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
                      Keep me signed in on this computer
                    </label>
                  </div>

                  {/* Loading State */}
                  {isLoading && (
                    <div className="ca-form-loading-state" role="status" style={{ marginBottom: '16px' }}>
                      <div className="ca-spinner" aria-hidden="true" />
                      <span>Authenticating credentials and loading portal profile...</span>
                    </div>
                  )}

                  {/* Form Action Buttons */}
                  <div className="ca-form-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button 
                      type="submit" 
                      className="ca-btn ca-btn-primary"
                      disabled={isLoading}
                      style={{ minWidth: '160px', justifyContent: 'center' }}
                    >
                      {isLoading ? 'Signing In...' : 'Sign In \u2192'}
                    </button>
                    
                    <Link to="/" className="ca-btn ca-btn-secondary" style={{ textDecoration: 'none' }}>
                      Cancel
                    </Link>
                  </div>

                </form>

              </div>

            </section>

          </div>
        </div>
      </main>
    </>
  );
}
