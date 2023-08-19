const fetchGames = require("./controllers/fetchGames.js");
const TelegramBot = require("node-telegram-bot-api");

require("dotenv").config();

const botToken = process.env.BOT_TOKEN;
const channelID = process.env.CHANNEL_ID;

const bot = new TelegramBot(botToken, { polling: true });

// Sends the games list (without links) to the channel.
async function sendGamesList(chatId) {
  const gamesResult = await fetchGames();
  if (gamesResult.status === "success") {
    const gamesList = gamesResult.content.join("\n");
    bot
      .sendMessage(
        channelID,
        `*Partidos de hoy:*\n${gamesList}\n\nInformacion extraida de librefutboltv.com`,
        { parse_mode: "Markdown" }
      )
      .then(() => {
        process.exit();
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
        process.exit(1); // exit with an error code
      });
  } else {
    bot
      .sendMessage(chatId, gamesResult.content, { parse_mode: "Markdown" })
      .then(() => {
        process.exit();
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
        process.exit(1); // exit with an error code
      });
  }
}

// Send a message when the script starts
sendGamesList(channelID);
