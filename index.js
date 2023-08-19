const axios = require('axios');
const cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');

async function fetchGames() {
  try {
    const response = await axios.get('https://librefutboltv.com/agenda/');
    
    const $ = cheerio.load(response.data);
    let games = [];

    $('li a').each((i, element) => {
      const gameText = $(element).text().trim();
  
      if (gameText.includes('\n')) {
        const parts = gameText.split('\n').map(part => part.trim());
        const reorderedGameText = parts.reverse().join('-');
        games.push(reorderedGameText);
      }
    });

    return {
      status: 'success',
      content: games
    };

  } catch (error) {
    let errorMessage = '';

    if (error.response) {
      errorMessage = `Error: Received a ${error.response.status} response from the server.`;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'Error: No response from the server.';
    } else {
      errorMessage = `Error: ${error.message}`;
    }

    return {
      status: 'error',
      content: `${errorMessage}. Couldn't connect to the URL.`
    };
  }
}

async function sendTelegramMessage(botToken, chatId, message) {
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  try {
    await axios.post(apiUrl, {
      chat_id: chatId,
      text: message
    });
  } catch (error) {
    console.error("Failed to send message via Telegram:", error.message);
  }
}

fetchGames().then(result => {
  if (result.status === 'success') {
    const gamesList = result.content.join('\n');
    // sendTelegramMessage(botToken, chatId, `Games today:\n${gamesList}`);
   console.log("Games List", gamesList)
  } else {
    // sendTelegramMessage(botToken, chatId, result.content);
   console.log("Error", result.content)
  }
});
