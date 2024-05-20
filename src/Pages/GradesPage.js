// GradesPage.js
import React, { useState } from 'react';
import SearchFilter from '../Utilities/SearchFilter';

function GradesPage() {
  const [grades, setGrades] = useState([]); // Replace with actual grade data
  const [filteredGrades, setFilteredGrades] = useState(grades);

  const handleSearch = (searchTerm) => {
    const filtered = grades.filter(grade =>
      grade.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGrades(filtered);
  };

  const handleFilter = (type, value) => {
    let filtered = grades;

    if (type === 'year') {
      filtered = filtered.filter(grade => grade.year === value);
    } else if (type === 'grade') {
      filtered = filtered.filter(grade => grade.gradeLevel === value);
    } else if (type === 'section') {
      filtered = filtered.filter(grade => grade.section === value);
    }

    setFilteredGrades(filtered);
  };

  const handleApplyFilters = () => {
    // This can be used if additional logic is needed when applying filters
  };

  return (
    <div>
      <h1>Grades</h1>
      <SearchFilter
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        handleApplyFilters={handleApplyFilters}
      />
      <div>
        {filteredGrades.map(grade => (
          <div key={grade.id}>{grade.name}</div>
        ))}
      </div>
    </div>
  );
}

export default GradesPage;

