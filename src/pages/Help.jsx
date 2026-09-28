import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

/**
 * Help, FAQ, and Glossary Page
 */
export default function Help({ onOpenDemoModal }) {
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
              <nav className="gov-sidebar-nav">
                <div className="gov-sidebar-header">Help &amp; Guidance</div>
                <ul className="gov-sidebar-list">
                  <li className="gov-sidebar-item"><a href="#faq" className="gov-sidebar-link active">Frequently Asked Questions</a></li>
                  <li className="gov-sidebar-item"><a href="#status-stages" className="gov-sidebar-link">Application Status Glossary</a></li>
                  <li className="gov-sidebar-item"><a href="#biometrics" className="gov-sidebar-link">Biometrics Collection</a></li>
                  <li className="gov-sidebar-item"><a href="#disclaimer" className="gov-sidebar-link">Demonstration Disclaimer</a></li>
                  <li className="gov-sidebar-item"><a href="#official" className="gov-sidebar-link">Official Canada.ca Links</a></li>
                </ul>
              </nav>

              <div className="gov-alert" style={{ borderLeftColor: 'var(--color-blue-link)', padding: '14px', background: '#FFFFFF', border: '1px solid var(--color-gray-border)', borderLeftWidth: '4px' }}>
                <h3 style={{ fontSize: '0.9375rem', marginTop: 0, marginBottom: '6px' }}>Status Checker</h3>
                <p className="text-small" style={{ marginBottom: '10px' }}>Test the lookup tool with sample file <code>DEMO-2026-001</code>.</p>
                <Link to="/login" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>Check Status</Link>
              </div>
            </aside>

            {/* Main Column */}
            <article className="gov-main-body">
              
              <h1>Help, Frequently Asked Questions &amp; Glossary</h1>
              <p className="lead-text">
                Learn how visa statuses are evaluated, what each milestone signifies, and how to use this dynamic prototype.
              </p>

              {/* Section: FAQ */}
              <section id="faq" className="gov-service-block">
                <h2 className="gov-service-heading" style={{ fontSize: '1.75rem' }}>Frequently Asked Questions</h2>
                
                <h3>How do I test the application status tracker?</h3>
                <p>
                  Go to the <Link to="/login">Check Application Status</Link> page. Enter any predefined file identifier from <code>DEMO-2026-001</code> to <code>DEMO-2026-010</code>, or click the <strong>"View demo applications"</strong> button to load one of the 10 sample applicant files with a single click.
                </p>

                <h3>Do I need real login credentials or a GCKey?</h3>
                <p>
                  No. This prototype is client-side and simulated. It does not use login systems, real passwords, real GCKeys, or external database queries. It runs safely in any modern browser without network delays or server infrastructure.
                </p>

                <h3>Why does an application show "Additional documents required"?</h3>
                <p>
                  During assessment, an immigration officer may require supplementary documentation (such as updated bank statements, revised employer letters, or police clearance certificates) before making a final determination. In our demo records, file <Link to="/application-status/DEMO-2026-006">DEMO-2026-006</Link> illustrates this state.
                </p>

                <h3>Can I submit an actual visa application here?</h3>
                <p>
                  <strong>No.</strong> Under no circumstances can actual visa applications be filed through this prototype. This is purely an educational user-interface demonstration inspired by public-service design patterns.
                </p>
              </section>

              {/* Section: Status Stages Glossary */}
              <section id="status-stages" className="gov-service-block">
                <h2 className="gov-service-heading" style={{ fontSize: '1.75rem' }}>Application Status Stages Glossary</h2>
                <p>Public-service application processing follows structured administrative milestones. Below is an overview of each stage demonstrated in our 10 prototype records:</p>

                <div className="gov-table-container">
                  <table className="gov-table">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: '25%' }}>Status Stage</th>
                        <th scope="col" style={{ width: '55%' }}>Administrative Meaning</th>
                        <th scope="col" style={{ width: '20%' }}>Sample File</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Application received</strong></td>
                        <td>Mandatory documents have passed preliminary triage. An official file number has been registered and queued for officer assignment.</td>
                        <td><Link to="/application-status/DEMO-2026-001">DEMO-2026-001</Link></td>
                      </tr>
                      <tr>
                        <td><strong>Processing</strong></td>
                        <td>An immigration processing officer is actively verifying program eligibility, employment credentials, or educational enrollment.</td>
                        <td><Link to="/application-status/DEMO-2026-002">DEMO-2026-002</Link></td>
                      </tr>
                      <tr>
                        <td><strong>Biometrics required</strong></td>
                        <td>Biometric collection letter (BIL) has been issued. Processing pauses until the applicant attends a Visa Application Centre.</td>
                        <td><Link to="/application-status/DEMO-2026-003">DEMO-2026-003</Link></td>
                      </tr>
                      <tr>
                        <td><strong>Biometrics completed</strong></td>
                        <td>Fingerprints and photographs have been validated against the system and file assessment resumes.</td>
                        <td><Link to="/application-status/DEMO-2026-004">DEMO-2026-004</Link></td>
                      </tr>
                      <tr>
                        <td><strong>Background verification</strong></td>
                        <td>Standard statutory security, criminal history, and international clearance checks are conducted with partner agencies.</td>
                        <td><Link to="/application-status/DEMO-2026-005">DEMO-2026-005</Link></td>
                      </tr>
                      <tr>
                        <td><strong>Additional documents required</strong></td>
                        <td>Procedural fairness or documentation request issued to applicant with a specific response deadline.</td>
                        <td><Link to="/application-status/DEMO-2026-006">DEMO-2026-006</Link></td>
                      </tr>
                      <tr>
                        <td><strong>Decision pending</strong></td>
                        <td>All substantive assessments, medicals, and background checks have completed. File is pending final supervisory sign-off.</td>
                        <td><Link to="/application-status/DEMO-2026-007">DEMO-2026-007</Link></td>
                      </tr>
                      <tr>
                        <td><strong>Application submitted</strong></td>
                        <td>The application has been logged into the intake database and is waiting for initial intake triage and completeness confirmation.</td>
                        <td><Link to="/application-status/DEMO-2026-008">DEMO-2026-008</Link></td>
                      </tr>
                      <tr>
                        <td><strong>Approved — Demonstration Only</strong></td>
                        <td>Simulated positive outcome. A counterfoil record or introduction letter is simulated for demonstration testing.</td>
                        <td><Link to="/application-status/DEMO-2026-009">DEMO-2026-009</Link></td>
                      </tr>
                      <tr>
                        <td><strong>Refused — Demonstration Only</strong></td>
                        <td>Simulated refusal outcome where statutory eligibility criteria were not satisfied in the test file.</td>
                        <td><Link to="/application-status/DEMO-2026-010">DEMO-2026-010</Link></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section: Biometrics */}
              <section id="biometrics" className="gov-service-block">
                <h2 className="gov-service-heading" style={{ fontSize: '1.75rem' }}>Biometrics Collection Guidelines</h2>
                <p>Biometrics (fingerprints and digital photo) are required for most foreign nationals applying for a visitor visa, study or work permit, or permanent residence.</p>
                
                <div className="gov-alert gov-alert-warning">
                  <h3 className="gov-alert-title">Biometric Instruction Letter (BIL) Notice</h3>
                  <p>Applicants must receive an official Biometric Instruction Letter before scheduling an appointment at an authorized Visa Application Centre (VAC) or collection site. Appointments cannot be fulfilled without this document.</p>
                </div>

                <ul className="gov-service-links">
                  <li><strong>Validity:</strong> Biometrics are generally valid for 10 years for temporary residence applications.</li>
                  <li><strong>Appointment process:</strong> Book an appointment online at a designated Visa Application Centre (VAC).</li>
                  <li><strong>Required items:</strong> Valid physical passport and printed Biometric Instruction Letter.</li>
                </ul>
              </section>

              {/* Section: Demonstration Disclaimer */}
              <section id="disclaimer" className="gov-service-block">
                <h2 className="gov-service-heading" style={{ fontSize: '1.75rem' }}>Demonstration Disclaimer &amp; Ethics Notice</h2>
                <div className="gov-alert gov-alert-info">
                  <h3 className="gov-alert-title">DEMO PORTAL — NOT AN OFFICIAL GOVERNMENT OF CANADA SERVICE</h3>
                  <p>This website is an independent static demonstration website created for portfolio, technical evaluation, and educational demonstration purposes only. It is not affiliated with, endorsed by, or connected to:</p>
                  <ul style={{ margin: '8px 0 12px 20px' }}>
                    <li>The Government of Canada</li>
                    <li>Immigration, Refugees and Citizenship Canada (IRCC)</li>
                    <li>The Canada Border Services Agency (CBSA)</li>
                    <li>Any official Canadian diplomatic mission or embassy</li>
                  </ul>
                  <p>This prototype does not collect, transmit, or store real applicant data. All 10 applicant names, application numbers, birth dates, and statuses are entirely fictional.</p>
                </div>
              </section>

              {/* Section: Official Links */}
              <section id="official" className="gov-service-block" style={{ borderBottom: 'none' }}>
                <h2 className="gov-service-heading" style={{ fontSize: '1.75rem' }}>Official Government of Canada Resources</h2>
                <p>If you are looking for real immigration information, legal application portals, official status trackers, or travel advisories, please consult the official resources below:</p>
                
                <ul className="gov-service-links">
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
