const { Sequelize } = require('sequelize');
require('dotenv').config();

// Connect manually just to check
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

async function check() {
  try {
    const [results] = await sequelize.query("SELECT * FROM \"Analyses\" ORDER BY \"createdAt\" DESC LIMIT 1;");
    console.log("--- LATEST DATABASE ENTRY ---");
    if (results.length > 0) {
      console.log("✅ AI Response Saved:", results[0].ai_response.substring(0, 50) + "...");
      console.log("✅ Recommendations JSON:", results[0].recommendations);
    } else {
      console.log("❌ No data found in Analysis table.");
    }
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}

check();