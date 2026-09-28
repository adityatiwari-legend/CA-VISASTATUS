import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

/**
 * Government Digital Service Header Component
 * Two-level header with slim top disclaimer, brand wordmark, search, and primary navigation.
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // "Application Status" active state should light up when inside the status flow
  const isStatusFlow = 
    location.pathname.startsWith('/login') || 
    location.pathname.startsWith('/status') || 
    location.pathname.startsWith('/application-status');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLanguageClick = (e) => {
    e.preventDefault();
    alert('Démonstration en français : Ce portail statique est un prototype d\'évaluation technique. Les 10 dossiers fictifs sont consultables en version anglaise.');
  };

  return (
    <>

      {/* Main Header Container */}
      <header className="gov-header" role="banner">
        <div className="gov-container">
          <div className="gov-top-bar">
            
            {/* Fictional Portal Wordmark Brand */}
            <Link to="/" className="gov-brand" aria-label="Visa Status Portal Home">
              <div className="gov-brand-icon" aria-hidden="true">V</div>
              <div className="gov-brand-text">
                <span className="gov-brand-title">Visa Status Portal</span>
                <span className="gov-brand-subtitle">Immigration Application Services</span>
              </div>
            </Link>

            {/* Header Right: Language, Search, and Mobile Toggle */}
            <div className="gov-header-utilities">
              
              <a href="#" className="gov-lang-link" onClick={handleLanguageClick} lang="fr">
                Français
              </a>

              {/* Polished Search Control (44px height, clean border, subtle focus ring) */}
              <form className="gov-search-form" onSubmit={handleSearchSubmit} role="search">
                <div className="gov-search-control">
                  <label htmlFor="headerSearchInput" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }}>
                    Search the demonstration portal...
                  </label>
                  <input 
                    type="search" 
                    id="headerSearchInput" 
                    className="gov-search-input" 
                    placeholder="Search the demonstration portal..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required 
                    autoComplete="off"
                  />
                  <button type="submit" className="gov-search-btn" aria-label="Submit search">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 14z"/>
                    </svg>
                  </button>
                </div>
              </form>

              {/* Mobile Menu Button */}
              <button 
                type="button" 
                className="gov-mobile-toggle" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mainNav" 
                aria-label="Toggle Navigation Menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
              </button>

            </div>

          </div>
        </div>

        {/* Primary Navigation Bar (Thin Red Accent Line Below) */}
        <nav className={`gov-main-nav ${mobileMenuOpen ? 'open' : ''}`} id="mainNav" aria-label="Primary Navigation">
          <div className="gov-container">
            <ul className="gov-nav-list">
              <li className="gov-nav-item">
                <NavLink 
                  to="/" 
                  end 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `gov-nav-link ${isActive ? 'active' : ''}`}
                >
                  Immigration
                </NavLink>
              </li>
              <li className="gov-nav-item">
                <NavLink 
                  to="/services#visitor" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `gov-nav-link ${isActive ? 'active' : ''}`}
                >
                  Visit
                </NavLink>
              </li>
              <li className="gov-nav-item">
                <NavLink 
                  to="/services#study" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `gov-nav-link ${isActive ? 'active' : ''}`}
                >
                  Study
                </NavLink>
              </li>
              <li className="gov-nav-item">
                <NavLink 
                  to="/services#work" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `gov-nav-link ${isActive ? 'active' : ''}`}
                >
                  Work
                </NavLink>
              </li>
              <li className="gov-nav-item">
                <NavLink 
                  to="/services#pr" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `gov-nav-link ${isActive ? 'active' : ''}`}
                >
                  Permanent Residence
                </NavLink>
              </li>
              <li className="gov-nav-item">
                <NavLink 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`gov-nav-link ${isStatusFlow ? 'active' : ''}`}
                >
                  Application Status
                </NavLink>
              </li>
              <li className="gov-nav-item">
                <NavLink 
                  to="/help" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `gov-nav-link ${isActive ? 'active' : ''}`}
                >
                  Help
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
