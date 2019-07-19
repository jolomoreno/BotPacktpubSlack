const Slack = require( 'node-slack' );
const scrape = require( 'html-scrape' );
const $ = require('jquery');
const listing = 'https://www.packtpub.com/packt/offers/free-learning';


let slackConfig = {
	webhook_url: 'https://kubide.slack.com/..............'
	,token: '{your-webhook-token-here}'
	,chan: '#tests'
	,botName: 'FreeBooksBot'
};

const print = ( title, img ) => {
	const slack = new Slack( slackConfig.webhook_url );
	const message = `Today's :free: eBook from Packt is: *${title}*\n${img}\n\nGet it now: ${listing}`;

	slack.send( {
		text: message
		,channel: '@atuttle'
		,username: 'FreeBooksBot'
	}
	,( err ) => {
		if ( err ) {
			return console.error( err );
		}
	} );
};

const title = window.$(titleSelector)[0].innerHTML.trim();

const titleSelector = '.dotd-title h2';
const imgSelector = '.dotd-main-book-image img';
const handler = ( err, window ) => {
	console.log(' ENTRA ');
	const title = window.$(titleSelector)[0].innerHTML.trim();
	const img = 'https:' + window.$( imgSelector ).data( 'original' ).trim();
	print( title, img );
	console.log(title, '<<<< title');
	console.log(img, '<<<< img');
};

console.log(listing, '<<<< LISTING');
console.log(titleSelector, '<<<< titleSelector');
console.log(handler, '<<<< handler');
scrape( listing, titleSelector, handler );
