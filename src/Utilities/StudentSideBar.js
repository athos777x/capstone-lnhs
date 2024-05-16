// StudentSideBar.js

import React from 'react';
import '../CssFiles/studentdashboard.css';

function StudentSideBar({ showSidebar, toggleSidebar, handleLogout, handleShowProfile, handleShowAcademicRecord, handleShowEnrollment, handleShowSection }) {
  return (
    <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
      <div className="buttons">
        <button onClick={handleShowProfile}>My Profile</button>
        <button onClick={handleShowAcademicRecord}>Student Academic Record</button>
        <button onClick={handleShowEnrollment}>Enrollment</button>
        <button onClick={handleShowSection}>Section</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default StudentSideBar;
