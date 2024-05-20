// StudentsPage.js
import React, { useState } from 'react';
import SearchFilter from '../Utilities/SearchFilter';

function StudentsPage() {
  const [students, setStudents] = useState([]); // Replace with actual student data
  const [filteredStudents, setFilteredStudents] = useState(students);

  const handleSearch = (searchTerm) => {
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  const handleFilter = (type, value) => {
    let filtered = students;

    if (type === 'year') {
      filtered = filtered.filter(student => student.year === value);
    } else if (type === 'grade') {
      filtered = filtered.filter(student => student.grade === value);
    } else if (type === 'section') {
      filtered = filtered.filter(student => student.section === value);
    }

    setFilteredStudents(filtered);
  };

  const handleApplyFilters = () => {
    // This can be used if additional logic is needed when applying filters
  };

  return (
    <div>
      <h1>Students</h1>
      <SearchFilter
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        handleApplyFilters={handleApplyFilters}
      />
      <div>
        {filteredStudents.map(student => (
          <div key={student.id}>{student.name}</div>
        ))}
      </div>
    </div>
  );
}

export default StudentsPage;

