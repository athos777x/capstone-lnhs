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
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters, searchTerm };
      applyFilters(updatedFilters);
      return updatedFilters;
    });
  };

  const handleFilterChange = (type, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters, [type]: value };
      return updatedFilters;
    });
  };

  const applyFilters = (updatedFilters) => {
    let filtered = students;

    if (updatedFilters.year) {
      filtered = filtered.filter(student => String(student.year) === updatedFilters.year);
    }
    if (updatedFilters.grade) {
      filtered = filtered.filter(student => student.grade_level === updatedFilters.grade);
    }
    if (updatedFilters.section) {
      filtered = filtered.filter(student => student.section === updatedFilters.section);
    }
    if (updatedFilters.searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(updatedFilters.searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
    console.log('Filtered students:', filtered);
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
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
