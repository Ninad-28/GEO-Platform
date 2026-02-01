/* backend/config/database.js */
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Postgres connection
// Format: postgres://user:password@localhost:5432/database_name
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Set to console.log to see raw SQL queries (helpful for debugging)
});

module.exports = sequelize;