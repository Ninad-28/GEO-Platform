/* backend/test_api.js */
const axios = require('axios');

async function testProjectCreation() {
  try {
    console.log("🚀 Sending request...");
    // Note: This matches your server's port 5000
    const response = await axios.post('http://localhost:5000/api/projects', {
      url: "https://stripe.com", 
      target_query: "how to integrate payment gateway"
    });

    console.log("✅ API Response:", response.data);
  } catch (error) {
    console.error("❌ Error:", error.response ? error.response.data : error.message);
  }
}

testProjectCreation();