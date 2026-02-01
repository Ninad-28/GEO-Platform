/* backend/models/Analysis.js */
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Analysis = sequelize.define('Analysis', {
  // Store the raw Firecrawl data (Headings, Content) here
  scraped_data: {
    type: DataTypes.JSONB, 
    allowNull: true
  },
  
  // Store the Gemini AI response here
  ai_response: {
    type: DataTypes.TEXT, 
    allowNull: true
  },
  
  // Store the "Optimization Recommendations" here
  recommendations: {
    type: DataTypes.JSONB, 
    allowNull: true
  }
});

module.exports = Analysis;