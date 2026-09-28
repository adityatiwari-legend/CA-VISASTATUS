import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';

import Home from './pages/Home';
import Login from './pages/Login';
import ApplicationStatus from './pages/ApplicationStatus';
import Services from './pages/Services';
import Help from './pages/Help';
import Search from './pages/Search';

export default function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedDemoRecord, setSelectedDemoRecord] = useState(null);
  const navigate = useNavigate();

  const handleSelectRecord = (record) => {
    setSelectedDemoRecord(record);
    // Navigate to Login page prefilled or directly to ApplicationStatus
    navigate('/login');
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <Header />

      <Routes>
        <Route path="/" element={<Home onOpenDemoModal={() => setDemoModalOpen(true)} />} />
        <Route 
          path="/login" 
          element={
            <Login 
              onOpenDemoModal={() => setDemoModalOpen(true)} 
              prefilledRecord={selectedDemoRecord} 
            />
          } 
        />
        <Route 
          path="/status" 
          element={
            <Login 
              onOpenDemoModal={() => setDemoModalOpen(true)} 
              prefilledRecord={selectedDemoRecord} 
            />
          } 
        />
        <Route path="/application-status" element={<ApplicationStatus />} />
        <Route path="/application-status/:id" element={<ApplicationStatus />} />
        <Route path="/services" element={<Services onOpenDemoModal={() => setDemoModalOpen(true)} />} />
        <Route path="/help" element={<Help onOpenDemoModal={() => setDemoModalOpen(true)} />} />
        <Route path="/search" element={<Search onOpenDemoModal={() => setDemoModalOpen(true)} />} />
        <Route path="*" element={<Home onOpenDemoModal={() => setDemoModalOpen(true)} />} />
      </Routes>

      <Footer onOpenDemoModal={() => setDemoModalOpen(true)} />

      <DemoModal 
        isOpen={demoModalOpen} 
        onClose={() => setDemoModalOpen(false)} 
        onSelectRecord={handleSelectRecord}
      />
    </>
  );
}
