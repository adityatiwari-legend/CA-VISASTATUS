import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

/**
 * Polished Services Directory Page
 */
export default function Services({ onOpenDemoModal }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      <Breadcrumbs 
        items={[
          { label: 'Home', url: '/' },
          { label: 'Immigration and Visa', url: '/' },
          { label: 'Services Directory' }
        ]} 
      />

      <main id="main-content" className="gov-main-content">
        <div className="gov-container">
          <div className="gov-layout-with-sidebar">

            {/* Sidebar Navigation */}
            <aside className="gov-sidebar" aria-label="Services Navigation">
              
              {/* Mobile Sidebar Toggle Button */}
              <button 
                type="button" 
                className="gov-sidebar-mobile-toggle"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                aria-expanded={mobileSidebarOpen}
              >
                <span>Services Directory Menu</span>
                <span>{mobileSidebarOpen ? '▲' : '▼'}</span>
              </button>

              <div className={`gov-sidebar-content ${mobileSidebarOpen ? 'open' : ''}`}>
                <nav className="gov-sidebar-nav">
                  <div className="gov-sidebar-title">Immigration Services</div>
                  <ul className="gov-sidebar-list">
                    <li className="gov-sidebar-item"><a href="#visitor" className="gov-sidebar-link active">Visit Canada</a></li>
                    <li className="gov-sidebar-item"><a href="#study" className="gov-sidebar-link">Study in Canada</a></li>
                    <li className="gov-sidebar-item"><a href="#work" className="gov-sidebar-link">Work in Canada</a></li>
                    <li className="gov-sidebar-item"><a href="#pr" className="gov-sidebar-link">Permanent Residence</a></li>
                    <li className="gov-sidebar-item"><Link to="/login" className="gov-sidebar-link">Check Status</Link></li>
                    <li className="gov-sidebar-item"><Link to="/help" className="gov-sidebar-link">Help &amp; FAQs</Link></li>
                  </ul>
                </nav>

                <div className="gov-alert" style={{ borderLeftColor: 'var(--color-red-primary)', padding: '16px', background: '#FFFFFF', border: '1px solid var(--color-gray-border)', borderLeftWidth: '4px' }}>
                  <h3 style={{ fontSize: '0.9375rem', marginTop: 0, marginBottom: '6px' }}>Check sample file</h3>
                  <p className="text-small" style={{ marginBottom: '12px' }}>Already have a demonstration tracking code?</p>
                  <Link to="/login" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                    Status Checker
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <article className="gov-main-body">
              
              <h1>Immigration and Visa Services Directory</h1>
              <p className="lead-text">
                Comprehensive overview of simulated visa streams, application requirements, and standard review timelines.
              </p>

              <div className="gov-alert gov-alert-info">
                <h2 className="gov-alert-title" style={{ fontSize: '1.125rem' }}>Demonstration Architecture Notice</h2>
                <p>
                  The service descriptions below reflect the public-service information hierarchy of the Canadian immigration system. To test the status tracker for any category, navigate to the <Link to="/login">Application Status checker</Link> or click the sample record links.
                </p>
              </div>

              {/* Section: VISIT */}
              <section id="visitor" className="gov-service-block" style={{ marginTop: '36px' }}>
                <div className="gov-service-category">Stream 1</div>
                <h2 className="gov-service-heading" style={{ fontSize: '1.875rem' }}>Visit Canada</h2>
                <p className="gov-service-desc">
                  Find out what documents you need to travel to, visit, or transit through Canada temporarily for tourism, family, or business.
                </p>
                
                <h3 id="visitor-req">Visitor Visa (Temporary Resident Visa - TRV)</h3>
                <p>
                  Most travelers require either a visitor visa or an Electronic Travel Authorization (eTA) to enter or transit through Canada. A visitor visa is an official document placed in your passport that shows you meet the conditions needed to enter Canada.
                </p>
                
                <div style={{ backgroundColor: 'var(--color-gray-light)', padding: '16px 20px', borderRadius: '3px', margin: '16px 0' }}>
                  <strong style={{ display: 'block', marginBottom: '6px' }}>Demonstration sample files:</strong>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    <li><Link to="/application-status/DEMO-2026-001">DEMO-2026-001 (Application received)</Link></li>
                    <li><Link to="/application-status/DEMO-2026-004">DEMO-2026-004 (Biometrics completed)</Link></li>
                    <li><Link to="/application-status/DEMO-2026-009">DEMO-2026-009 (Approved — Demonstration Only)</Link></li>
                  </ul>
                </div>

                <h3 id="visitor-extend">Extend your stay in Canada</h3>
                <p>
                  If you are currently in Canada as a visitor and want to extend your authorized period of stay, you must apply before your current status expires (typically 30 days prior).
                </p>
              </section>

              {/* Section: STUDY */}
              <section id="study" className="gov-service-block">
                <div className="gov-service-category">Stream 2</div>
                <h2 className="gov-service-heading" style={{ fontSize: '1.875rem' }}>Study in Canada</h2>
                <p className="gov-service-desc">
                  Information on post-secondary study permits, provincial attestation letters (PAL), and international student requirements.
                </p>

                <h3 id="study-permit">Study Permit Guidelines</h3>
                <p>
                  A study permit is a document issued by immigration authorities that allows foreign nationals to study at Designated Learning Institutions (DLIs) in Canada. Most foreign nationals need a study permit to study in Canada.
                </p>

                <div style={{ backgroundColor: 'var(--color-gray-light)', padding: '16px 20px', borderRadius: '3px', margin: '16px 0' }}>
                  <strong style={{ display: 'block', marginBottom: '6px' }}>Demonstration sample files:</strong>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    <li><Link to="/application-status/DEMO-2026-002">DEMO-2026-002 (Processing)</Link></li>
                    <li><Link to="/application-status/DEMO-2026-005">DEMO-2026-005 (Background verification)</Link></li>
                  </ul>
                </div>

                <h3 id="study-work">Work while studying</h3>
                <p>
                  Eligible international students holding a valid study permit may work up to 20 hours per week off-campus during regular academic sessions, and full-time during scheduled breaks.
                </p>
              </section>

              {/* Section: WORK */}
              <section id="work" className="gov-service-block">
                <div className="gov-service-category">Stream 3</div>
                <h2 className="gov-service-heading" style={{ fontSize: '1.875rem' }}>Work in Canada</h2>
                <p className="gov-service-desc">
                  Information regarding employer-specific work permits, open work permits, and specialized mobility programs.
                </p>

                <h3 id="work-permit">Temporary Foreign Worker Program &amp; LMIA Exemptions</h3>
                <p>
                  Work permits are divided between the Temporary Foreign Worker Program (requiring a Labour Market Impact Assessment) and the International Mobility Program (LMIA-exempt pathways, including intra-company transfers and trade agreements).
                </p>

                <div style={{ backgroundColor: 'var(--color-gray-light)', padding: '16px 20px', borderRadius: '3px', margin: '16px 0' }}>
                  <strong style={{ display: 'block', marginBottom: '6px' }}>Demonstration sample files:</strong>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    <li><Link to="/application-status/DEMO-2026-003">DEMO-2026-003 (Biometrics required)</Link></li>
                    <li><Link to="/application-status/DEMO-2026-007">DEMO-2026-007 (Decision pending)</Link></li>
                  </ul>
                </div>

                <h3 id="work-pgwp">Post-Graduation Work Permit (PGWP)</h3>
                <p>
                  Graduates from eligible Canadian post-secondary institutions can apply for an open work permit lasting up to 3 years to gain qualifying Canadian work experience.
                </p>
              </section>

              {/* Section: PERMANENT RESIDENCE */}
              <section id="pr" className="gov-service-block" style={{ borderBottom: 'none' }}>
                <div className="gov-service-category">Stream 4</div>
                <h2 className="gov-service-heading" style={{ fontSize: '1.875rem' }}>Permanent Residence</h2>
                <p className="gov-service-desc">
                  Immigrate to Canada permanently through economic streams, provincial nominations, or family reunification.
                </p>

                <h3 id="pr-express">Express Entry</h3>
                <p>
                  Express Entry is an online system used to manage applications for permanent residence from skilled workers under federal economic programs.
                </p>

                <div style={{ backgroundColor: 'var(--color-gray-light)', padding: '16px 20px', borderRadius: '3px', margin: '16px 0' }}>
                  <strong style={{ display: 'block', marginBottom: '6px' }}>Demonstration sample files:</strong>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    <li><Link to="/application-status/DEMO-2026-006">DEMO-2026-006 (Additional documents required)</Link></li>
                    <li><Link to="/application-status/DEMO-2026-008">DEMO-2026-008 (Application submitted)</Link></li>
                    <li><Link to="/application-status/DEMO-2026-010">DEMO-2026-010 (Refused — Demonstration Only)</Link></li>
                  </ul>
                </div>

                <h3 id="pr-family">Family Sponsorship</h3>
                <p>
                  Permanent residents and citizens of Canada may sponsor their spouse, partner, dependent children, parents, or grandparents for permanent residence.
                </p>
              </section>

              {/* Call to action */}
              <div className="gov-alert gov-alert-info" style={{ marginTop: '36px' }}>
                <h3 className="gov-alert-title">Ready to verify a test application?</h3>
                <p>Open the demonstration application checker to view detailed timelines and sample government documentation for all streams.</p>
                <div style={{ marginTop: '16px' }}>
                  <Link to="/login" className="btn btn-primary">Open Status Checker</Link>
                </div>
              </div>

            </article>

          </div>
        </div>
      </main>
    </>
  );
}
