const Slack = require( 'node-slack' );
const rp = require('request-promise');
const cheerio = require('cheerio');

let slackConfig = {
	webhook_url: 'https://hooks.slack.com/services/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' // #feed-bots
	// 	webhook_url: 'https://hooks.slack.com/services/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' // #tests
	,botName: 'Robin'
};

const slack = new Slack(slackConfig.webhook_url);
const message = `Hola Kubide, esto es un mensaje desde un bot de Node`;
const url2 = 'https://es.wikipedia.org/wiki/Wikipedia:Portada';

rp(url2)
	.then(function(html){
		//success!
		const $ = cheerio.load(html);
		$('div#main-tfa > h2 > span > a').each((i, elem) => {
			// console.log($(elem).text(), '<<<<<<<< Artículo destacado del día en WIKIPEDIA');
			slack.send( {
				text: 'Artículo destacado del día en WIKIPEDIA: '+ $(elem).text() +
					'. \nEnlace: https://es.wikipedia.org/' + $(elem).attr('href')
			});
		});
	}).catch(function(err){
	//handle error
});
