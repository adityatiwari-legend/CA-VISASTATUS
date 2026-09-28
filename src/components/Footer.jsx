import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Large Government-Service Footer Component (Dark Charcoal)
 * Fully compliant with Canada.ca visual hierarchy and non-impersonation ethics.
 */
export default function Footer({ onOpenDemoModal }) {
  return (
    <footer className="gov-footer" role="contentinfo">
      <div className="gov-container">
        <div className="gov-footer-grid">

          {/* Services Column */}
          <div className="gov-footer-column">
            <h3>Services</h3>
            <ul className="gov-footer-list">
              <li><Link to="/services#visitor">Visit Canada</Link></li>
              <li><Link to="/services#study">Study in Canada</Link></li>
              <li><Link to="/services#work">Work in Canada</Link></li>
              <li><Link to="/services#pr">Permanent Residence</Link></li>
              <li><Link to="/login">Application Status Checker</Link></li>
            </ul>
          </div>

          {/* Information Column */}
          <div className="gov-footer-column">
            <h3>Information</h3>
            <ul className="gov-footer-list">
              <li><Link to="/help">Help &amp; Documentation</Link></li>
              <li><Link to="/help#biometrics">Biometrics Guidelines</Link></li>
              <li><Link to="/help#status-stages">Processing Stages Guide</Link></li>
              <li><Link to="/help#disclaimer">Privacy &amp; Data Ethics</Link></li>
              <li><Link to="/help#disclaimer">Terms of Demonstration</Link></li>
            </ul>
          </div>

          {/* Demo Portal Column */}
          <div className="gov-footer-column">
            <h3>Demo Portal</h3>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.5', color: '#E2E8F0' }}>
              Independent static demonstration website inspired by Canada.ca government-service design patterns. Built for interface prototyping.
            </p>
            {onOpenDemoModal && (
              <div style={{ marginTop: '12px' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm" 
                  style={{ color: '#333333' }}
                  onClick={onOpenDemoModal}
                >
                  View 10 Demo Records
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Charcoal Disclaimer Bar */}
      <div className="gov-footer-bottom">
        <div className="gov-container">
          <div className="gov-footer-bottom-inner">
            <div>
              &copy; 2026 Visa Status Demo. All rights reserved.
            </div>
            <div>
              <span>Static Prototype &bull; Zero Backend &bull; Completely Static</span>
            </div>
          </div>
          <div className="gov-disclaimer-box">
            <strong>LEGAL DISCLAIMER:</strong> This website is an independent technical demonstration and is NOT affiliated with, endorsed by, or connected to the Government of Canada, Immigration, Refugees and Citizenship Canada (IRCC), or any Canadian governmental department. It does not issue visas, accept official applications, or process legal immigration claims. For official services, visit <a href="https://www.canada.ca/" target="_blank" rel="noopener noreferrer">Canada.ca</a>.
          </div>
        </div>
      </div>
    </footer>
  );
}
