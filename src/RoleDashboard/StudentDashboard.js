// StudentDashboard.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CssFiles/studentdashboard.css';
import '../CssFiles/headbar.css';
import HeaderBar from '../Utilities/HeadBar';
import StudentSideBar from '../Utilities/StudentSideBar';

function StudentDashboard() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showAcademicRecord, setShowAcademicRecord] = useState(false);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleShowProfile = () => {
    setShowProfile(true);
    setShowAcademicRecord(false);
    setShowEnrollment(false);
    setShowSection(false);
  };

  const handleShowAcademicRecord = () => {
    setShowProfile(false);
    setShowAcademicRecord(true);
    setShowEnrollment(false);
    setShowSection(false);
  };

  const handleShowEnrollment = () => {
    setShowProfile(false);
    setShowAcademicRecord(false);
    setShowEnrollment(true);
    setShowSection(false);
  };

  const handleShowSection = () => {
    setShowProfile(false);
    setShowAcademicRecord(false);
    setShowEnrollment(false);
    setShowSection(true);
  };

  return (
    <div>
      <HeaderBar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <StudentSideBar
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
        handleShowProfile={handleShowProfile}
        handleShowAcademicRecord={handleShowAcademicRecord}
        handleShowEnrollment={handleShowEnrollment}
        handleShowSection={handleShowSection}
      />
      <div className={`content ${showSidebar ? 'content-shift' : ''}`}>
        {showProfile && (
          <div>
            <h1>My Profile</h1>
            {/* Add the content and functionality for the profile here */}
          </div>
        )}
        {showAcademicRecord && (
          <div>
            <h1>Student Academic Record</h1>
            {/* Add the content and functionality for academic record here */}
          </div>
        )}
        {showEnrollment && (
          <div>
            <h1>Enrollment</h1>
            {/* Add the content and functionality for enrollment here */}
          </div>
        )}
        {showSection && (
          <div>
            <h1>Section</h1>
            {/* Add the content and functionality for section here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
