import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

/**
 * Polished Help, FAQ, and Glossary Page
 */
export default function Help() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      <Breadcrumbs 
        items={[
          { label: 'Home', url: '/' },
          { label: 'Immigration and Visa', url: '/' },
          { label: 'Help and FAQ' }
        ]} 
      />

      <main id="main-content" className="gov-main-content">
        <div className="gov-container">
          <div className="gov-layout-with-sidebar">

            {/* Sidebar Navigation */}
            <aside className="gov-sidebar" aria-label="Help Navigation">
              
              <button 
                type="button" 
                className="gov-sidebar-mobile-toggle"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                aria-expanded={mobileSidebarOpen}
              >
                <span>Help &amp; FAQ Menu</span>
                <span>{mobileSidebarOpen ? '▲' : '▼'}</span>
              </button>

              <div className={`gov-sidebar-content ${mobileSidebarOpen ? 'open' : ''}`}>
                <nav className="gov-sidebar-nav">
                  <div className="gov-sidebar-title">Help &amp; Guidance</div>
                  <ul className="gov-sidebar-list">
                    <li className="gov-sidebar-item"><a href="#faq" className="gov-sidebar-link active">Frequently Asked Questions</a></li>
                    <li className="gov-sidebar-item"><a href="#status-stages" className="gov-sidebar-link">Application Status Glossary</a></li>
                    <li className="gov-sidebar-item"><a href="#biometrics" className="gov-sidebar-link">Biometrics Collection</a></li>
                    <li className="gov-sidebar-item"><a href="#contact" className="gov-sidebar-link">Contact &amp; Inquiries</a></li>
                    <li className="gov-sidebar-item"><a href="#disclaimer" className="gov-sidebar-link">Disclaimer</a></li>
                    <li className="gov-sidebar-item"><a href="#official" className="gov-sidebar-link">Official Canada.ca Links</a></li>
                  </ul>
                </nav>

                <div className="gov-alert" style={{ borderLeftColor: 'var(--color-blue-link)', padding: '16px', background: '#FFFFFF', border: '1px solid var(--color-gray-border)', borderLeftWidth: '4px' }}>
                  <h3 style={{ fontSize: '0.9375rem', marginTop: 0, marginBottom: '6px' }}>Status Checker</h3>
                  <p className="text-small" style={{ marginBottom: '12px' }}>Verify your file using your assigned Tracking ID or Passport number.</p>
                  <Link to="/login" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>Check Status</Link>
                </div>
              </div>
            </aside>

            {/* Main Column */}
            <article className="gov-main-body">
              
              <h1>Help, Frequently Asked Questions &amp; Glossary</h1>
              <p className="lead-text">
                Learn how visa and work permit statuses are evaluated, what each milestone signifies, and how to verify your status.
              </p>

              {/* Section: FAQ */}
              <section id="faq" className="gov-service-block">
                <h2 className="gov-service-heading" style={{ fontSize: '1.875rem' }}>Frequently Asked Questions</h2>
                
                <h3>How do I check my application status?</h3>
                <p>
                  Go to the <Link to="/login">Check Application Status</Link> page. Enter your assigned Tracking ID (e.g. <code>CAN-TRK-95822412</code>) or your Passport Number (e.g. <code>T3572678</code>) along with your Date of Birth to view your official application status and work permit details.
                </p>

                <h3>What information do I need to log in?</h3>
                <p>
                  You will need your Tracking ID or Passport Number (Username) and your Date of Birth (Password).
                </p>

                <h3>What does an "Approved" status mean?</h3>
                <p>
                  An "Approved" status indicates that your application has completed all officer assessments, background screening, and eligibility checks. Your official Work Permit document number has been generated and registered.
                </p>

                <h3>Can I submit an actual visa application here?</h3>
                <p>
                  <strong>No.</strong> Under no circumstances can actual visa applications be filed through this prototype. This is purely an educational user-interface demonstration inspired by public-service design patterns.
                </p>
              </section>

              {/* Section: Status Stages Glossary */}
              <section id="status-stages" className="gov-service-block">
                <h2 className="gov-service-heading" style={{ fontSize: '1.875rem' }}>Application Status Stages Glossary</h2>
                <p>Public-service application processing follows structured administrative milestones. Below is an overview of each stage demonstrated in our 10 prototype records:</p>

                <div className="gov-table-container">
                  <table className="gov-table">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: '35%' }}>Status Stage</th>
                        <th scope="col" style={{ width: '65%' }}>Administrative Meaning</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Application submitted</strong></td>
                        <td>The application package and processing fees have been logged into the IRCC intake system and queued for triage.</td>
                      </tr>
                      <tr>
                        <td><strong>Application received</strong></td>
                        <td>Mandatory documents have passed preliminary completeness triage. Official file number has been issued.</td>
                      </tr>
                      <tr>
                        <td><strong>Biometrics required</strong></td>
                        <td>Biometric Instruction Letter (BIL) has been issued for fingerprinting and photo capture.</td>
                      </tr>
                      <tr>
                        <td><strong>Biometrics completed</strong></td>
                        <td>Fingerprints and identity validation confirmed and transmitted to the assessing office.</td>
                      </tr>
                      <tr>
                        <td><strong>Processing &amp; Review</strong></td>
                        <td>Immigration officer is actively reviewing program eligibility, labour requirements, and credentials.</td>
                      </tr>
                      <tr>
                        <td><strong>Background verification</strong></td>
                        <td>Standard statutory security, criminal history, and inter-agency clearance checks are underway.</td>
                      </tr>
                      <tr>
                        <td><strong>Final decision — Approved</strong></td>
                        <td>Application has been approved. The official Work Permit document number has been generated and issued.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section: Biometrics */}
              <section id="biometrics" className="gov-service-block">
                <h2 className="gov-service-heading" style={{ fontSize: '1.875rem' }}>Biometrics Collection Guidelines</h2>
                <p>Biometrics (fingerprints and digital photo) are required for most foreign nationals applying for a visitor visa, study or work permit, or permanent residence.</p>
                
                <div className="gov-alert gov-alert-warning">
                  <h3 className="gov-alert-title">Biometric Instruction Letter (BIL) Notice</h3>
                  <p>Applicants must receive an official Biometric Instruction Letter before scheduling an appointment at an authorized Visa Application Centre (VAC) or collection site. Appointments cannot be fulfilled without this document.</p>
                </div>

                <ul style={{ paddingLeft: '20px', lineHeight: 1.8 }}>
                  <li><strong>Validity:</strong> Biometrics are generally valid for 10 years for temporary residence applications.</li>
                  <li><strong>Appointment process:</strong> Book an appointment online at a designated Visa Application Centre (VAC).</li>
                  <li><strong>Required items:</strong> Valid physical passport and printed Biometric Instruction Letter.</li>
                </ul>
              </section>

              {/* Section: Contact */}
              <section id="contact" className="gov-service-block">
                <h2 className="gov-service-heading" style={{ fontSize: '1.875rem' }}>Contact &amp; Inquiries</h2>
                <p>
                  For assistance regarding Canadian immigration applications, consult official support channels:
                </p>
                <div className="gov-alert gov-alert-info">
                  <p style={{ margin: 0 }}>
                    For inquiries about Canadian immigration files, consult the official IRCC Web form or telephone support via the Government of Canada website at <a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/contact-ircc.html" target="_blank" rel="noopener noreferrer">canada.ca/contact-ircc</a>.
                  </p>
                </div>
              </section>

              {/* Section: Legal Disclaimer */}
              <section id="disclaimer" className="gov-service-block">
                <h2 className="gov-service-heading" style={{ fontSize: '1.875rem' }}>Legal Notice &amp; Privacy</h2>
                <div className="gov-alert gov-alert-info">
                  <h3 className="gov-alert-title">IRCC STATUS VERIFICATION PORTAL</h3>
                  <p>This verification portal provides secure lookups for work permit status and confirmation tracking. All records and document numbers are processed securely.</p>
                  <p style={{ marginBottom: 0 }}>
                    For official departmental guidelines and federal immigration policy, refer to <a href="https://www.canada.ca/" target="_blank" rel="noopener noreferrer">Canada.ca</a>.
                  </p>
                </div>
              </section>

              {/* Section: Official Links */}
              <section id="official" className="gov-service-block" style={{ borderBottom: 'none' }}>
                <h2 className="gov-service-heading" style={{ fontSize: '1.875rem' }}>Official Government of Canada Resources</h2>
                <p>If you are looking for real immigration information, legal application portals, official status trackers, or travel advisories, please consult the official resources below:</p>
                
                <ul style={{ paddingLeft: '20px', lineHeight: 2 }}>
                  <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener noreferrer">Official IRCC Homepage — Canada.ca &UpperRightArrow;</a></li>
                  <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-status.html" target="_blank" rel="noopener noreferrer">Official IRCC Client Application Status Tool &UpperRightArrow;</a></li>
                  <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html" target="_blank" rel="noopener noreferrer">Official IRCC Check Processing Times Tool &UpperRightArrow;</a></li>
                  <li><a href="https://travel.gc.ca/" target="_blank" rel="noopener noreferrer">Official Travel.gc.ca — Travel Advice and Advisories &UpperRightArrow;</a></li>
                </ul>
              </section>

            </article>

          </div>
        </div>
      </main>
    </>
  );
}
