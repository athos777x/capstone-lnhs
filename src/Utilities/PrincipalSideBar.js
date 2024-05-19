// PrincipalSideBar.js
import React, { useState } from 'react';
import '../CssFiles/principaldashboard.css';
import HomeButton from '../Buttons/HomeButton';
import StudentsButton from '../Buttons/StudentsButton';
import GradesButton from '../Buttons/GradesButton';
import AttendanceButton from '../Buttons/AttendanceButton';
import EmployeeButton from '../Buttons/EmployeeButton';
import SchoolYearButton from '../Buttons/SchoolYearButton';
import EnrolledStudentsButton from '../Buttons/EnrolledStudentsButton';
import SectionButton from '../Buttons/SectionButton';
import SubjectsButton from '../Buttons/SubjectsButton';
import LogoutButton from '../Buttons/LogoutButton';
import GenerateReportsButton from '../Buttons/GenerateReportsButton';

function PrincipalSideBar({ showSidebar, toggleSidebar, handleLogout }) {
  const [showRecordsSubMenu, setShowRecordsSubMenu] = useState(false);
  const [showEnrollmentSubMenu, setShowEnrollmentSubMenu] = useState(false);

  const toggleRecordsSubMenu = () => {
    setShowRecordsSubMenu(!showRecordsSubMenu);
    setShowEnrollmentSubMenu(false); // Ensure only one submenu is open at a time
  };

  const toggleEnrollmentSubMenu = () => {
    setShowEnrollmentSubMenu(!showEnrollmentSubMenu);
    setShowRecordsSubMenu(false); // Ensure only one submenu is open at a time
  };

  return (
    <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
      <div className="buttons">
        <HomeButton />
        <StudentsButton />
        <div className={`menu-with-submenu ${showRecordsSubMenu ? 'active' : ''}`}>
          <button onClick={toggleRecordsSubMenu}>Student Academic Records</button>
          {showRecordsSubMenu && (
            <div className="submenu">
              <GradesButton />
              <AttendanceButton />
            </div>
          )}
        </div>
        <EmployeeButton />
        <div className={`menu-with-submenu ${showEnrollmentSubMenu ? 'active' : ''}`}>
          <button onClick={toggleEnrollmentSubMenu}>Enrollment</button>
          {showEnrollmentSubMenu && (
            <div className="submenu">
              <SchoolYearButton />
              <SectionButton />
              <EnrolledStudentsButton />
            </div>
          )}
        </div>
        <SubjectsButton />
        <GenerateReportsButton /> {/* Add Generate Reports Button here */}
        <LogoutButton onClick={handleLogout} />
      </div>
    </div>
  );
}

export default PrincipalSideBar;
