const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'root', // Your MySQL password
  database: 'school_portal'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ authenticated: true, role: results[0].role });
    } else {
      res.json({ authenticated: false });
    }
  });
});

// Endpoint to fetch all students
app.get('/students', (req, res) => {
  const query = 'SELECT * FROM students';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint to fetch filter options
app.get('/filters', (req, res) => {
  const yearsQuery = 'SELECT DISTINCT year FROM students';
  const gradesQuery = 'SELECT DISTINCT grade_level FROM students';
  const sectionsQuery = 'SELECT DISTINCT section FROM students';

  const yearsPromise = new Promise((resolve, reject) => {
    db.query(yearsQuery, (err, results) => {
      if (err) reject(err);
      resolve(results.map(row => row.year));
    });
  });

  const gradesPromise = new Promise((resolve, reject) => {
    db.query(gradesQuery, (err, results) => {
      if (err) reject(err);
      resolve(results.map(row => row.grade_level));
    });
  });

  const sectionsPromise = new Promise((resolve, reject) => {
    db.query(sectionsQuery, (err, results) => {
      if (err) reject(err);
      resolve(results.map(row => row.section));
    });
  });

  Promise.all([yearsPromise, gradesPromise, sectionsPromise])
    .then(([years, grades, sections]) => {
      res.json({ years, grades, sections });
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to fetch filter options' });
    });
});

// Endpoint to fetch grades for a specific student
app.get('/students/:id/grades', (req, res) => {
  const studentId = req.params.id;
  const query = `
    SELECT ss.grade, s.subject_name 
    FROM student_subject_grades ss
    JOIN subjects s ON ss.subject_id = s.subject_id
    WHERE ss.student_id = ?
  `;
  db.query(query, [studentId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint to fetch details of a specific student
app.get('/students/:id', (req, res) => {
  const studentId = req.params.id;
  const query = 'SELECT * FROM students WHERE student_id = ?';
  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error('There was an error fetching the student details!', err);
      res.status(500).json({ error: 'Failed to fetch student details' });
      return;
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  });
});

// Endpoint to fetch all details of a specific student including grades
app.get('/students/:id/details', (req, res) => {
  const studentId = req.params.id;

  // Query to get student information
  const studentQuery = 'SELECT * FROM students WHERE student_id = ?';
  
  // Query to get student's grades
  const gradesQuery = `
    SELECT ss.grade, s.subject_name 
    FROM student_subject_grades ss
    JOIN subjects s ON ss.subject_id = s.subject_id
    WHERE ss.student_id = ?
  `;

  // Execute both queries
  db.query(studentQuery, [studentId], (err, studentResults) => {
    if (err) {
      console.error('There was an error fetching the student details!', err);
      res.status(500).json({ error: 'Failed to fetch student details' });
      return;
    }

    if (studentResults.length === 0) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }

    db.query(gradesQuery, [studentId], (err, gradesResults) => {
      if (err) {
        console.error('There was an error fetching the grades!', err);
        res.status(500).json({ error: 'Failed to fetch grades' });
        return;
      }

      const student = studentResults[0];
      student.grades = gradesResults;

      res.json(student);
    });
  });
});

// Endpoint to fetch the employee list
app.get('/employees', (req, res) => {
  const query = 'SELECT * FROM employees';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint to fetch distinct positions
app.get('/employees/positions', (req, res) => {
  const query = 'SELECT DISTINCT position FROM employees';
  db.query(query, (err, results) => {
    if (err) throw err;
    console.log('Fetched positions:', results); // Debug log
    res.json(results.map(row => row.position));
  });
});

// Endpoint to fetch distinct departments
app.get('/employees/departments', (req, res) => {
  const query = 'SELECT DISTINCT department FROM employees';
  db.query(query, (err, results) => {
    if (err) throw err;
    console.log('Fetched departments:', results); // Debug log
    res.json(results.map(row => row.department));
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

app.get('/students', (req, res) => {
  const query = 'SELECT * FROM students';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
