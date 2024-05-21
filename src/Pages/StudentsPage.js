// StudentsPage.js
import React, { useState, useEffect } from 'react';
import SearchFilter from '../Utilities/SearchFilter';
import axios from 'axios';
import '../CssPage/StudentsPage.css';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/students')
      .then(response => {
        const sortedStudents = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setStudents(sortedStudents);
        setFilteredStudents(sortedStudents);
      })
      .catch(error => {
        console.error('There was an error fetching the students!', error);
      });
  }, []);

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

  const handleStudentClick = (studentId) => {
    setSelectedStudentId(selectedStudentId === studentId ? null : studentId);
  };

  return (
    <div className="students-container">
      <h1 className="students-title">Students</h1>
      <div className="search-filter-container">
        <SearchFilter
          handleSearch={handleSearch}
          handleFilter={handleFilter}
          handleApplyFilters={handleApplyFilters}
        />
      </div>
      <div>
        {filteredStudents.map((student, index) => (
          <div key={student.id} className="student-item" onClick={() => handleStudentClick(student.id)}>
            <p>{index + 1}. {student.name}</p>
            {selectedStudentId === student.id && (
              <div className="student-details">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Address:</strong> {student.address}</p>
                <p><strong>Phone Number:</strong> {student.phone_number}</p>
                <p><strong>Year:</strong> {student.year}</p>
                <p><strong>Grade:</strong> {student.grade}</p>
                <p><strong>Section:</strong> {student.section}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsPage;