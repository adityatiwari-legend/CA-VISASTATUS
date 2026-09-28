import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import StatusBadge from '../components/StatusBadge';
import Timeline from '../components/Timeline';
import ApplicationDetails from '../components/ApplicationDetails';
import { getApplicationByNumber } from '../services/applicationService';

/**
 * Dynamic Application Status Result Page
 * 
 * Renders the fetched demonstration application dynamically:
 * - Summary panel (Applicant, Type, Number, Last updated, Status)
 * - State-specific Canada.ca alert
 * - Dynamic Timeline (<Timeline timeline={application.timeline} />)
 * - Dynamic Application Details (<ApplicationDetails application={application} />)
 * - "What this status means" explanation
 * - "Check another application" action button
 */
export default function ApplicationStatus() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [application, setApplication] = useState(location.state?.application || null);
  const [loading, setLoading] = useState(!application);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // If not passed via navigation state, fetch from service layer
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
            <div className="gov-alert gov-alert-info" style={{ marginTop: '24px' }}>
              <h2 className="gov-alert-title" style={{ fontSize: '1.125rem' }}>Loading demonstration file...</h2>
              <p>Please wait while the demonstration record is retrieved.</p>
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
            <div className="gov-alert gov-alert-error" style={{ marginTop: '24px' }}>
              <h2 className="gov-alert-title">Demonstration file not found</h2>
              <p>We could not retrieve the requested demonstration file record.</p>
              <div style={{ marginTop: '16px' }}>
                <Link to="/login" className="btn btn-primary">Check another application</Link>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Determine Alert Box CSS class based on application's alertType
  let alertBoxClass = 'gov-alert-info';
  if (application.alertType === 'warning') alertBoxClass = 'gov-alert-warning';
  if (application.alertType === 'success') alertBoxClass = 'gov-alert-success';
  if (application.alertType === 'danger') alertBoxClass = 'gov-alert-danger';

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
          
          {/* Page Heading & Demonstration Badge */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
            <h1 style={{ marginBottom: 0 }}>Application status</h1>
            <span className="gov-badge gov-badge-demo" style={{ fontSize: '0.8125rem' }}>
              DEMONSTRATION RECORD
            </span>
          </div>

          <p className="lead-text">
            Simulated public-service status tracking record for demonstration purposes.
          </p>

          {/* Demonstration Notice Box */}
          <div className="gov-alert gov-alert-info" style={{ marginTop: '12px', marginBottom: '20px' }}>
            <p style={{ margin: 0 }}>
              <strong>Important demonstration disclaimer:</strong> This application status is fictional demonstration data and does not represent a real immigration application or official Government of Canada file.
            </p>
          </div>

          {/* Top Summary Card */}
          <div className="gov-summary-card">
            <span className="gov-badge gov-badge-demo">DEMONSTRATION RECORD</span>
            <div className="gov-summary-grid">
              <div>
                <span className="gov-summary-label">Applicant Name</span>
                <div className="gov-summary-value">{application.applicantName}</div>
              </div>
              <div>
                <span className="gov-summary-label">Application Type</span>
                <div className="gov-summary-value">{application.applicationType}</div>
              </div>
              <div>
                <span className="gov-summary-label">Application Number</span>
                <div className="gov-summary-value">{application.applicationNumber}</div>
              </div>
              <div>
                <span className="gov-summary-label">Last Updated</span>
                <div className="gov-summary-value">{application.lastUpdated}</div>
              </div>
              <div>
                <span className="gov-summary-label">Current Status</span>
                <div className="gov-summary-value" style={{ marginTop: '4px' }}>
                  <StatusBadge status={application.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Canada.ca Alert Box */}
          <div className={`gov-alert ${alertBoxClass}`}>
            <h2 className="gov-alert-title" style={{ fontSize: '1.125rem' }}>
              {application.alertTitle || application.status}
            </h2>
            <p>{application.statusDescription}</p>
          </div>

          {/* Dynamic Timeline Component */}
          <Timeline timeline={application.timeline} />

          {/* Dynamic Application Details Component */}
          <ApplicationDetails application={application} />

          {/* Status Explanation Section */}
          <section className="gov-explanation-section" style={{ marginTop: '24px', marginBottom: '32px' }}>
            <h2>What this status means</h2>
            <p>{application.statusDescription}</p>
            
            {application.actionRequired && (
              <div className="gov-alert gov-alert-warning" style={{ marginTop: '16px' }}>
                <h3 className="gov-alert-title">Required action</h3>
                <p>{application.actionRequired}</p>
              </div>
            )}

            <div className="gov-alert gov-alert-info" style={{ marginTop: '16px' }}>
              <h3 className="gov-alert-title">Official information resource</h3>
              <p>
                To check authentic Canadian immigration application processing times or consult official IRCC guidelines, please visit the Government of Canada website at <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener noreferrer">canada.ca/immigration</a>.
              </p>
            </div>
          </section>

          {/* Actions Bar */}
          <div className="btn-group" style={{ marginTop: '24px', paddingBottom: '24px' }}>
            <button 
              type="button" 
              className="btn btn-secondary"
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
