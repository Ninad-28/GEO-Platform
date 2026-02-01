/* backend/services/scraperService.js */
const axios = require('axios');
require('dotenv').config();

const scrapeData = async (url) => {
  try {
    console.log(`🕷️ Scraping started for: ${url}`);
    
    const response = await axios.post(
      'https://api.firecrawl.dev/v0/scrape',
      {
        url: url,
        pageOptions: {
          onlyMainContent: true,
          includeHtml: true
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.success) {
      const data = response.data.data;
      return {
        markdown: data.markdown,
        html: data.html,
        metadata: data.metadata
      };
    } else {
      throw new Error('Firecrawl failed to scrape.');
    }

  } catch (error) {
    console.error(`❌ Scraping Error: ${error.message}`);
    return null;
  }
};

module.exports = { scrapeData };