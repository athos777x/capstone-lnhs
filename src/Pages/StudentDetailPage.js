// StudentDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../CssPage/StudentDetailPage.css'; // Import the new CSS file

function StudentDetailPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/students/${id}/details`)
      .then(response => {
        setStudent(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the student details!', error);
      });
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="student-detail-container">
      <h1 className="student-name-header">{student.name}</h1>
      <h2 className="student-detail-title">Student Details</h2>
      <table className="student-detail-table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{student.name}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{student.address}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{student.phone_number}</td>
          </tr>
          <tr>
            <th>Year</th>
            <td>{student.year}</td>
          </tr>
          <tr>
            <th>Grade</th>
            <td>Grade {student.grade_level}</td>
          </tr>
          <tr>
            <th>Section</th>
            <td>{student.section}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{student.status}</td>
          </tr>
        </tbody>
      </table>
      <h2 className="student-detail-title">Grades</h2>
      {student.grades.length > 0 ? (
        <table className="student-detail-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {student.grades.map((grade, index) => (
              <tr key={index}>
                <td>{grade.subject_name}</td>
                <td>{grade.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No grades available.</p>
      )}
    </div>
  );
}

export default StudentDetailPage;
