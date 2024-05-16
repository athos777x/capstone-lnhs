import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'; 
import './App.css';
import StudentDashboard from './RoleDashboard/StudentDashboard';
import PrincipalDashboard from './RoleDashboard/PrincipalDashboard';
import LoginForm from './Utilities/LoginForm'; 

// Credentials for different roles
const credentials = {
  principal: {
    username: 'admin',
    password: 'password'
  },
  student: {
    username: 'student',
    password: 'password'
  }
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password, navigate) => { // remove the navigate parameter
    if (username === credentials.principal.username && password === credentials.principal.password) {
      setIsAuthenticated(true);
      navigate('/principal-dashboard');
    } else if (username === credentials.student.username && password === credentials.student.password) {
      setIsAuthenticated(true);
      navigate('/student-dashboard');
    } else {
      // Handle incorrect credentials
      alert('Incorrect username or password');
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
