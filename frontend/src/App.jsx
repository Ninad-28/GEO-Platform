import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectSetup from './pages/ProjectSetup';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
          <h1 className="text-xl font-bold text-indigo-600">GEO Platform</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ProjectSetup />} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;