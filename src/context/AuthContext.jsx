import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'ca_visa_user_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const isLoggedIn = !!user;

  // Sync state if localStorage changes in another tab
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          setUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  /**
   * Dummy login function that accepts ANY details:
   * username/email, password, etc.
   */
  const login = (credentials = {}) => {
    const rawIdentifier = (credentials.username || credentials.email || '').trim();
    
    // Construct friendly display name
    let displayName = 'Applicant User';
    if (rawIdentifier) {
      if (rawIdentifier.includes('@')) {
        const local = rawIdentifier.split('@')[0];
        displayName = local
          .split(/[\._\-]/)
          .filter(Boolean)
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ');
      } else {
        displayName = rawIdentifier
          .split(/[\._\-]/)
          .filter(Boolean)
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(' ');
      }
    } else {
      displayName = 'Applicant';
    }

    const userData = {
      name: displayName || 'Applicant',
      username: rawIdentifier || 'applicant',
      email: rawIdentifier.includes('@') ? rawIdentifier : `${(rawIdentifier || 'applicant').toLowerCase()}@example.com`,
      preferredTrackingId: credentials.trackingId || '',
      dateOfBirth: credentials.dateOfBirth || '',
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sessionId: `SESSION-CA-${Math.floor(100000 + Math.random() * 900000)}`,
      isLoggedIn: true
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } catch (e) {
      console.warn('Unable to persist session to localStorage', e);
    }

    setUser(userData);
    return userData;
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
