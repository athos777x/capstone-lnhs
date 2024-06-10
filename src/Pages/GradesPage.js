// GradesPage.js
import React, { useState, useEffect } from 'react';
import SearchFilter from '../Utilities/SearchFilter';
import axios from 'axios';
import '../CssPage/GradesPage.css'; // Ensure this import is correct

function GradesPage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [grades, setGrades] = useState([]);

  const [filters, setFilters] = useState({
    year: '',
    grade: '',
    section: '',
    searchTerm: ''
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
    if (selectedStudentId === studentId) {
      setSelectedStudentId(null);
      setGrades([]);
    } else {
      setSelectedStudentId(studentId);
      fetchStudentGrades(studentId);
    }
  };

  const fetchStudentGrades = (studentId) => {
    axios.get(`http://localhost:3001/students/${studentId}/grades`)
      .then(response => {
        setGrades(response.data);
        console.log('Fetched grades:', response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the grades!', error);
      });
  };

  return (
    <div className="grades-container">
      <h1 className="grades-title">Grades</h1>
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
              <div className="grades-details">
                <h2>Grades</h2>
                <ul>
                  {grades.map((grade, index) => (
                    <li key={index}>
                      <strong>{grade.subject_name}:</strong> {grade.grade}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GradesPage;
