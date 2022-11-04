import TelegramBot from 'node-telegram-bot-api';

import { YD } from './Downloader.js';
import linkParser from './LinkParser.js';
import clearDirectory from './ClearDirectory.js';

// Getting bot token from environment variable
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  let lastMessageId;

  // Output file path
  let outPath;

  // Getting video id from link
  let link = linkParser(msg.text);

  // Guard clause for case if linkParser returns false
  // Return from function
  if (!link) {
    bot.sendMessage(chatId, 'Provide a valid YouTube link');
    return;
  }

  // Downloading video
  YD.download(linkParser(msg.text));

  bot
    .sendMessage(chatId, 'Started downloading...')
    .then((message) => {
      lastMessageId = message.message_id;
    })
    .catch((err) => {
      console.log(err);
    });

  // TODO: add progress in message
  YD.on('progress', function (progress) {
    bot.editMessageText(
      `Progress: ${Number.parseInt(progress.progress.percentage)}/100`,
      { chat_id: chatId, message_id: lastMessageId }
    );
    console.log(progress.progress.percentage);
  });

  // When finished, send mp3 to chat
  YD.on('finished', function (err, data) {
    outPath = data.file;

    bot
      .sendAudio(chatId, outPath)
      .then(() => {
        clearDirectory();
      })
      .catch((error) => {
        console.log(error);
      });
  });

  YD.on('error', function (error) {
    console.log(error);
    bot.sendMessage(chatId, `Error occurred: ${error}`);
  });
});
