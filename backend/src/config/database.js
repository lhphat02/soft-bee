import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./backend/src/db/mydatabase.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = db;
