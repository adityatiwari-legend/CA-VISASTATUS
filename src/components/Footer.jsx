import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Compact Structured Government-Service Footer Component (Dark Charcoal)
 * Three columns on desktop, clean typography, compact legal disclaimer.
 */
export default function Footer({ onOpenDemoModal }) {
  return (
    <footer className="gov-footer" role="contentinfo">
      <div className="gov-container">
        <div className="gov-footer-grid">

          {/* Column 1: Brand & Fictional Purpose */}
          <div className="gov-footer-column">
            <h3>Visa Status Portal</h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: '1.55', color: '#E2E8F0', marginBottom: '16px' }}>
              Immigration Application Services demonstration portal. An independent technical prototype inspired by Canadian public-service design patterns.
            </p>
            {onOpenDemoModal && (
              <button 
                type="button" 
                className="btn btn-secondary btn-sm" 
                style={{ backgroundColor: '#FFFFFF', color: '#263238', height: '36px' }}
                onClick={onOpenDemoModal}
              >
                View 10 Demo Records
              </button>
            )}
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
              <li><Link to="/help#disclaimer">Privacy</Link></li>
              <li><Link to="/help#disclaimer">Terms</Link></li>
              <li>
                <a href="https://www.canada.ca/" target="_blank" rel="noopener noreferrer">
                  Official Canada.ca website &#x2197;
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Charcoal Divider & Compact Non-Affiliation Notice */}
      <div className="gov-footer-bottom">
        <div className="gov-container">
          <div className="gov-footer-bottom-inner">
            <div>
              &copy; 2026 Visa Status Portal &bull; Independent demonstration website.
            </div>
            <div>
              <span style={{ color: '#A0AEC0' }}>Static Prototype &bull; Zero Backend &bull; Client-Side Simulated</span>
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
