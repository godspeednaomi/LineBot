const linebot = require('../index.js');
const express = require('express');

const bot = linebot({
	channelId: '1516658778',
	channelSecret: 'e5fda530ba18a6b36a476e360b35bb66',
	channelAccessToken: 'HkzMFolGyLSo/MbkU10axpqTOLweKUOTzrsiQ7DkKgbPLKarLOXe61q6xYoFGOwvHQz2zy/AftCXZAyrd+49YMEEpLPLcxoBAY6rx2Z/lIo5ty5L6fKkFSDUEH3ePkdjBuxV9CaERDna++44fcVVpgdB04t89/1O/w1cDnyilFU='
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
