// App.js
import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import StudentDashboard from './RoleDashboard/StudentDashboard';
import PrincipalDashboard from './RoleDashboard/PrincipalDashboard';
import LoginForm from './Utilities/LoginForm';
import Layout from './Utilities/Layout';
import ProfilePage from './Pages/ProfilePage';
import AcademicRecordPage from './Pages/AcademicRecordPage';
import EnrollmentPage from './Pages/EnrollmentPage';
import SectionPage from './Pages/SectionPage';
import HomePage from './Pages/HomePage';
import StudentsPage from './Pages/StudentsPage';
import GradesPage from './Pages/GradesPage';
import AttendancePage from './Pages/AttendancePage';
import EmployeePage from './Pages/EmployeePage';
import SchoolYearPage from './Pages/SchoolYearPage';
import EnrolledStudentsPage from './Pages/EnrolledStudentsPage';
import SubjectsPage from './Pages/SubjectsPage';
import GenerateReportsPage from './Pages/GenerateReportsPage'; // Import the Generate Reports page

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

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        {isAuthenticated && (
          <Route element={<Layout role={role} handleLogout={handleLogout} />}>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/principal-dashboard" element={<PrincipalDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/academic-record" element={<AcademicRecordPage />} />
            <Route path="/enrollment" element={<EnrollmentPage />} />
            <Route path="/section" element={<SectionPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/grades" element={<GradesPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/employee" element={<EmployeePage />} />
            <Route path="/school-year" element={<SchoolYearPage />} />
            <Route path="/enrolled-students" element={<EnrolledStudentsPage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/generate-reports" element={<GenerateReportsPage />} /> {/* Add route for Generate Reports */}
          </Route>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
