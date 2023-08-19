const axios = require("axios");
const cheerio = require("cheerio");
const TelegramBot = require("node-telegram-bot-api");

require("dotenv").config();

const botToken = process.env.BOT_TOKEN;
const channelID = process.env.CHANNEL_ID;

const bot = new TelegramBot(botToken, { polling: true });

// Fetch the games from librefutbol
async function fetchGames() {
  try {
    const response = await axios.get("https://librefutboltv.com/agenda/");

    const $ = cheerio.load(response.data);
    let games = [];

    $("li a").each((i, element) => {
      const gameText = $(element).text().trim();

      if (gameText.includes("\n")) {
        const parts = gameText.split("\n").map((part) => part.trim());
        const reorderedGameText = parts.reverse().join(" - ");
        games.push(reorderedGameText);
      }
    });

    return {
      status: "success",
      content: games,
    };
  } catch (error) {
    let errorMessage = "";

    if (error.response) {
      errorMessage = `Error: ${error.response.status} Recibido desde el servidor del sitio.`;
    } else if (error.request) {
      // No response was received from the server.
      errorMessage = "Error: Sin respuesta del servidor.";
    } else {
      errorMessage = `Error: ${error.message}`;
    }

    return {
      status: "error",
      content: `${errorMessage}. No se puede conectar con la url..`,
    };
  }
}

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
