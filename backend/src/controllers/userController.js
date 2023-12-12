import UserModel from '../models/userModel.js';

// 20520683 - Luu Huynh Phat
class UserController {
  /**
   * Get all users.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves with the users data or rejects with an error.
   */
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error getting users:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Adds a new user to the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the user is added successfully.
   */
  static async addUser(req, res) {
    const { name, email, password } = req.body;

    try {
      await UserModel.addUser({ name, email, password });
      res.json({ message: 'User added successfully' });
    } catch (error) {
      console.error('Error adding user:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Authenticates a user by their email and password.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>} - A promise that resolves when the authentication is complete.
   */
  static async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.authenticateUser(email, password);
      if (user) {
        res.json({ message: 'Authentication successful', user });
      } else {
        res.status(401).json({ error: 'Authentication failed' });
      }
    } catch (error) {
      console.error('Error authenticating user:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;
