require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// --- IMPORTS ---
  const Project = require('./models/project');
  const Analysis = require('./models/analysis');
const projectRoutes = require('./routes/projectRoutes');

// --- INITIALIZE APP ---
const app = express(); // <--- This must happen BEFORE app.use()

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- DATABASE RELATIONS ---
// This links the two tables together
Project.hasOne(Analysis);
Analysis.belongsTo(Project);

// --- ROUTES ---
// This must happen AFTER app is initialized
app.use('/api/projects', projectRoutes);

// --- START SERVER ---
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected.');

    // Sync models to database (create tables if missing)
    await sequelize.sync({ force: false }); 
    console.log('✅ All Models Synced.');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Database Connection Error:', error.message);
  }
};

startServer();