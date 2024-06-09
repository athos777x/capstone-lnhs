//SearchFilter.js
import React, { useState, useEffect } from 'react';
import '../CssFiles/searchfilter.css';
import axios from 'axios';

// Search and Filter Component
function SearchFilter({ handleSearch, handleFilter, handleApplyFilters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

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
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    handleFilter('year', event.target.value);
  };

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
    handleFilter('grade', event.target.value);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
    handleFilter('section', event.target.value);
  };

  const handleApplyClick = () => {
    handleApplyFilters();
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
      <button onClick={handleApplyClick}>Apply Filters</button>
    </div>
  );
}

export default SearchFilter;

