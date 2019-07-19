const Slack = require( 'node-slack' );
const scrape = require( 'html-scrape' );
const $ = require('jquery');
const listing = 'https://www.packtpub.com/free-learning';


let slackConfig = {
	webhook_url: 'https://hooks.slack.com/services/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'
};

const print = ( title, img ) => {
	const slack = new Slack( slackConfig.webhook_url );
	const message = `Today's :free: eBook from Packt is: *${title}*\n${img}\n\nGet it now: ${listing}`;

	slack.send( {
		text: message
	}
	,( err ) => {
		if ( err ) {
			return console.error( err );
		}
	} );
};


const titleSelector = '.dotd-title h2';
const imgSelector = '.dotd-main-book-image img';

const handler = ( err, window ) => {
	console.log(window, ' <<<<<< ENTRA WINDOW ');
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
