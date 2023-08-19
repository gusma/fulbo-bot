const axios = require("axios");
const cheerio = require("cheerio");

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

module.exports = fetchGames;
