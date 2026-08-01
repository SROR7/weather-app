const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

app.get("/weather", async (req, res) => {
  const city = req.query.city;

  try {
    const response = await axios.get(
      "https://open-weather13.p.rapidapi.com/city",
      {
        params: {
          city: city,
          lang: "EN",
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.response?.data);
    res.status(error.response?.status || 500).json(error.response?.data);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});