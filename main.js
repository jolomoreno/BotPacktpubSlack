const Slack = require( 'node-slack' );
const scrape = require( 'html-scrape' );

let slackConfig = {
	webhook_url: 'https://hooks.slack.com/services/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'
	,channel: '#tests'
	,botName: 'Robin'
};

const slack = new Slack(slackConfig.webhook_url);
const message = `Hola Kubide, esto es un mensaje desde un bot de Node`;

const elements = {
	title: { start: '<h2>', end: '</h2>' },
	explicit: { el: '.product__author' }
}

scrape ('https://www.packtpub.com/free-learning', elements, function (error, data) {
	if (error) {
		console.log(error);
	} else {
		console.log(data);
	}
});

/*slack.send( {
	text: message
});*/

