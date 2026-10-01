import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { getApplicationByNumber } from '../services/applicationService';

/**
 * Application Details Page matching exact reference (Bottom-Left screen):
 * - Left sidebar with "Application Status" active
 * - Top title + "DEMONSTRATION RECORD" badge
 * - Light blue Hero Summary Card with large document icon, name, status, file #, stage & progress bar
 * - Two-column section: "Application details" table on left, "Application progress" timeline on right
 * - Two bottom side-by-side cards: "What this status means" & "Next steps"
 */
export default function ApplicationStatus() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [application, setApplication] = useState(location.state?.application || null);
  const [loading, setLoading] = useState(!application);
  const [notFound, setNotFound] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!application && id) {
      setLoading(true);
      getApplicationByNumber(id)
        .then(record => {
          if (record) {
            setApplication(record);
            setNotFound(false);
          } else {
            setNotFound(true);
          }
        })
        .catch(() => setNotFound(true))
        .finally(() => setLoading(false));
    }
  }, [id, application]);

  if (loading) {
    return (
      <>
        <Breadcrumbs 
          items={[
            { label: 'Home', url: '/' },
            { label: 'Immigration and Visa', url: '/' },
            { label: 'Application Status' }
          ]} 
        />
        <main className="ca-main-content">
          <div className="gov-container">
            <div className="ca-loading-card">
              <div className="ca-spinner" aria-hidden="true" />
              <span>Loading application status...</span>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (notFound || !application) {
    return (
      <>
        <Breadcrumbs 
          items={[
            { label: 'Home', url: '/' },
            { label: 'Immigration and Visa', url: '/' },
            { label: 'Fetch Visa Status', url: '/status' },
            { label: 'Not Found' }
          ]} 
        />
        <main className="ca-main-content">
          <div className="gov-container">
            <div className="ca-error-box">
              <h2>Application record not found</h2>
              <p>We could not locate application record "{id}".</p>
              <Link to="/status" className="ca-btn ca-btn-primary" style={{ marginTop: '16px' }}>
                Fetch another application
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Calculate current stage progress out of 5
  const timeline = application.timeline || [];
  const totalSteps = timeline.length || 5;
  const currentStepIndex = timeline.findIndex(t => t.status === 'current' || t.status === 'action_required');
  const currentStepNum = currentStepIndex !== -1 ? currentStepIndex + 1 : (application.status.includes('Approved') || application.status.includes('Refused') ? totalSteps : 1);
  const progressPercent = Math.min(100, Math.round((currentStepNum / totalSteps) * 100));

  // Determine status dot color
  let statusDotColor = '#2563EB'; // blue default
  let statusBadgeBg = '#E0EDFA';
  let statusBadgeText = '#1D4ED8';

  const normalized = application.status.toLowerCase();
  if (normalized.includes('approved')) {
    statusDotColor = '#16A34A';
    statusBadgeBg = '#DCFCE7';
    statusBadgeText = '#15803D';
  } else if (normalized.includes('refused')) {
    statusDotColor = '#DC2626';
    statusBadgeBg = '#FEE2E2';
    statusBadgeText = '#B91C1C';
  } else if (normalized.includes('required') || normalized.includes('warning') || normalized.includes('documents')) {
    statusDotColor = '#EA580C';
    statusBadgeBg = '#FFEDD5';
    statusBadgeText = '#C2410C';
  } else if (normalized.includes('received')) {
    statusDotColor = '#0284C7';
    statusBadgeBg = '#E0F2FE';
    statusBadgeText = '#0369A1';
  }

  return (
    <>
      <Breadcrumbs 
        items={[
          { label: 'Home', url: '/' },
          { label: 'Immigration and Visa', url: '/' },
          { label: 'Fetch Visa Status', url: '/status' },
          { label: 'Application Details' }
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
              </div>
            </aside>

            {/* Right Main Content */}
            <section className="ca-main-body" aria-labelledby="statusTitle">
              
              {/* Top Title & OFFICIAL RECORD badge */}
              <div className="ca-status-header-row">
                <div>
                  <h1 id="statusTitle" className="ca-page-title" style={{ marginBottom: '4px' }}>
                    Application status
                  </h1>
                  <p className="ca-page-desc" style={{ marginBottom: 0 }}>
                    Official status verification record for Canadian immigration and visa services.
                  </p>
                </div>
                <div>
                  <span className="ca-badge-demo-record" style={{ backgroundColor: '#DCFCE7', color: '#15803D', border: '1px solid #BBF7D0' }}>
                    OFFICIAL RECORD
                  </span>
                </div>
              </div>

              {/* HERO SUMMARY CARD (Light Blue / Gradient Background) */}
              <div className="ca-summary-hero-card">
                
                {/* Big Document Icon */}
                <div className="ca-summary-hero-icon-wrap" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#005EA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>

                {/* Middle: Name, Status Badge, Subtitle & Last Updated */}
                <div className="ca-summary-hero-middle">
                  <div className="ca-summary-hero-name-row">
                    <span className="ca-summary-hero-name">{application.applicantName}</span>
                    <span 
                      className="ca-summary-hero-badge"
                      style={{ backgroundColor: statusBadgeBg, color: statusBadgeText }}
                    >
                      <span className="ca-badge-dot" style={{ backgroundColor: statusDotColor }} aria-hidden="true"></span>
                      <span>{application.status}</span>
                    </span>
                  </div>
                  <div className="ca-summary-hero-details">
                    <span>{application.applicationType}</span>
                    <span className="ca-summary-hero-sep">|</span>
                    <span>{application.applicationNumber}</span>
                  </div>
                  <div className="ca-summary-hero-updated">
                    Last updated: {application.lastUpdated}
                  </div>
                </div>

                {/* Right: Current stage and Progress bar */}
                <div className="ca-summary-hero-stage">
                  <span className="ca-stage-label">Current stage</span>
                  <span className="ca-stage-value">{application.currentStage}</span>
                  <div className="ca-stage-progress-bar-bg" aria-hidden="true">
                    <div 
                      className="ca-stage-progress-bar-fill" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="ca-stage-step-text">
                    Step {currentStepNum} of {totalSteps}
                  </span>
                </div>

              </div>

              {/* TWO-COLUMN SECTION: Details Table (Left) + Timeline (Right) */}
              <div className="ca-status-two-col-grid">
                
                {/* Left Card: Application details */}
                <div className="ca-card-box">
                  <h2 className="ca-card-box-title">Application details</h2>
                  <div className="ca-details-rows">
                    <div className="ca-details-row">
                      <span className="ca-details-key">Application type</span>
                      <span className="ca-details-val">{application.applicationType}</span>
                    </div>
                    <div className="ca-details-row">
                      <span className="ca-details-key">Tracking ID</span>
                      <span className="ca-details-val" style={{ fontWeight: 600 }}>{application.trackingId || application.applicationNumber}</span>
                    </div>
                    {application.passportNumber && (
                      <div className="ca-details-row">
                        <span className="ca-details-key">Passport number</span>
                        <span className="ca-details-val">{application.passportNumber}</span>
                      </div>
                    )}
                    {application.documentNumber && (
                      <div className="ca-details-row">
                        <span className="ca-details-key">Work permit doc no.</span>
                        <span className="ca-details-val">{application.documentNumber}</span>
                      </div>
                    )}
                    {application.issuingCountry && (
                      <div className="ca-details-row">
                        <span className="ca-details-key">Issuing country</span>
                        <span className="ca-details-val">{application.issuingCountry}</span>
                      </div>
                    )}
                    <div className="ca-details-row">
                      <span className="ca-details-key">Submission date</span>
                      <span className="ca-details-val">{application.submissionDate}</span>
                    </div>
                    <div className="ca-details-row">
                      <span className="ca-details-key">Last updated</span>
                      <span className="ca-details-val">{application.lastUpdated}</span>
                    </div>
                    <div className="ca-details-row">
                      <span className="ca-details-key">Current stage</span>
                      <span className="ca-details-val">{application.currentStage}</span>
                    </div>
                    <div className="ca-details-row">
                      <span className="ca-details-key">Status</span>
                      <span className="ca-details-val" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: statusDotColor }} aria-hidden="true"></span>
                        {application.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Card: Application progress Timeline */}
                <div className="ca-card-box">
                  <h2 className="ca-card-box-title">Application progress</h2>
                  <div className="ca-timeline-list">
                    {timeline.map((step, idx) => {
                      const isCompleted = step.status === 'completed';
                      const isCurrent = step.status === 'current' || step.status === 'action_required';
                      
                      return (
                        <div key={idx} className={`ca-timeline-step ${step.status}`}>
                          
                          {/* Marker Icon */}
                          <div className="ca-timeline-marker-wrap">
                            {isCompleted ? (
                              <div className="ca-marker-completed" aria-hidden="true">
                                <svg width="12" height="12" viewBox="0 0 20 20" fill="#FFFFFF">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            ) : isCurrent ? (
                              <div className="ca-marker-current" aria-hidden="true">
                                <div className="ca-marker-current-dot" />
                              </div>
                            ) : (
                              <div className="ca-marker-pending" aria-hidden="true" />
                            )}
                            {idx < timeline.length - 1 && <div className="ca-marker-line" aria-hidden="true" />}
                          </div>

                          {/* Content */}
                          <div className="ca-timeline-content">
                            <div className="ca-timeline-step-header">
                              <span className="ca-timeline-step-title">{step.title}</span>
                              {isCurrent && (
                                <span className="ca-timeline-badge-inprogress">
                                  {step.status === 'action_required' ? 'Action required' : 'In progress'}
                                </span>
                              )}
                              {!isCompleted && !isCurrent && (
                                <span className="ca-timeline-badge-pending">Pending</span>
                              )}
                            </div>
                            <div className="ca-timeline-step-date">
                              {step.date || (isCurrent ? 'In progress' : 'Pending')}
                            </div>
                          </div>

                          {/* Right Chevron */}
                          <div className="ca-timeline-chevron" aria-hidden="true">
                            &rsaquo;
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* TWO BOTTOM INFORMATIONAL CARDS: What this status means & Next steps */}
              <div className="ca-bottom-info-cards">
                
                {/* Left: What this status means */}
                <div className="ca-info-card">
                  <div className="ca-info-card-header">
                    <div className="ca-info-card-icon" aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="#005EA8" width="18" height="18">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="ca-info-card-title">What this status means</h3>
                  </div>
                  <p className="ca-info-card-body">
                    {application.statusDescription || "Your application has completed all review phases and the official decision has been registered. You may download or print your official status confirmation."}
                  </p>
                </div>

                {/* Right: Next steps */}
                <div className="ca-info-card">
                  <div className="ca-info-card-header">
                    <div className="ca-info-card-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#005EA8" strokeWidth="2" width="18" height="18" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <h3 className="ca-info-card-title">Next steps</h3>
                  </div>
                  <p className="ca-info-card-body">
                    {application.actionRequired || "Please keep your approval documentation and valid passport available when traveling to Canada."}
                  </p>
                </div>

              </div>

              {/* Action Buttons Below Cards */}
              <div className="ca-status-actions" style={{ marginTop: '28px' }}>
                <button 
                  type="button" 
                  className="ca-btn ca-btn-primary"
                  onClick={() => navigate('/status')}
                >
                  Fetch another application &rarr;
                </button>
                <button 
                  type="button" 
                  className="ca-btn ca-btn-secondary"
                  onClick={() => window.print()}
                >
                  Print official confirmation
                </button>
              </div>

            </section>

          </div>
        </div>
      </main>
    </>
  );
}
