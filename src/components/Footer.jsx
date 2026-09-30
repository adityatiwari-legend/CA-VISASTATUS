import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Structured Public-Service Footer Component (Dark Charcoal)
 * Three columns on desktop, clean typography, legal disclaimer.
 */
export default function Footer() {
  return (
    <footer className="gov-footer" role="contentinfo">
      <div className="gov-container">
        <div className="gov-footer-grid">

          {/* Column 1: Brand & Purpose */}
          <div className="gov-footer-column">
            <h3>Visa Status Portal</h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: '1.55', color: '#E2E8F0', marginBottom: '16px' }}>
              Immigration &amp; Visa Application Tracking Services portal. Check application status, processing times, and work permit verification.
            </p>
          </div>

          {/* Column 2: Services */}
          <div className="gov-footer-column">
            <h3>Services</h3>
            <ul className="gov-footer-list">
              <li><Link to="/services#visitor">Visit Canada</Link></li>
              <li><Link to="/services#study">Study in Canada</Link></li>
              <li><Link to="/services#work">Work in Canada</Link></li>
              <li><Link to="/services#pr">Permanent Residence</Link></li>
              <li><Link to="/login">Check Application Status</Link></li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div className="gov-footer-column">
            <h3>Information</h3>
            <ul className="gov-footer-list">
              <li><Link to="/help">Help &amp; FAQ</Link></li>
              <li><Link to="/help#contact">Contact</Link></li>
              <li><Link to="/help#disclaimer">Privacy Policy</Link></li>
              <li><Link to="/help#disclaimer">Terms of Service</Link></li>
              <li>
                <a href="https://www.canada.ca/" target="_blank" rel="noopener noreferrer">
                  Official Canada.ca website &#x2197;
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Charcoal Divider */}
      <div className="gov-footer-bottom">
        <div className="gov-container">
          <div className="gov-footer-bottom-inner">
            <div>
              &copy; 2026 Visa Status Portal &bull; Application Tracking Services.
            </div>
            <div>
              <span style={{ color: '#A0AEC0' }}>All official records verified &bull; Secure IRCC Status Portal</span>
            </div>
          </div>
          <div className="gov-disclaimer-box">
            <strong>LEGAL DISCLAIMER:</strong> This website is an independent verification portal for visa and work permit tracking. All tracking identifiers and personal records are processed securely. For official federal government departmental inquiries, visit <a href="https://www.canada.ca/" target="_blank" rel="noopener noreferrer">Canada.ca</a>.
          </div>
        </div>
      </div>
    </footer>
  );
}

