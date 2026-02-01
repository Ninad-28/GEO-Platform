/* backend/routes/projectRoutes.js */
const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Analysis = require('../models/analysis');
const { scrapeData } = require('../services/scraperService');
const { getAiAnswer, analyzeContent } = require('../services/aiService');

// 1. GET ALL PROJECTS (This was missing!)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [Analysis], // Include the analysis results
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. GET SINGLE PROJECT (Optional but good practice)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [Analysis]
    });
    if (!project) return res.status(404).json({ success: false, error: "Not Found" });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. CREATE PROJECT (Your existing logic)
router.post('/', async (req, res) => {
  try {
    const { url, target_query } = req.body;

    // Create Initial Project
    const project = await Project.create({ 
      url, 
      target_query, 
      status: 'scraping' 
    });

    // Send ID back immediately
    res.status(201).json({ 
      success: true, 
      data: project, 
      message: "Analysis started background..." 
    });

    // --- BACKGROUND PROCESS ---
    (async () => {
      try {
        console.log(`🕷️ Scraping ${url}...`);
        const scrapedData = await scrapeData(url);
        if (!scrapedData) throw new Error("Scraping failed");

        await project.update({ status: 'analyzing' });
        
        console.log(`🤖 Generating AI Answer for: ${target_query}...`);
        const aiAnswer = await getAiAnswer(target_query);

        console.log(`🧠 Analyzing Gaps...`);
        const analysisResult = await analyzeContent(target_query, aiAnswer, scrapedData.markdown);

        await Analysis.create({
          ProjectId: project.id,
          scraped_data: scrapedData,
          ai_response: aiAnswer,
          recommendations: analysisResult
        });

        await project.update({ status: 'completed' });
        console.log(`✅ Project ${project.id} COMPLETED.`);

      } catch (err) {
        console.error(`❌ Background Job Failed: ${err.message}`);
        await project.update({ status: 'failed' });
      }
    })();

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;