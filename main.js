const Slack = require( 'node-slack' );
const rp = require('request-promise');
const cheerio = require('cheerio');

let slackConfig = {
	webhook_url: 'https://hooks.slack.com/services/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'
	,channel: '#tests'
	,botName: 'Robin'
};

const slack = new Slack(slackConfig.webhook_url);
const message = `Hola Kubide, esto es un mensaje desde un bot de Node`;

const elements = {
	title: { start: '<body>', end: '</body>' },
	explicit: { el: '#PRUEBA' }
}

const url = 'https://www.packtpub.com/free-learning';

rp(url)
	.then(function(html){
		//success!
		const $ = cheerio.load(html);
		$('h2').each((i, elem) => {
			console.log($(elem).text(), '<<<<<<<< TEXT');
		});
		$('img.bookimage').each((i, elem) => {
			console.log($(elem).attr('alt'), '<<<<<<<< ALT');
		});
		$('ul.items > li.cms_page > strong').each((i, elem) => {
			console.log($(elem).text(), '<<<<<<<< AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
		});
		$('div.product__left > a > img.product__img ').each((i, elem) => {
			console.log($(elem).attr('alt'), '<<<<<<<< BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
		});
	}).catch(function(err){
		//handle error
	console.log(err, '<<<<<<<< err');
	});

const url2 = 'https://es.wikipedia.org/wiki/Wikipedia:Portada';

rp(url2)
	.then(function(html){
		//success!
		const $ = cheerio.load(html);
		$('div#main-tfa > h2 > span > a').each((i, elem) => {
			console.log($(elem).text(), '<<<<<<<< Artículo destacado del día en WIKIPEDIA');
			/*slack.send( {
				text: 'Artículo destacado del día en WIKIPEDIA: '+ $(elem).text() +
					'. Enlace: https://es.wikipedia.org/' + $(elem).attr('href')
			});*/
		});
	}).catch(function(err){
	//handle error
});

/*slack.send( {
	text: message
});*/

