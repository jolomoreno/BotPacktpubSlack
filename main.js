const Slack = require( 'node-slack' );
const rp = require('request-promise');

let slackConfig = {
	webhook_url: 'https://hooks.slack.com/services/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' // #feed-bots - BotName: Robin
	// 	webhook_url: 'https://hooks.slack.com/services/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' // #feed-bots - BotName: Robin
};

const slack = new Slack(slackConfig.webhook_url);

const baseUrl = 'https://www.packtpub.com';
const subscriptionUrl = 'https://subscription.packtpub.com';
const now = new Date();
console.log(typeof now, '<<<<<<<<<<< now');
console.log(now, '<<<<<<<<<<< now');

const fromDate = now;
console.log(typeof fromDate, '<<<<<<<<<<< fromDate');
console.log(fromDate, '<<<<<<<<<<< fromDate');
console.log(new Date(fromDate), '<<<<<<<<<<< fromDate new Date');

const toDate = now.setHours(24,null,0,0);
console.log(typeof toDate, '<<<<<<<<<<< toDate');
console.log(toDate, '<<<<<<<<<<< toDate');
console.log(new Date(toDate), '<<<<<<<<<<< toDate new Date');

const url3 = `https://services.packtpub.com/free-learning-v1/offers?dateFrom=2019-07-23T00:00:00.000Z&dateTo=2019-07-24T00:00:00.000Z`;
const url4 = 'https://static.packt-cdn.com/products/{{productId}}/summary';
rp(url3)
	.then( (response) => {
		//success!
		const responseObj = JSON.parse(response);
		const urlParsed = url4.replace('{{productId}}', responseObj.data[0].productId);
		rp(urlParsed)
			.then( (response2) => {
				const response2Obj = JSON.parse(response2);
				let message = `Hola!, \nEste es el libro gratuito de hoy en Packtpub: ${response2Obj.title}.\n`;
				message += `Lo puedes obtener en el siguiente enlace (debes estar registrado/a): ${baseUrl}/free-learning\n`;
				message += `En el caso de que ya lo tengas, lo puedes leer en el siguiente enlace: ${subscriptionUrl}${response2Obj.readUrl}`;
				console.log(message, '<<<<<<<<<<< message');
				/*slack.send( {
					text: message
				})*/
			}).catch( (error2) => {
			console.log(error2, '<<<<<<<<<<< ERROR 2');
		})
	}).catch((error) => {
	//handle error
	console.log(error, '<<<<<<<<<<< ERROR');
});

