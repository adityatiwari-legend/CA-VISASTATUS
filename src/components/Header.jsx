import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Exact Header matching Reference Design:
 * - Slim top demo disclaimer bar with red pill badge and "Learn more →"
 * - Canadian Red Maple Leaf icon + "Visa Status Portal" + "Immigration Application Services"
 * - User login indicator & Sign in / Sign out control
 * - Language link + Search input [Search the portal... 🔍]
 * - Primary Navigation with dropdown indicators and active red bottom border
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

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
    alert("Démonstration en français : Ce portail statique est un prototype d'évaluation technique. Les 10 dossiers fictifs sont consultables en version anglaise.");
  };

  return (
    <>
      {/* Main Header Top Bar */}

      {/* 2. Main Header Top Bar */}
      <header className="ca-header" role="banner">
        <div className="ca-container">
          <div className="ca-header-top">
            
            {/* Logo: Stylized Red Maple Leaf + Title & Subtitle */}
            <Link to="/" className="ca-brand" aria-label="Visa Status Portal Home">
              <svg 
                className="ca-maple-icon" 
                viewBox="0 0 512 512" 
                fill="#D52B1E" 
                width="36" 
                height="36" 
                style={{ width: '36px', height: '36px', minWidth: '36px', flexShrink: 0, display: 'inline-block' }}
                aria-hidden="true"
              >
                <path d="M495.8 286.7l-41.2-14.7 18.2-56.9c2.4-7.4-3.1-15-11-15-1.9 0-3.9.5-5.6 1.4L372.5 244l13.6-70.2c1.7-8.6-4.5-16.7-13.2-17.2-2.1-.1-4.2.3-6.2 1.3L309 187.3 322 71.9c1-8.9-5.6-16.8-14.5-17.4-2.5-.2-5 .4-7.2 1.6l-44.3 25.3-44.3-25.3c-2.2-1.2-4.7-1.8-7.2-1.6-8.9.6-15.5 8.5-14.5 17.4l13 115.4-57.7-29.4c-2-1-4.1-1.4-6.2-1.3-8.7.5-14.9 8.6-13.2 17.2l13.6 70.2-83.7-42.5c-1.7-.9-3.7-1.4-5.6-1.4-7.9 0-13.4 7.6-11 15l18.2 56.9-41.2 14.7c-7.9 2.8-11.4 11.5-7.7 18.9 1 2 2.6 3.7 4.5 4.9l80.2 50.8-21.8 41.7c-4.1 7.8-1.1 17.5 6.7 21.6 2.3 1.2 4.9 1.8 7.5 1.7l86.9-3.7-10 65.5h37.4l-10-65.5 86.9 3.7c2.6.1 5.2-.5 7.5-1.7 7.8-4.1 10.8-13.8 6.7-21.6l-21.8-41.7 80.2-50.8c1.9-1.2 3.5-2.9 4.5-4.9 3.7-7.4.2-16.1-7.7-18.9z"/>
              </svg>
              <div className="ca-brand-titles">
                <span className="ca-brand-main">Visa Status Portal</span>
                <span className="ca-brand-sub">Immigration Application Services</span>
              </div>
            </Link>

            {/* Header Right: Language & Auth & Search */}
            <div className="ca-header-right">
              
              {/* User Authentication Status */}
              {isLoggedIn && user ? (
                <div className="ca-header-user-status" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span 
                    className="ca-user-pill" 
                    title={`Active Account: ${user.email}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#1E3A8A',
                      background: '#EFF6FF',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      border: '1px solid #BFDBFE'
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="#2563EB" aria-hidden="true">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span>{user.name}</span>
                  </span>
                  <button 
                    type="button" 
                    onClick={logout} 
                    className="ca-logout-btn"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#D52B1E',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      padding: '2px 4px',
                      textDecoration: 'underline'
                    }}
                    title="Sign out of current account"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="ca-signin-nav-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#005EA8',
                    textDecoration: 'none',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid #CBD5E1',
                    background: '#F8FAFC'
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
                  </svg>
                  Sign in
                </Link>
              )}

              <a href="#" className="ca-lang-link" onClick={handleLanguageClick} lang="fr">
                Français
              </a>

              {/* Search Control matching the reference */}
              <form className="ca-search-form" onSubmit={handleSearchSubmit} role="search">
                <div className="ca-search-wrapper">
                  <input 
                    type="search" 
                    className="ca-search-input" 
                    placeholder="Search the portal..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required 
                    autoComplete="off"
                    aria-label="Search the portal"
                  />
                  <button type="submit" className="ca-search-btn" aria-label="Submit search">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#4B5563" style={{ width: '16px', height: '16px', display: 'block' }} aria-hidden="true">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 14z"/>
                    </svg>
                  </button>
                </div>
              </form>

              {/* Mobile Menu Toggle */}
              <button 
                type="button" 
                className="ca-mobile-toggle" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Navigation"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>

            </div>

          </div>
        </div>

        {/* 3. Navigation Bar */}
        <nav className={`ca-nav ${mobileMenuOpen ? 'open' : ''}`} aria-label="Primary Navigation">
          <div className="ca-container">
            <ul className="ca-nav-list">
              <li className="ca-nav-item">
                <NavLink 
                  to="/" 
                  end 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `ca-nav-link ${isActive ? 'active' : ''}`}
                >
                  <span>Immigration</span>
                  <span className="ca-dropdown-caret" aria-hidden="true">&#x25BE;</span>
                </NavLink>
              </li>
              <li className="ca-nav-item">
                <NavLink 
                  to="/services#visitor" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `ca-nav-link ${isActive ? 'active' : ''}`}
                >
                  Visit
                </NavLink>
              </li>
              <li className="ca-nav-item">
                <NavLink 
                  to="/services#study" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `ca-nav-link ${isActive ? 'active' : ''}`}
                >
                  Study
                </NavLink>
              </li>
              <li className="ca-nav-item">
                <NavLink 
                  to="/services#work" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `ca-nav-link ${isActive ? 'active' : ''}`}
                >
                  Work
                </NavLink>
              </li>
              <li className="ca-nav-item">
                <NavLink 
                  to="/services#pr" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `ca-nav-link ${isActive ? 'active' : ''}`}
                >
                  Permanent Residence
                </NavLink>
              </li>
              <li className="ca-nav-item">
                <NavLink 
                  to="/status" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`ca-nav-link ${isStatusFlow ? 'active' : ''}`}
                >
                  <span>Fetch Visa Status</span>
                  <span className="ca-dropdown-caret" aria-hidden="true">&#x25BE;</span>
                </NavLink>
              </li>
              <li className="ca-nav-item">
                <NavLink 
                  to="/help" 
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `ca-nav-link ${isActive ? 'active' : ''}`}
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
