const https = require('https');

const BOT_TOKEN = 'YOUR_BOT_TOKEN_CONST';

const sendMessage = (params, callback) => {
  const options = {
    host: 'api.telegram.org',
    port: 443,
    path: `/bot${ BOT_TOKEN }/sendMessage`,
    method: 'POST',
    agent: false,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(params)),
    },
  };
  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk.toString();
    });
    res.on('end', () => {
      if (callback) {
        callback(JSON.parse(data));
      }
    });
  });
  req.write(JSON.stringify(params));
  req.end();
};

module.exports.handler = async (event) => {
  if (event.body) {
    const data = JSON.parse(event.body);
    const { message } = data;
    if (message) {
      const { chat, from } = message;
      if (chat.type === 'private') {
        const { id: chat_id } = from;
        sendMessage({
          chat_id,
          text: `ID: <b>${ chat_id }</b>`,
          parse_mode: 'HTML',
        });
      }
    }
  }
  return {
    'statusCode': 200,
    'headers': { 'content-type': 'application/json' },
    'body': '{ok: true}',
  };
};