// server.js
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

// Existing endpoints...

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

// Add a new endpoint to fetch student data
app.get('/students', (req, res) => {
  const query = 'SELECT * FROM students';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add the new endpoint to fetch filter options
app.get('/filters', (req, res) => {
  const yearsQuery = 'SELECT DISTINCT year FROM students';
  const gradesQuery = 'SELECT DISTINCT grade FROM students';
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
      resolve(results.map(row => row.grade));
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

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
