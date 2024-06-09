// PrincipalSideBar.js
import React, { useState } from 'react';
import '../CssFiles/principaldashboard.css';
import { useNavigate } from 'react-router-dom';
import HomeButton from '../Buttons/HomeButton';
import AttendanceButton from '../Buttons/AttendanceButton';
import EmployeeButton from '../Buttons/EmployeeButton';
import SchoolYearButton from '../Buttons/SchoolYearButton';
import EnrolledStudentsButton from '../Buttons/EnrolledStudentsButton';
import SectionButton from '../Buttons/SectionButton';
import SubjectsButton from '../Buttons/SubjectsButton';
import LogoutButton from '../Buttons/LogoutButton';
import ListofStudentEnrolleesButton from '../Buttons/ListofStudentEnrolleesButton';
import SummaryReportonPromotionButton from '../Buttons/SummaryReportonPromotionButton';
import EarlyEnrollmentReportButton from '../Buttons/EarlyEnrollmentReportButton';

function PrincipalSideBar({ showSidebar, toggleSidebar, handleLogout }) {
  const [showRecordsSubMenu, setShowRecordsSubMenu] = useState(false);
  const [showEnrollmentSubMenu, setShowEnrollmentSubMenu] = useState(false);
  const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);
  const navigate = useNavigate();

  const toggleRecordsSubMenu = () => {
    setShowRecordsSubMenu(!showRecordsSubMenu);
    setShowEnrollmentSubMenu(false);
    setShowReportsSubMenu(false);
  };

  const toggleEnrollmentSubMenu = () => {
    setShowEnrollmentSubMenu(!showEnrollmentSubMenu);
    setShowRecordsSubMenu(false);
    setShowReportsSubMenu(false);
  };

  const toggleReportsSubMenu = () => {
    setShowReportsSubMenu(!showReportsSubMenu);
    setShowRecordsSubMenu(false);
    setShowEnrollmentSubMenu(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
      <div className="buttons">
        <HomeButton />
        <button onClick={() => handleNavigate('/students')}>Students</button>
        <div className={`menu-with-submenu ${showRecordsSubMenu ? 'active' : ''}`}>
          <button onClick={toggleRecordsSubMenu}>Student Academic Records</button>
          {showRecordsSubMenu && (
            <div className="submenu">
              <button onClick={() => handleNavigate('/grades')}>--Grades</button>
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
        <div className={`menu-with-submenu ${showReportsSubMenu ? 'active' : ''}`}>
          <button onClick={toggleReportsSubMenu}>Generate Reports</button>
          {showReportsSubMenu && (
            <div className="submenu">
              <ListofStudentEnrolleesButton />
              <SummaryReportonPromotionButton />
              <EarlyEnrollmentReportButton />
            </div>
          )}
        </div>
        <LogoutButton onClick={handleLogout} />
      </div>
    </div>
  );
}

export default PrincipalSideBar;




