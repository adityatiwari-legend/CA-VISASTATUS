import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Homepage matching exact reference UI (Top-Left screen):
 * - Two-column hero with Parliament photo & floating card
 * - "All immigration and visa services" with 4 cards grid
 * - Horizontal callout card with red left accent and document icon
 */
export default function Home({ onOpenDemoModal }) {
  return (
    <main id="main-content" className="ca-main-content">
      <div className="gov-container">

        {/* 1. Hero Section (Split 2 Columns) */}
        <section className="ca-home-hero" aria-labelledby="homeHeroHeading">
          <div className="ca-home-hero-content">
            <h1 id="homeHeroHeading" className="ca-home-hero-title">
              Immigration and<br />Visa Services
            </h1>
            <p className="ca-home-hero-sub">
              Information about visitor visas, study permits, work permits and application status.
            </p>
            <div className="ca-home-hero-actions">
              <Link to="/login" className="ca-btn ca-btn-primary">
                Check application status &rarr;
              </Link>
              <Link to="/services" className="ca-btn ca-btn-secondary">
                Explore all services
              </Link>
            </div>
          </div>

          <div className="ca-home-hero-media">
            <div className="ca-home-hero-img-wrapper">
              <img 
                src="/images/parliament.jpg" 
                alt="Canadian Parliament Buildings and river in Ottawa" 
                className="ca-home-hero-img"
              />
              <Link to="/services" className="ca-home-hero-overlay-card">
                <span>Find information and resources for your immigration journey.</span>
                <span className="ca-overlay-arrow" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. All Immigration and Visa Services Section */}
        <section className="ca-services-section" aria-labelledby="allServicesHeading">
          <h2 id="allServicesHeading" className="ca-section-heading">
            All immigration and visa services
          </h2>
          <p className="ca-section-sub">
            Explore information about the different types of applications and services.
          </p>

          <div className="ca-service-cards-grid">
            
            {/* Card 1: Visit Canada */}
            <article className="ca-service-card">
              <div className="ca-card-icon-wrap ca-icon-plane">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                </svg>
              </div>
              <h3 className="ca-card-title">Visit Canada</h3>
              <p className="ca-card-desc">
                Visitor visas and travel documentation.
              </p>
              <Link to="/services#visitor" className="ca-card-link">
                Learn about visiting Canada &rarr;
              </Link>
            </article>

            {/* Card 2: Study in Canada */}
            <article className="ca-service-card">
              <div className="ca-card-icon-wrap ca-icon-study">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <h3 className="ca-card-title">Study in Canada</h3>
              <p className="ca-card-desc">
                Study permits and student applications.
              </p>
              <Link to="/services#study" className="ca-card-link">
                Learn about study permits &rarr;
              </Link>
            </article>

            {/* Card 3: Work in Canada */}
            <article className="ca-service-card">
              <div className="ca-card-icon-wrap ca-icon-work">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="ca-card-title">Work in Canada</h3>
              <p className="ca-card-desc">
                Work permits and employment applications.
              </p>
              <Link to="/services#work" className="ca-card-link">
                Learn about work permits &rarr;
              </Link>
            </article>

            {/* Card 4: Permanent Residence */}
            <article className="ca-service-card">
              <div className="ca-card-icon-wrap ca-icon-pr">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="ca-card-title">Permanent Residence</h3>
              <p className="ca-card-desc">
                Permanent residence application information.
              </p>
              <Link to="/services#pr" className="ca-card-link">
                Explore permanent residence &rarr;
              </Link>
            </article>

          </div>
        </section>

        {/* 3. Horizontal Status Check Callout Banner */}
        <section className="ca-status-callout-banner" aria-labelledby="statusCalloutHeading">
          <div className="ca-status-callout-left">
            <div className="ca-status-callout-icon" aria-hidden="true">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#D52B1E" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                width="34"
                height="34"
                style={{ width: '34px', height: '34px', minWidth: '34px', flexShrink: 0, display: 'block' }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="ca-status-callout-text">
              <h3 id="statusCalloutHeading" className="ca-status-callout-title">
                Check your application status
              </h3>
              <p className="ca-status-callout-desc">
                View the latest status of your demonstration visa application using your application number and date of birth.
              </p>
            </div>
          </div>
          <div className="ca-status-callout-right">
            <Link to="/login" className="ca-btn ca-btn-primary">
              Check application status &rarr;
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
