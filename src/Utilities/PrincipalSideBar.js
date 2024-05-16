// PrincipalSideBar.js

import React, { useState } from 'react';

import '../CssFiles/principaldashboard.css';

function PrincipalSidebar({ showSidebar, toggleSidebar, handleLogout, handleShowHome, handleShowStudents, handleShowGrades, handleShowAttendance, handleShowEmployee, handleShowEnrollment, handleShowSchoolYear, handleShowSection, handleShowEnrolledStudents, handleShowSubjects, handleShowGenerateReport }) {
  const [showRecordsSubMenu, setShowRecordsSubMenu] = useState(false);
  const [showEnrollmentSubMenu, setShowEnrollmentSubMenu] = useState(false);
  const [showReportSubMenu, setShowReportSubMenu] = useState(false);

  const toggleRecordsSubMenu = () => {
    setShowRecordsSubMenu(prevState => !prevState);
    setShowEnrollmentSubMenu(false);
    setShowReportSubMenu(false);
  };

  const toggleEnrollmentSubMenu = () => {
    setShowEnrollmentSubMenu(prevState => !prevState);
    setShowRecordsSubMenu(false);
    setShowReportSubMenu(false);
  };

  const toggleReportSubMenu = () => {
    setShowReportSubMenu(prevState => !prevState);
    setShowRecordsSubMenu(false);
    setShowEnrollmentSubMenu(false);
  };

  return (
    <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
      <div className="buttons">
        <button onClick={handleShowHome}>Home</button>
        <button onClick={handleShowStudents}>Students</button>
        <div className="menu-with-submenu">
          <button onClick={toggleRecordsSubMenu}>Student Academic Records</button>
          {showRecordsSubMenu && (
            <div className="submenu">
              <button onClick={handleShowGrades}>--Grades</button>
              <button onClick={handleShowAttendance}>--Attendance</button>
            </div>
          )}
        </div>
        <button onClick={handleShowEmployee}>Employee</button>
        <div className="menu-with-submenu">
          <button onClick={toggleEnrollmentSubMenu}>Enrollment</button>
          {showEnrollmentSubMenu && (
            <div className="submenu">
              <button onClick={handleShowSchoolYear}>--School Year</button>
              <button onClick={handleShowSection}>--Section</button>
              <button onClick={handleShowEnrolledStudents}>--Enrolled Students</button>
            </div>
          )}
        </div>
        <button onClick={handleShowSubjects}>Subjects</button>
        <div className="menu-with-submenu">
          <button onClick={toggleReportSubMenu}>Generate Report</button>
          {showReportSubMenu && (
            <div className="submenu">
              <button onClick={() => handleShowGenerateReport('enrollees')}>--List of student enrollees</button>
              <button onClick={() => handleShowGenerateReport('earlyEnrollment')}>--Early Enrollment Report</button>
              <button onClick={() => handleShowGenerateReport('summaryPromotion')}>--Summary Report on Promotion</button>
            </div>
          )}
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default PrincipalSidebar;
