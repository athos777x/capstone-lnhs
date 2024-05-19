// StudentSideBar.js
import React from 'react';
import '../CssFiles/studentdashboard.css';
import ProfileButton from '../Buttons/ProfileButton';
import AcademicRecordButton from '../Buttons/AcademicRecordButton';
import EnrollmentButton from '../Buttons/EnrollmentButton';
import SectionButton from '../Buttons/SectionButton';

function StudentSideBar({ showSidebar, toggleSidebar, handleLogout }) {
  return (
    <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
      <div className="buttons">
        <ProfileButton />
        <AcademicRecordButton />
        <EnrollmentButton />
        <SectionButton />
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default StudentSideBar;
