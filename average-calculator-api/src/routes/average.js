const express = require("express"); 
const axios = require("axios");
const router = express.Router();

const ACCESS_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ5MDIxOTA3LCJpYXQiOjE3NDkwMjE2MDcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImNjMjRhYzIwLTdjNDItNDRmYy04ZjkwLTg2MWNiOWY5MTM2YiIsInN1YiI6ImFuaXNoYXNoaW5kZTQ1NkBnbWFpbC5jb20ifSwiZW1haWwiOiJhbmlzaGFzaGluZGU0NTZAZ21haWwuY29tIiwibmFtZSI6ImFuaXNoYSBzdWtoYWRlbyBzaGluZGUiLCJyb2xsTm8iOiI3MjIzMzI2OWciLCJhY2Nlc3NDb2RlIjoiS1JqVVVVIiwiY2xpZW50SUQiOiJjYzI0YWMyMC03YzQyLTQ0ZmMtOGY5MC04NjFjYjlmOTEzNmIiLCJjbGllbnRTZWNyZXQiOiJmZ1FTQlJVa3ZmV1BDWVp1In0.Nc5r7WTcIw5R64DwilCROhoD88riicWudPsHNtLzL10";

const EVALUATION_URLS = {
  primes: "http://20.244.56.144/test/primes",
  fibo: "http://20.244.56.144/test/fibo",
  even: "http://20.244.56.144/test/even",
  rand: "http://20.244.56.144/test/rand",
};

router.get("/", async (req, res) => {
  const { category } = req.query;

  if (!category || !EVALUATION_URLS[category]) {
    return res.status(400).json({ error: "Invalid or missing category" });
  }

  try {
    const response = await axios.get(EVALUATION_URLS[category], {
      headers: {
        Authorization: ACCESS_TOKEN,
      },
    });

    const numbers = response.data.numbers || [];
    const average =
      numbers.length > 0
        ? numbers.reduce((sum, num) => sum + num, 0) / numbers.length
        : 0;

    return res.json({ numbers, average });
  } catch (error) {
    console.error("Error fetching from test API:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }
    return res.status(500).json({ error: "Failed to fetch or calculate average" });
  }
});

module.exports = router;
