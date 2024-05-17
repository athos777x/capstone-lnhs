// type
// cd backend
// node server.js
// in terminal to start server

import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'; 
import './App.css';
import StudentDashboard from './RoleDashboard/StudentDashboard';
import PrincipalDashboard from './RoleDashboard/PrincipalDashboard';
import LoginForm from './Utilities/LoginForm'; 

// Credentials for different roles

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  const handleLogin = (username, password, navigate, userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
    if (userRole === 'principal') {
      navigate('/principal-dashboard');
    } else if (userRole === 'student') {
      navigate('/student-dashboard');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/student-dashboard" element={<StudentDashboard setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/principal-dashboard" element={<PrincipalDashboard setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

