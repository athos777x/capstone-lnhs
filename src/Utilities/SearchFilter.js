//SearchFilter.js

import React, { useState } from 'react';
import '../CssFiles/searchfilter.css';

// Search and Filter Component
function SearchFilter({ handleSearch, handleFilter, handleApplyFilters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Call the handleSearch function to pass the search term
    handleSearch(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    // Call the handleFilter function to pass the selected year
    handleFilter('year', event.target.value);
  };

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
    // Call the handleFilter function to pass the selected grade
    handleFilter('grade', event.target.value);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
    // Call the handleFilter function to pass the selected section
    handleFilter('section', event.target.value);
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {/* Year Filter */}
      <div>
        <label htmlFor="year">Year:</label>
        <select id="year" value={selectedYear} onChange={handleYearChange}>
          <option value="">Select Year</option>
          {/* Options for selecting year */}
        </select>
      </div>
      {/* Grade Filter */}
      <div>
        <label htmlFor="grade">Grade:</label>
        <select id="grade" value={selectedGrade} onChange={handleGradeChange}>
          <option value="">Select Grade</option>
          {/* Options for selecting grade */}
        </select>
      </div>
      {/* Section Filter */}
      <div>
        <label htmlFor="section">Section:</label>
        <select id="section" value={selectedSection} onChange={handleSectionChange}>
          <option value="">Select Section</option>
          {/* Options for selecting section */}
        </select>
      </div>
      {/* Apply Filters Button */}
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
}

export default SearchFilter;
