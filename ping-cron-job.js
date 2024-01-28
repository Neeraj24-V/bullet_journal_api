const express = require("express");
const cron = require("node-cron");

const app = express();

const urlToPing = "https://bullet-journal-model-api.onrender.com";

cron.schedule("*/14 * * * *", async () => {
  try {
    const response = await fetch(urlToPing);
    console.log(`Ping successful at ${new Date()}. Status: ${response.status}`);
  } catch (err) {
    console.error(`Error pinging URL at ${new Date()}: ${err.message}`);
  }
});
