// StudentsPage.js
import React, { useState, useEffect } from 'react';
import SearchFilter from '../Utilities/SearchFilter';
import axios from 'axios';
import '../CssPage/StudentsPage.css'; // Ensure this import is correct

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    year: '',
    grade: '',
    section: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3001/students')
      .then(response => {
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
      <div className="students-list">
        {filteredStudents.map((student, index) => (
          <div key={student.student_id}>
            <div className="student-item" onClick={() => handleStudentClick(student.student_id)}>
              <p>{index + 1}. {student.name}</p>
            </div>
            {selectedStudentId === student.student_id && (
              <div className="student-details">
                <table>
                  <tbody>
                    <tr>
                      <td><strong>Address:</strong></td>
                      <td>{student.address}</td>
                    </tr>
                    <tr>
                      <td><strong>Phone Number:</strong></td>
                      <td>{student.phone_number}</td>
                    </tr>
                    <tr>
                      <td><strong>Year:</strong></td>
                      <td>{student.year}</td>
                    </tr>
                    <tr>
                      <td><strong>Grade:</strong></td>
                      <td>{student.grade_level}</td>
                    </tr>
                    <tr>
                      <td><strong>Section:</strong></td>
                      <td>{student.section}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentsPage;
