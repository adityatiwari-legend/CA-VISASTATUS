import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

/**
 * Government Digital Service Homepage
 * 
 * Information hierarchy:
 * 1. Breadcrumbs
 * 2. H1: Immigration and Visa Services
 * 3. Short description
 * 4. Primary horizontal status-checking panel with left red accent
 * 5. Most requested links
 * 6. Structured Service Directory (Visit, Study, Work, Permanent Residence)
 */
export default function Home({ onOpenDemoModal }) {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Home' }]} />

      <main id="main-content" className="gov-main-content">
        <div className="gov-container">

          {/* Page Heading & Lead */}
          <h1>Immigration and Visa Services</h1>
          <p className="lead-text">
            Information about visitor visas, study permits, work permits and application status.
          </p>

          {/* PRIMARY STATUS CHECK SECTION (Large Horizontal Information Panel) */}
          <section className="gov-status-check-panel" aria-labelledby="statusCheckHeading">
            <div className="gov-status-check-panel-label">
              Check your application status
            </div>
            <h2 id="statusCheckHeading">
              Check your demonstration application status
            </h2>
            <p>
              View the latest status of your demonstration visa application using your application number and date of birth.
            </p>
            <div className="btn-group" style={{ margin: 0 }}>
              <Link to="/login" className="btn btn-primary">
                Check application status
              </Link>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onOpenDemoModal}
              >
                View demo applications
              </button>
            </div>
          </section>

          {/* Most Requested Services Module */}
          <section className="gov-most-requested" aria-labelledby="mostRequestedHeading">
            <h2 id="mostRequestedHeading">Most requested</h2>
            <div className="gov-most-requested-grid">
              <div className="gov-most-requested-item">
                <span aria-hidden="true" style={{ color: 'var(--color-blue-link)', fontWeight: 700 }}>&rsaquo;</span>
                <Link to="/login">Check your application status</Link>
              </div>
              <div className="gov-most-requested-item">
                <span aria-hidden="true" style={{ color: 'var(--color-blue-link)', fontWeight: 700 }}>&rsaquo;</span>
                <Link to="/services#visitor">Find out if you need a visa to visit</Link>
              </div>
              <div className="gov-most-requested-item">
                <span aria-hidden="true" style={{ color: 'var(--color-blue-link)', fontWeight: 700 }}>&rsaquo;</span>
                <Link to="/services#study">Apply for or extend a study permit</Link>
              </div>
              <div className="gov-most-requested-item">
                <span aria-hidden="true" style={{ color: 'var(--color-blue-link)', fontWeight: 700 }}>&rsaquo;</span>
                <Link to="/services#work">Work permit categories and guidelines</Link>
              </div>
              <div className="gov-most-requested-item">
                <span aria-hidden="true" style={{ color: 'var(--color-blue-link)', fontWeight: 700 }}>&rsaquo;</span>
                <Link to="/services#pr">Permanent Residence &amp; Express Entry</Link>
              </div>
              <div className="gov-most-requested-item">
                <span aria-hidden="true" style={{ color: 'var(--color-blue-link)', fontWeight: 700 }}>&rsaquo;</span>
                <Link to="/help#biometrics">Biometrics collection guidelines</Link>
              </div>
            </div>
          </section>

          <hr className="gov-divider-thick" />

          {/* STRUCTURED SERVICE DIRECTORY */}
          <section aria-labelledby="servicesHeading">
            <h2 id="servicesHeading" style={{ marginTop: 0, marginBottom: '28px' }}>
              All immigration and visa services
            </h2>

            {/* VISIT CANADA */}
            <article className="gov-service-block">
              <div className="gov-service-category">Visit Canada</div>
              <h3 className="gov-service-heading">
                <Link to="/services#visitor">Visitor visas and travel documentation</Link>
              </h3>
              <p className="gov-service-desc">
                Find out what documentation you need to visit Canada for tourism, transit, or family visits.
              </p>
              <Link to="/services#visitor" className="gov-service-cta">
                &rarr; Learn about visiting Canada
              </Link>
            </article>

            {/* STUDY IN CANADA */}
            <article className="gov-service-block">
              <div className="gov-service-category">Study in Canada</div>
              <h3 className="gov-service-heading">
                <Link to="/services#study">Study permits and student applications</Link>
              </h3>
              <p className="gov-service-desc">
                Information about attending Designated Learning Institutions, working while studying, and permit extensions.
              </p>
              <Link to="/services#study" className="gov-service-cta">
                &rarr; Learn about study permits
              </Link>
            </article>

            {/* WORK IN CANADA */}
            <article className="gov-service-block">
              <div className="gov-service-category">Work in Canada</div>
              <h3 className="gov-service-heading">
                <Link to="/services#work">Work permits and employment applications</Link>
              </h3>
              <p className="gov-service-desc">
                Information on employer-specific work permits, open work permits, and temporary worker programs.
              </p>
              <Link to="/services#work" className="gov-service-cta">
                &rarr; Learn about work permits
              </Link>
            </article>

            {/* PERMANENT RESIDENCE */}
            <article className="gov-service-block">
              <div className="gov-service-category">Permanent Residence</div>
              <h3 className="gov-service-heading">
                <Link to="/services#pr">Permanent residence application information</Link>
              </h3>
              <p className="gov-service-desc">
                Explore economic immigration pathways, Express Entry, provincial nominee programs, and family sponsorship.
              </p>
              <Link to="/services#pr" className="gov-service-cta">
                &rarr; Explore permanent residence
              </Link>
            </article>

          </section>

        </div>
      </main>
    </>
  );
}
