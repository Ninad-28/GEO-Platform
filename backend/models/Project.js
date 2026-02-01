/* backend/models/Project.js */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID, // Generates unique IDs like 'a1b2-c3d4...'
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true // Automatic validation!
    }
  },
  target_query: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'scraping', 'analyzing', 'completed', 'failed'),
    defaultValue: 'pending'
  }
});

module.exports = Project;