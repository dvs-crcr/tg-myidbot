const https = require('https');

const botToken = '<YOUR_BOT_TOKEN>';
const sendMessage = (params, callback) => {
	let options = {
		host: 'api.telegram.org',
		port: 443,
		path: `/bot${botToken}/sendMessage`,
		method: 'POST',
		agent: false,
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(JSON.stringify(params))
		}
	}; 
	let req = https.request(options, function(res) {
		let data = '';
		res.on('data', function(chunk) {
			data += chunk.toString();
		}); 
		res.on('end', function() {
			if (callback) {
				callback(JSON.parse(data));
			}
		});
	});
	req.write(JSON.stringify(params));
	req.end();
}

module.exports.handler = async (event) => {
	if (event.body) {
		let data = JSON.parse(event.body)
		if (typeof data.message !== 'undefined') {
			if (data.message.chat.type === 'private') {
				sendMessage({
					chat_id: data.message.from.id,
                    text: `ID: <b>${data.message.from.id}</b>`,
                    parse_mode: 'HTML'
				});
			}
		}
	}
    return {
        "statusCode": 200,
        "headers": {"content-type": "application/json"},
        "body": "{ok: true}"
    };
};