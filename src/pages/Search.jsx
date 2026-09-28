import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import applicationsData from '../data/applications.json';

const STATIC_SEARCH_ITEMS = [
  {
    title: 'Check Application Status',
    url: '/login',
    category: 'Services',
    description: 'Use the demonstration status checker to sign in with a simulated application number and date of birth.'
  },
  {
    title: 'Visitor Visas (Temporary Resident)',
    url: '/services#visitor',
    category: 'Visit',
    description: 'Find information about requirements, eligibility, processing times, and documentation needed to visit Canada temporarily for tourism or family.'
  },
  {
    title: 'Study Permits & Student Visas',
    url: '/services#study',
    category: 'Study',
    description: 'Understand requirements for attending a Designated Learning Institution, provincial attestation letters (PAL), and post-graduation options.'
  },
  {
    title: 'Work Permits & Labour Market Verification',
    url: '/services#work',
    category: 'Work',
    description: 'Explore employer-specific work permits, open work permits, Intra-Company Transferees, and temporary foreign worker processing.'
  },
  {
    title: 'Permanent Residence Streams',
    url: '/services#pr',
    category: 'Immigration',
    description: 'Overview of economic immigration streams, Express Entry (FSW, CEC, FST), Provincial Nominee Programs (PNP), and family sponsorship.'
  },
  {
    title: 'Biometrics Collection Guidelines',
    url: '/help#biometrics',
    category: 'Help & Guidance',
    description: 'Instructions for booking biometric appointments at Visa Application Centres (VAC), fee guidelines, and Biometric Instruction Letter (BIL) validity.'
  },
  {
    title: 'Understanding Status Stages & Timelines',
    url: '/help#status-stages',
    category: 'Help & Guidance',
    description: 'Detailed breakdown of public-service application statuses: Submitted, Received, Processing, Biometrics Required, and Background Verification.'
  },
  {
    title: 'Demonstration Portal Disclaimer & Purpose',
    url: '/help#disclaimer',
    category: 'About Demo',
    description: 'Important information regarding the fictional nature of this prototype and official links to the real Government of Canada immigration portal.'
  }
];

export default function Search({ onOpenDemoModal }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setSearchTerm(queryParam);
    performSearch(queryParam);
  }, [queryParam]);

  const performSearch = (q) => {
    const clean = (q || '').trim().toLowerCase();

    // Combine static items with demo applicants
    const allSearchable = [
      ...STATIC_SEARCH_ITEMS,
      ...applicationsData.map(app => ({
        title: `${app.applicantName} (${app.applicationNumber})`,
        url: `/application-status/${app.applicationNumber}`,
        category: `Demo Record — ${app.applicationType}`,
        description: `Fictional demonstration file for ${app.applicantName}. Current status: ${app.status}. Stage: ${app.currentStage}.`
      }))
    ];

    if (!clean) {
      setResults(STATIC_SEARCH_ITEMS);
      return;
    }

    const terms = clean.split(/\s+/);
    const matches = allSearchable.filter(item => {
      const haystack = `${item.title} ${item.description} ${item.category}`.toLowerCase();
      return terms.every(term => haystack.includes(term));
    });

    setResults(matches);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(searchTerm.trim() ? { q: searchTerm.trim() } : {});
  };

  return (
    <>
      <Breadcrumbs 
        items={[
          { label: 'Home', url: '/' },
          { label: 'Immigration and Visa', url: '/' },
          { label: 'Search results' }
        ]} 
      />

      <main id="main-content" className="gov-main-content">
        <div className="gov-container" style={{ maxWidth: '960px' }}>

          <h1>Search results</h1>

          {/* Search Form */}
          <form className="gov-form" onSubmit={handleSearchSubmit} style={{ maxWidth: '100%', marginBottom: '28px' }} role="search">
            <div className="gov-form-group">
              <label htmlFor="searchPageInput" className="gov-form-label">Search terms</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  id="searchPageInput" 
                  className="gov-form-input" 
                  placeholder="e.g. visitor, study, DEMO-2026-001, biometrics" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  required 
                  style={{ flex: 1, height: '48px' }}
                />
                <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap', height: '48px' }}>
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* Results Metadata */}
          <div style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
            {queryParam ? (
              <span>
                Showing <strong>{results.length}</strong> demonstration result{results.length === 1 ? '' : 's'} for "<strong>{queryParam}</strong>":
              </span>
            ) : (
              <span>Showing all key demonstration services and sections:</span>
            )}
          </div>

          {/* Results List */}
          <div role="region" aria-live="polite">
            {results.length === 0 ? (
              <div className="gov-alert gov-alert-warning">
                <h2 className="gov-alert-title">No demonstration records found</h2>
                <p>We could not find any pages or demo files matching your search term.</p>
                <ul style={{ marginTop: '8px', marginLeft: '20px', lineHeight: 1.8 }}>
                  <li>Check your spelling</li>
                  <li>Search for broad terms like <strong>visitor</strong>, <strong>study</strong>, <strong>work</strong>, or <strong>biometrics</strong></li>
                  <li>Search for application numbers like <code>DEMO-2026-001</code></li>
                  <li>Or click <button type="button" style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-blue-link)', textDecoration: 'underline', cursor: 'pointer' }} onClick={onOpenDemoModal}>View 10 Demo Records</button></li>
                </ul>
              </div>
            ) : (
              results.map((item, index) => (
                <article key={index} className="gov-service-block" style={{ paddingBottom: '20px', marginBottom: '24px' }}>
                  <div className="gov-service-category">
                    {item.category}
                  </div>
                  <h2 className="gov-service-heading" style={{ fontSize: '1.35rem', marginBottom: '6px' }}>
                    <Link to={item.url}>{item.title}</Link>
                  </h2>
                  <p className="gov-service-desc" style={{ fontSize: '1rem', marginBottom: '8px' }}>
                    {item.description}
                  </p>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-blue-link)' }}>
                    {item.url}
                  </div>
                </article>
              ))
            )}
          </div>

        </div>
      </main>
    </>
  );
}
