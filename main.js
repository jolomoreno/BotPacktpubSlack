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

/*const $ = cheerio.load('<h1 class="title">Hello world</h1> <h2 class="title">Hello world</h2>')

console.log($.html(), '<<<< HAHAHAHAH');
console.log($('h2.title').text(), '<<<< HAHAHAHAH 2');*/

rp(url).then(function(html){
		//success!
		console.log(html, '<<<< HTML');
		const $ = cheerio.load(html);
		// console.log($('h2.product__title').length, '<<<<<<<<<<<< LENGTH');
		console.log($('h2').text(), '<<<<<<<<<<<< CONTENT');
		// console.log($('h2.product__title', html.attribs), '<<<<<<<<<<<< ATTRIBS');
	})
	.catch(function(err){
		//handle error
	});

/*slack.send( {
	text: message
});*/

