// PrincipalDashboard.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CssFiles/principaldashboard.css';
import '../CssFiles/headbar.css';
import HeaderBar from '../Utilities/HeadBar';
import SearchFilter from '../Utilities/SearchFilter';
import PrincipalSideBar from '../Utilities/PrincipalSideBar'; // Correct import

function PrincipalDashboard() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [showGradesSearch, setShowGradesSearch] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showEmployee, setShowEmployee] = useState(false);
  const [showEnrollmentButtons, setShowEnrollmentButtons] = useState(false);
  const [showSchoolYearOptions, setShowSchoolYearOptions] = useState(false);
  const [showAddNewSchoolYearForm, setShowAddNewSchoolYearForm] = useState(false);
  const [showSectionFilters, setShowSectionFilters] = useState(false);
  const [showSchoolYearFilter, setShowSchoolYearFilter] = useState(false);
  const [showGradeLevelFilter, setShowGradeLevelFilter] = useState(false);
  const [showEnrolledStudents, setShowEnrolledStudents] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false); // New state
  const [schoolYearFormData, setSchoolYearFormData] = useState({
    startYear: '',
    endYear: '',
  });
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleShowStudents = () => {
    setShowInfo(false);
    setShowStudents(true);
    setShowGradesSearch(false);
    setShowAttendance(false);
    setShowEmployee(false);
    setShowEnrollmentButtons(false);
    setShowSchoolYearOptions(false);
    setShowAddNewSchoolYearForm(false);
    setShowSectionFilters(false);
    setShowEnrolledStudents(false);
    setShowSubjects(false); // Reset other sections
  };

  const handleShowGrades = () => {
    setShowInfo(false);
    setShowStudents(false);
    setShowGradesSearch(true);
    setShowAttendance(false);
    setShowEmployee(false);
    setShowEnrollmentButtons(false);
    setShowSchoolYearOptions(false);
    setShowAddNewSchoolYearForm(false);
    setShowSectionFilters(false);
    setShowEnrolledStudents(false);
    setShowSubjects(false); // Reset other sections
  };

  const handleShowAttendance = () => {
    setShowInfo(false);
    setShowStudents(false);
    setShowGradesSearch(false);
    setShowAttendance(true);
    setShowEmployee(false);
    setShowEnrollmentButtons(false);
    setShowSchoolYearOptions(false);
    setShowAddNewSchoolYearForm(false);
    setShowSectionFilters(false);
    setShowEnrolledStudents(false);
    setShowSubjects(false); // Reset other sections
  };

  const handleShowEmployee = () => {
    setShowInfo(false);
    setShowStudents(false);
    setShowGradesSearch(false);
    setShowAttendance(false);
    setShowEmployee(true);
    setShowEnrollmentButtons(false);
    setShowSchoolYearOptions(false);
    setShowAddNewSchoolYearForm(false);
    setShowSectionFilters(false);
    setShowEnrolledStudents(false);
    setShowSubjects(false); // Reset other sections
  };

  const handleShowHome = () => {
    setShowStudents(false);
    setShowGradesSearch(false);
    setShowAttendance(false);
    setShowEmployee(false);
    setShowInfo(true);
    setShowEnrollmentButtons(false);
    setShowSchoolYearOptions(false);
    setShowAddNewSchoolYearForm(false);
    setShowSectionFilters(false);
    setShowEnrolledStudents(false);
    setShowSubjects(false); // Reset other sections
  };

  const handleShowEnrollment = () => {
    setShowEnrollmentButtons(true);
    setShowInfo(false);
    setShowStudents(false);
    setShowGradesSearch(false);
    setShowAttendance(false);
    setShowEmployee(false);
    setShowSchoolYearOptions(false);
    setShowAddNewSchoolYearForm(false);
    setShowSectionFilters(false);
    setShowEnrolledStudents(false);
    setShowSubjects(false); // Reset other sections
  };

  const handleShowSchoolYear = () => {
    setShowSchoolYearOptions(true);
    setShowInfo(false);
    setShowStudents(false);
    setShowGradesSearch(false);
    setShowAttendance(false);
    setShowEmployee(false);
    setShowEnrollmentButtons(false);
    setShowAddNewSchoolYearForm(false);
    setShowSectionFilters(false);
    setShowEnrolledStudents(false);
    setShowSubjects(false); // Reset other sections
  };

  const handleShowAddNewSchoolYearForm = () => {
    setShowAddNewSchoolYearForm(true);
    setShowInfo(false);
    setShowStudents(false);
    setShowGradesSearch(false);
    setShowAttendance(false);
    setShowEmployee(false);
    setShowEnrollmentButtons(false);
    setShowSchoolYearOptions(false);
    setShowSectionFilters(false);
    setShowEnrolledStudents(false);
    setShowSubjects(false); // Reset other sections
  };

  const handleSaveSchoolYear = () => {
    console.log('Save school year:', schoolYearFormData);
    setShowAddNewSchoolYearForm(false);
    setSchoolYearFormData({
      startYear: '',
      endYear: '',
    });
  };

  const handleCancelAddNewSchoolYear = () => {
    setShowAddNewSchoolYearForm(false);
    setSchoolYearFormData({
      startYear: '',
      endYear: '',
    });
  };

  const handleSearch = (searchQuery) => {
    console.log('Searching for:', searchQuery);
  };

  const handleFilter = (filterType, filterValue) => {
    console.log('Filtering:', filterType, 'with value:', filterValue);
  };

  const handleAddEmployee = () => {
    console.log('Add employee functionality goes here');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSchoolYearFormData({
      ...schoolYearFormData,
      [name]: value,
    });
  };

  const handleShowSection = () => {
    setShowSectionFilters(true);
    setShowInfo(false);
    setShowStudents(false);
    setShowGradesSearch(false);
    setShowAttendance(false);
    setShowEmployee(false);
    setShowEnrollmentButtons(false);
    setShowSchoolYearOptions(false);
    setShowAddNewSchoolYearForm(false);
    setShowEnrolledStudents(false);
    setShowSubjects(false); // Reset other sections
  };

  const handleCloseSectionFilters = () => {
    setShowSectionFilters(false);
    setShowSchoolYearFilter(false);
    setShowGradeLevelFilter(false);
  };

  const handleApplySectionFilters = () => {
    console.log('Apply section filters');
  };

  const handleShowEnrolledStudents = () => {
    setShowEnrolledStudents(true);
    setShowInfo(false);
    setShowStudents(false);
    setShowGradesSearch(false);
    setShowAttendance(false);
    setShowEmployee(false);
    setShowEnrollmentButtons(false);
    setShowSchoolYearOptions(false);
    setShowAddNewSchoolYearForm(false);
    setShowSectionFilters(false);
    setShowSubjects(false); // Reset other sections
  };

  const handleShowSubjects = () => { // New handler
    setShowSubjects(true);
    setShowInfo(false);
    setShowStudents(false);
    setShowGradesSearch(false);
    setShowAttendance(false);
    setShowEmployee(false);
    setShowEnrollmentButtons(false);
    setShowSchoolYearOptions(false);
    setShowAddNewSchoolYearForm(false);
    setShowSectionFilters(false);
    setShowEnrolledStudents(false); // Reset other sections
  };
  return (
    <div>
      <HeaderBar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <PrincipalSideBar
        showSidebar={showSidebar}
        toggleSidebar={toggleSidebar}
        setShowInfo={setShowInfo}
        handleLogout={handleLogout}
        handleShowStudents={handleShowStudents}
        handleShowHome={handleShowHome}
        handleShowGrades={handleShowGrades}
        handleShowAttendance={handleShowAttendance}
        handleShowEmployee={handleShowEmployee}
        handleShowEnrollment={handleShowEnrollment}
        handleShowSchoolYear={handleShowSchoolYear}
        handleShowSection={handleShowSection}
        handleShowEnrolledStudents={handleShowEnrolledStudents}
        handleShowSubjects={handleShowSubjects} // Pass the new handler
      />
      <div className={`content ${showSidebar ? 'content-shift' : ''}`}>
        {showInfo && (
          <div>
            <h1>Welcome, Principal!</h1>
            <h2>Dashboard</h2>
          </div>
        )}
        {showStudents && (
          <div>
            <h1>Search Student</h1>
            <SearchFilter handleSearch={handleSearch} handleFilter={handleFilter} />
          </div>
        )}
        {showGradesSearch && (
          <div>
            <h1>Grades - Search Student</h1>
            <SearchFilter handleSearch={handleSearch} handleFilter={handleFilter} showSchoolYearFilter={true} showGradeLevelFilter={true} showSectionFilter={true} />
          </div>
        )}
        {showAttendance && (
          <div>
            <h1>Attendance - Search Student</h1>
            <SearchFilter handleSearch={handleSearch} handleFilter={handleFilter} showGradeLevelFilter={true} showSectionFilter={true} />
          </div>
        )}
        {showEmployee && (
          <div>
            <h1>Employee Management</h1>
            <SearchFilter handleSearch={handleSearch} handleFilter={handleFilter} showSchoolYearFilter={true} showRoleFilter={true} />
            <button onClick={handleAddEmployee}>Add Employee</button>
          </div>
        )}
        {showEnrollmentButtons && (
          <div>
            <button onClick={handleShowSchoolYear}>School Year</button>
            <button onClick={handleShowSection}>Section</button>
            <button onClick={handleShowEnrolledStudents}>Enrolled Students</button>
          </div>
        )}
        {showSchoolYearOptions && (
          <div>
            <button onClick={handleShowAddNewSchoolYearForm}>Add New School Year</button>
            <select>
              <option>2021-2022</option>
              <option>2022-2023</option>
              <option>2023-2024</option>
            </select>
            <button>Edit</button>
          </div>
        )}
        {showAddNewSchoolYearForm && (
          <div>
            <h2>Add New School Year</h2>
            <label htmlFor="startYear">Start Year:</label>
            <input type="text" id="startYear" name="startYear" value={schoolYearFormData.startYear} onChange={handleInputChange} />
            <label htmlFor="endYear">End Year:</label>
            <input type="text" id="endYear" name="endYear" value={schoolYearFormData.endYear} onChange={handleInputChange} />
            <button onClick={handleSaveSchoolYear}>Save</button>
            <button onClick={handleCancelAddNewSchoolYear}>Cancel</button>
          </div>
        )}
        {showSectionFilters && (
          <div>
            <h1>Section - Search Section</h1>
            <SearchFilter
              handleSearch={handleSearch}
              handleFilter={handleFilter}
              handleApplyFilters={handleApplySectionFilters}
              showSchoolYearFilter={showSchoolYearFilter}
              showGradeLevelFilter={showGradeLevelFilter}
              showSectionFilter={true}
            />
            <button onClick={handleCloseSectionFilters}>Close</button>
          </div>
        )}
        {showEnrolledStudents && (
          <div>
            <h1>Enrolled Students</h1>
            <SearchFilter handleSearch={handleSearch} handleFilter={handleFilter} showGradeLevelFilter={true} />
          </div>
        )}
        {showSubjects && ( // Add new section for subjects
          <div>
            <h1>Subjects</h1>
            <button>Add Subject</button>
            <SearchFilter handleSearch={handleSearch} handleFilter={handleFilter} showSchoolYearFilter={true} showGradeLevelFilter={true} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PrincipalDashboard;
