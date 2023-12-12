// /src/models/userModel.js
import db from '../config/database';
import bcrypt from 'bcrypt';

// 20520683 - Luu Huynh Phat
class UserModel {
  /**
   * Retrieves all users from the database.
   * @param {function} callback - The callback function to handle the result.
   * @returns {void}
   */
  static getAllUsers(callback) {
    db.all('SELECT id, name, email FROM users', (err, rows) => {
      if (err) {
        console.error('Error getting users:', err.message);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  /**
   * Retrieves a user by their ID.
   * @param {number} id - The ID of the user.
   * @param {function} callback - The callback function to handle the result.
   */
  static getUserById(id, callback) {
    db.get(
      'SELECT id, name, email FROM users WHERE id = ?',
      [id],
      (err, row) => {
        if (err) {
          console.error('Error getting user by ID:', err.message);
          callback(err, null);
        } else {
          callback(null, row);
        }
      }
    );
  }

  /**
   * Adds a user to the database.
   * @param {Object} user - The user object containing name, email, and password.
   * @param {function} callback - The callback function to be called after adding the user.
   */
  static addUser(user, callback) {
    const { name, email, password } = user;

    // Hash the password before storing it
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err.message);
        callback(err);
      } else {
        db.run(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [name, email, hashedPassword],
          (err) => {
            if (err) {
              console.error('Error adding user:', err.message);
              callback(err);
            } else {
              callback(null);
            }
          }
        );
      }
    });
  }

  /**
   * Authenticates a user by checking their email and password.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @param {function} callback - The callback function to be called with the authentication result.
   * @returns {void}
   */
  static authenticateUser(email, password, callback) {
    db.get(
      'SELECT id, name, email, password FROM users WHERE email = ?',
      [email],
      (err, user) => {
        if (err) {
          console.error('Error authenticating user:', err.message);
          callback(err, null);
        } else if (!user) {
          callback(null, false); // User not found
        } else {
          // Compare the provided password with the hashed password in the database
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              console.error('Error comparing passwords:', err.message);
              callback(err, null);
            } else if (result) {
              // Passwords match, provide the user object without the password
              const { id, name, email } = user;
              callback(null, { id, name, email });
            } else {
              // Passwords do not match
              callback(null, false);
            }
          });
        }
      }
    );
  }
}

module.exports = UserModel;
