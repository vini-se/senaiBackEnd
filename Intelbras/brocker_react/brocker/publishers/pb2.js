const mqtt = require('mqtt');

const brokerUrl = 'mqtt://localhost';
const options = {
  clientId: 'publisher',
  clean: true
};

const client = mqtt.connect(brokerUrl, options);

const topic = 'updateDB';
let ciclo = 0

function updateDb(status = true){
  const message = {
    request: {
      id: 1, 
      produto: 'Placa modem ABC',
      quantidade: ciclo,
      status: status,
    }
  }
  ciclo++
  setPublish(topic, message);
}

function setPublish(topic, message) {
  message = JSON.stringify(message);
  client.publish(topic, message)
  console.log(`Mensagem publicada: ${JSON.stringify(message)}`);
}

setInterval(() => {
  updateDb()
}, 5000)