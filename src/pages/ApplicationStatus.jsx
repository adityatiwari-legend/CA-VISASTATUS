import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import StatusBadge from '../components/StatusBadge';
import Timeline from '../components/Timeline';
import ApplicationDetails from '../components/ApplicationDetails';
import { getApplicationByNumber } from '../services/applicationService';

/**
 * Production-Quality Application Status Result Page
 * 
 * Complete visual overhaul implementing:
 * 1. Top breadcrumb & header with [ DEMONSTRATION RECORD ] badge
 * 2. Large status hero summary panel with prominent status badge
 * 3. 2-column clean information details grid
 * 4. Dedicated "What this status means" blue information panel
 * 5. Dedicated "What happens next" demonstration workflow steps
 * 6. Vertical application progress timeline with connecting line
 * 7. Compact demonstration disclaimer
 * 8. Actions: [ Check another application ], [ Print demonstration record ]
 */
export default function ApplicationStatus() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [application, setApplication] = useState(location.state?.application || null);
  const [loading, setLoading] = useState(!application);
  const [notFound, setNotFound] = useState(false);

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
        <main id="main-content" className="gov-main-content">
          <div className="gov-container">
            <div className="gov-alert gov-alert-info" style={{ marginTop: '32px' }}>
              <h2 className="gov-alert-title">Loading demonstration file...</h2>
              <p>Please wait while your simulated application status is retrieved.</p>
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
            { label: 'Application Status', url: '/login' },
            { label: 'Not Found' }
          ]} 
        />
        <main id="main-content" className="gov-main-content">
          <div className="gov-container">
            <div className="gov-alert gov-alert-error" style={{ marginTop: '32px' }}>
              <h2 className="gov-alert-title">Demonstration application not found</h2>
              <p>We could not locate demonstration record "{id}". Please check the application number.</p>
              <div style={{ marginTop: '20px' }}>
                <Link to="/login" className="btn btn-primary">Check another application</Link>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Determine dynamic next steps based on application status
  const normalizedStatus = application.status.toLowerCase();
  let nextSteps = [
    { num: '1', title: 'Application review', desc: 'Processing officer verifies documents and eligibility criteria (Demonstration).' },
    { num: '2', title: 'Background verification', desc: 'Inter-agency identity, criminal, and security screenings are conducted.' },
    { num: '3', title: 'Final decision', desc: 'Designated supervisory officer issues the official determination notification.' }
  ];

  if (normalizedStatus.includes('approved')) {
    nextSteps = [
      { num: '1', title: 'Approval confirmation', desc: 'Simulated positive decision recorded in the demonstration profile.' },
      { num: '2', title: 'Document issuance', desc: 'Counterfoil simulation or electronic travel authorization issued.' },
      { num: '3', title: 'File closed', desc: 'Intake and evaluation process concluded successfully.' }
    ];
  } else if (normalizedStatus.includes('refused')) {
    nextSteps = [
      { num: '1', title: 'Decision registered', desc: 'Simulated refusal determination finalized under demonstration rules.' },
      { num: '2', title: 'Explanation documented', desc: 'Detailed refusal findings archived for prototype review.' },
      { num: '3', title: 'File archived', desc: 'Application file formally closed in demonstration database.' }
    ];
  } else if (normalizedStatus.includes('required') || normalizedStatus.includes('documents')) {
    nextSteps = [
      { num: '1', title: 'Applicant submission', desc: 'Provide requested supplementary documents or attend biometric enrolment.' },
      { num: '2', title: 'Material verification', desc: 'Reviewing officer verifies submitted records upon arrival.' },
      { num: '3', title: 'Evaluation resumed', desc: 'Application proceeds towards final determination.' }
    ];
  }

  return (
    <>
      <Breadcrumbs 
        items={[
          { label: 'Home', url: '/' },
          { label: 'Immigration and Visa', url: '/' },
          { label: 'Application Status', url: '/login' },
          { label: `Application Details (${application.applicationNumber})` }
        ]} 
      />

      <main id="main-content" className="gov-main-content">
        <div className="gov-container">

          {/* Top Header Row with Demonstration Badge */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
            <div>
              <h1 style={{ marginBottom: '6px' }}>Application status</h1>
              <p className="lead-text" style={{ marginBottom: 0 }}>
                Simulated public-service tracking record for demonstration purposes.
              </p>
            </div>
            <div style={{ alignSelf: 'center' }}>
              <span className="gov-badge gov-badge-demo" style={{ padding: '6px 14px', fontSize: '0.8125rem' }}>
                DEMONSTRATION RECORD
              </span>
            </div>
          </div>

          {/* 17. STATUS HERO / SUMMARY PANEL */}
          <section className="gov-status-hero-card" aria-labelledby="statusHeroHeading">
            <div className="gov-status-hero-header" id="statusHeroHeading">
              Application Status Overview
            </div>
            
            <div className="gov-status-hero-name">
              {application.applicantName}
            </div>
            
            <div className="gov-status-hero-meta">
              <strong>{application.applicationType}</strong> &bull; File #{application.applicationNumber}
            </div>

            {/* Current Status Highlight: Most prominent element */}
            <div className="gov-status-hero-current">
              <div>
                <span className="gov-status-hero-current-label">Current Status</span>
                <StatusBadge status={application.status} size="large" />
              </div>
              <div className="gov-status-hero-updated">
                <strong>Last updated:</strong> {application.lastUpdated}
              </div>
            </div>
          </section>

          {/* 19. APPLICATION DETAILS (2-Column Clean Information Grid) */}
          <ApplicationDetails application={application} />

          {/* 21. CURRENT STATUS MESSAGE (Blue Left Border Information Panel) */}
          <section className="gov-alert gov-alert-info" style={{ marginTop: '28px', marginBottom: '32px' }} aria-labelledby="statusMeaningHeading">
            <h2 className="gov-alert-title" id="statusMeaningHeading" style={{ fontSize: '1.25rem' }}>
              What this status means
            </h2>
            <p style={{ fontSize: '1.0625rem', lineHeight: 1.6, marginBottom: application.actionRequired ? '16px' : 0 }}>
              {application.statusDescription}
            </p>

            {application.actionRequired && (
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', border: '1px solid var(--color-blue-border)', borderRadius: '3px', padding: '12px 16px', marginTop: '12px' }}>
                <strong style={{ color: 'var(--color-blue-hover)', display: 'block', marginBottom: '4px' }}>
                  Action item:
                </strong>
                <span style={{ color: 'var(--color-text-primary)' }}>
                  {application.actionRequired}
                </span>
              </div>
            )}
          </section>

          {/* 20. TIMELINE (Dedicated Progress Section) */}
          <Timeline timeline={application.timeline} />

          {/* 22. WHAT HAPPENS NEXT (Demonstration Workflow) */}
          <section className="gov-next-steps-section" style={{ marginTop: '36px', marginBottom: '36px' }} aria-labelledby="nextStepsHeading">
            <h2 id="nextStepsHeading">What happens next</h2>
            <p className="text-small" style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              Demonstration workflow sequence for this file category:
            </p>
            <div className="gov-next-steps-grid">
              {nextSteps.map(step => (
                <div key={step.num} className="gov-next-step-card">
                  <div className="gov-next-step-number">{step.num}</div>
                  <h3 className="gov-next-step-title">{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 24. DEMONSTRATION NOTICE (Restrained, non-overpowering) */}
          <div className="gov-alert" style={{ borderLeftColor: 'var(--color-gray-dark)', backgroundColor: 'var(--color-gray-surface)', margin: '32px 0 24px 0' }}>
            <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
              <strong>Notice:</strong> This status is fictional demonstration data and does not represent a real immigration application. For official Canadian visa status inquiries, please consult the official IRCC portal at <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener noreferrer">canada.ca/immigration</a>.
            </p>
          </div>

          {/* Actions Bar */}
          <div className="btn-group" style={{ marginTop: '24px', paddingBottom: '32px' }}>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => navigate('/login')}
            >
              Check another application
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => window.print()}
            >
              Print demonstration record
            </button>
            <a 
              href="https://www.canada.ca/en/immigration-refugees-citizenship.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline"
            >
              Official Canada.ca website &UpperRightArrow;
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
