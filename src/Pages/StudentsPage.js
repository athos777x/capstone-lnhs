// StudentsPage.js
import React, { useState, useEffect } from 'react';
import SearchFilter from '../Utilities/SearchFilter';
import axios from 'axios';
import '../CssPage/StudentsPage.css';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const [filters, setFilters] = useState({
    year: '',
    grade: '',
    section: '',
    searchTerm: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3001/students')
      .then(response => {
        console.log('API response:', response.data);
        const sortedStudents = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setStudents(sortedStudents);
        setFilteredStudents(sortedStudents);
        console.log('Fetched students:', sortedStudents);
      })
      .catch(error => {
        console.error('There was an error fetching the students!', error);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    setFilters(prevFilters => ({ ...prevFilters, searchTerm }));
  };

  const handleFilterChange = (type, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [type]: value }));
  };

  const handleApplyFilters = () => {
    let filtered = students;

    if (filters.year) {
      filtered = filtered.filter(student => String(student.year) === filters.year);
    }
    if (filters.grade) {
      filtered = filtered.filter(student => student.grade_level === filters.grade);
    }
    if (filters.section) {
      filtered = filtered.filter(student => student.section === filters.section);
    }
    if (filters.searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
    console.log('Filtered students:', filtered);
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
          handleFilter={handleFilterChange}
          handleApplyFilters={handleApplyFilters}
        />
      </div>
      <div>
        {filteredStudents.map((student, index) => (
          <div key={student.student_id} className="student-item" onClick={() => handleStudentClick(student.student_id)}>
            <p>{index + 1}. {student.name}</p>
            {selectedStudentId === student.student_id && (
              <div className="student-details">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Address:</strong> {student.address}</p>
                <p><strong>Phone Number:</strong> {student.phone_number}</p>
                <p><strong>Year:</strong> {student.year}</p>
                <p><strong>Grade:</strong> {student.grade_level}</p>
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
