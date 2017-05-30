const linebot = require('../index.js');
const express = require('express');
const bodyParser = require('body-parser');

const bot = linebot({
	channelId: '1516658778',
	channelSecret: 'e5fda530ba18a6b36a476e360b35bb66',
	channelAccessToken: 'HkzMFolGyLSo/MbkU10axpqTOLweKUOTzrsiQ7DkKgbPLKarLOXe61q6xYoFGOwvHQz2zy/AftCXZAyrd+49YMEEpLPLcxoBAY6rx2Z/lIo5ty5L6fKkFSDUEH3ePkdjBuxV9CaERDna++44fcVVpgdB04t89/1O/w1cDnyilFU='
});

const app = express();

const parser = bodyParser.json({
	verify: function (req, res, buf, encoding) {
		req.rawBody = buf.toString(encoding);
	}
});

app.post('/linewebhook', parser, function (req, res) {
	if (!bot.verify(req.rawBody, req.get('X-Line-Signature'))) {
		return res.sendStatus(400);
	}
	bot.parse(req.body);
	return res.json({});
});

bot.on('message', function (event) {
	event.reply(event.message.text).then(function (data) {
		console.log('Success', data);
	}).catch(function (error) {
		console.log('Error', error);
	});
});

app.listen(process.env.PORT || 80, function () {
	console.log('LineBot is running.');
});
