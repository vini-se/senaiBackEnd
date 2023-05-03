const mqtt = require('mqtt');

const brokerUrl = 'mqtt://localhost';
const options = {
  clientId: 'subscriber',
  clean: false,
};

const client = mqtt.connect(brokerUrl, options);

const topic = 'updateDB';
let parsedMessage = '';

client.subscribe(topic);

client.on('message', (topic, message) => {
  parsedMessage = JSON.parse(message.toString());
  console.log(`------------------------------------------------`);
  console.log(`Mensagem recebida: ${JSON.stringify(parsedMessage)}`);
  setMessage(parsedMessage)
});

function setMessage(message){
  // Código SQL para salvar a mensagem(progresso) ao **id** que veio pela mensagem
  console.table(message);
  console.log(`------------------------------------------------`);
}
