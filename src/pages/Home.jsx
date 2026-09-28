import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

/**
 * Static Government Information Homepage (90% static content)
 * Strict Canada.ca layout, typography, most requested links, and structured services.
 */
export default function Home({ onOpenDemoModal }) {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home' }]} />

      <main id="main-content" className="gov-main-content">
        <div className="gov-container">

          {/* Main H1 */}
          <h1>Immigration and Visa Services</h1>
          <p className="lead-text">
            Find information about visa applications, application status and immigration services.
          </p>

          {/* Prominent Demo Alert */}
          <div className="gov-alert gov-alert-info" role="region" aria-label="Demonstration Notice">
            <h2 className="gov-alert-title" style={{ fontSize: '1.125rem' }}>
              DEMO PORTAL — NOT AN OFFICIAL GOVERNMENT OF CANADA SERVICE
            </h2>
            <p>
              This website is an independent static demonstration built for interface evaluation and technical prototyping. It does not connect to real government databases, IRCC, or official visa systems. All names, numbers, and decisions are predefined fictional test records.
            </p>
            <p style={{ marginTop: '6px' }}>
              For authentic Canadian immigration inquiries, visit the official Government of Canada website at <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener noreferrer">canada.ca/immigration</a>.
            </p>
          </div>

          {/* Quick Action Hero Block: Check Application Status */}
          <section className="gov-status-hero" aria-labelledby="statusHeroHeading">
            <h2 id="statusHeroHeading">Application Status</h2>
            <p><strong>Check your application status</strong></p>
            <p className="gov-service-desc">
              Use the demonstration status checker to sign in with a simulated application number and date of birth to view dynamic timeline milestones.
            </p>
            <div className="btn-group">
              <Link to="/login" className="btn btn-primary">
                Check application status
              </Link>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onOpenDemoModal}
              >
                View 10 demo applications
              </button>
            </div>
          </section>

          {/* Most Requested Links (Canada.ca standard design pattern) */}
          <section className="gov-most-requested" aria-labelledby="mostRequestedHeading">
            <h2 id="mostRequestedHeading">Most requested</h2>
            <div className="gov-most-requested-grid">
              <div className="gov-most-requested-item">
                <span>&rsaquo;</span>
                <Link to="/login">Check your application status</Link>
              </div>
              <div className="gov-most-requested-item">
                <span>&rsaquo;</span>
                <Link to="/services#visitor">Find out if you need a visa to visit</Link>
              </div>
              <div className="gov-most-requested-item">
                <span>&rsaquo;</span>
                <Link to="/services#study">Apply for or extend a study permit</Link>
              </div>
              <div className="gov-most-requested-item">
                <span>&rsaquo;</span>
                <Link to="/services#work">Work permit categories and guidelines</Link>
              </div>
              <div className="gov-most-requested-item">
                <span>&rsaquo;</span>
                <Link to="/services#pr">Permanent Residence &amp; Express Entry</Link>
              </div>
              <div className="gov-most-requested-item">
                <span>&rsaquo;</span>
                <Link to="/help#biometrics">Biometrics collection and requirements</Link>
              </div>
            </div>
          </section>

          <hr className="gov-divider-thick" />

          {/* Structured Service Navigation (Canada.ca pattern: Heading -> Short desc -> Blue links -> Divider) */}
          <section aria-labelledby="servicesHeading">
            <h2 id="servicesHeading" style={{ marginTop: 0, marginBottom: '24px' }}>
              All immigration and visa services
            </h2>

            {/* VISIT */}
            <article className="gov-service-block">
              <h3 className="gov-service-heading">
                <Link to="/services#visitor">Visit Canada</Link>
              </h3>
              <p className="gov-service-desc">
                Find information about visitor visas, electronic travel authorization (eTA), and travel documentation.
              </p>
              <ul className="gov-service-links">
                <li><Link to="/services#visitor-req">Visitor visa eligibility and requirements</Link></li>
                <li><Link to="/services#visitor-extend">Extend your stay as a visitor or tourist</Link></li>
                <li><Link to="/services#visitor-transit">Transit through a Canadian airport</Link></li>
              </ul>
            </article>

            {/* STUDY */}
            <article className="gov-service-block">
              <h3 className="gov-service-heading">
                <Link to="/services#study">Study in Canada</Link>
              </h3>
              <p className="gov-service-desc">
                Information about study permits, student direct streams, and post-graduation student applications.
              </p>
              <ul className="gov-service-links">
                <li><Link to="/services#study-permit">Apply for a post-secondary study permit</Link></li>
                <li><Link to="/services#study-extend">Extend your study permit or student status</Link></li>
                <li><Link to="/services#study-work">Work on or off-campus while studying</Link></li>
              </ul>
            </article>

            {/* WORK */}
            <article className="gov-service-block">
              <h3 className="gov-service-heading">
                <Link to="/services#work">Work in Canada</Link>
              </h3>
              <p className="gov-service-desc">
                Information about work permits, employer compliance, and temporary foreign worker employment-related applications.
              </p>
              <ul className="gov-service-links">
                <li><Link to="/services#work-permit">Temporary Foreign Worker Program &amp; LMIA</Link></li>
                <li><Link to="/services#work-intra">Intra-company transferee work permits</Link></li>
                <li><Link to="/services#work-pgwp">Post-Graduation Work Permit (PGWP)</Link></li>
              </ul>
            </article>

            {/* PERMANENT RESIDENCE */}
            <article className="gov-service-block">
              <h3 className="gov-service-heading">
                <Link to="/services#pr">Permanent Residence</Link>
              </h3>
              <p className="gov-service-desc">
                Information about permanent residence applications, economic immigration streams, and family sponsorship.
              </p>
              <ul className="gov-service-links">
                <li><Link to="/services#pr-express">Express Entry (Federal Skilled Worker &amp; Trades)</Link></li>
                <li><Link to="/services#pr-pnp">Provincial Nominee Programs (PNP)</Link></li>
                <li><Link to="/services#pr-family">Sponsor your spouse, partner, or child</Link></li>
              </ul>
            </article>

            {/* APPLICATION STATUS */}
            <article className="gov-service-block" style={{ borderBottom: 'none' }}>
              <h3 className="gov-service-heading">
                <Link to="/login">Check your application status</Link>
              </h3>
              <p className="gov-service-desc">
                View a demonstration application status using the prototype online checker with realistic verification stages.
              </p>
              <ul className="gov-service-links">
                <li><Link to="/login">Open the demonstration status sign-in form</Link></li>
                <li><Link to="/help#status-stages">Understand status terms: Biometrics, Background Check, Decision</Link></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenDemoModal(); }}>Browse the 10 available test profiles</a></li>
              </ul>
            </article>

          </section>

          {/* Institutional Information Box */}
          <section className="gov-alert" style={{ marginTop: '32px', borderLeftColor: 'var(--color-gray-dark)', backgroundColor: 'var(--color-gray-light)' }} aria-labelledby="aboutDemoHeading">
            <h3 id="aboutDemoHeading" className="gov-alert-title" style={{ color: 'var(--color-text-main)' }}>
              About this demonstration prototype
            </h3>
            <p>
              This application was designed to demonstrate high-fidelity implementation of public-service design standards, rigorous accessibility compliance, structured information architecture, and responsive government layout patterns. No real personal information or official state databases are utilized.
            </p>
          </section>

        </div>
      </main>
    </>
  );
}
