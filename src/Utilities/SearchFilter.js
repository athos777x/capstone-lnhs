import React, { useState, useEffect } from 'react';
import '../CssFiles/searchfilter.css';
import axios from 'axios';

// Search and Filter Component
function SearchFilter({ handleSearch, handleFilter, handleApplyFilters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const [years, setYears] = useState([]);
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // Fetch years, grades, and sections from the server
    axios.get('http://localhost:3001/filters')
      .then(response => {
        console.log(response.data); // Verify the received data
        setYears(response.data.years);
        setGrades(response.data.grades);
        setSections(response.data.sections);
      })
      .catch(error => {
        console.error('There was an error fetching the filter options!', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleYearChange = (event) => {
    const value = event.target.value;
    setSelectedYear(value);
    handleFilter('year', value);
  };

  const handleGradeChange = (event) => {
    const value = event.target.value;
    setSelectedGrade(value);
    handleFilter('grade', value);
  };

  const handleSectionChange = (event) => {
    const value = event.target.value;
    setSelectedSection(value);
    handleFilter('section', value);
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setSelectedStatus(value);
    handleFilter('status', value);
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div>
        <label htmlFor="year">Year:</label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          <option value="">Select Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="grade">Grade:</label>
        <select id="grade" value={selectedGrade} onChange={handleGradeChange}>
          <option value="">Select Grade</option>
          {grades.map(grade => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="section">Section:</label>
        <select id="section" value={selectedSection} onChange={handleSectionChange}>
          <option value="">Select Section</option>
          {sections.map(section => (
            <option key={section} value={section}>{section}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select id="status" value={selectedStatus} onChange={handleStatusChange}>
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
}

export default SearchFilter;
