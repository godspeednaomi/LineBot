const linebot = require('../index.js');
const express = require('express');

const bot = linebot({
	channelId: process.env.CHANNEL_ID,
	channelSecret: process.env.CHANNEL_SECRET,
	channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const app = express();

const linebotParser = bot.parser();

app.post('/linewebhook', linebotParser);

bot.on('message', function (event) {
	event.reply(event.message.text).then(function (data) {
		console.log('Success', process.env.CHANNEL_ID);
	}).catch(function (error) {
		console.log('Error', process.env.CHANNEL_ID);
	});
});

app.listen(process.env.PORT || 8888, function () {
	console.log('LineBot is running.');
});
