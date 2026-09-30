import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import ApplicationStatus from './pages/ApplicationStatus';
import Services from './pages/Services';
import Help from './pages/Help';
import Search from './pages/Search';

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/status" element={<Login />} />
        <Route path="/application-status" element={<ApplicationStatus />} />
        <Route path="/application-status/:id" element={<ApplicationStatus />} />
        <Route path="/services" element={<Services />} />
        <Route path="/help" element={<Help />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}

