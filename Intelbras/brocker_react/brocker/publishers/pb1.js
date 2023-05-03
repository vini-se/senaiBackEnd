const mqtt = require('mqtt');

const brokerUrl = 'mqtt://localhost';
const options = {
  clientId: 'publisher',
  clean: true
};

const client = mqtt.connect(brokerUrl, options);

const topic = 'updateDB';
let ciclo = 1

function updateDb(status = true){
  const message = {
    request: {
      id: 0, 
      produto: 'Placa moden XYZ',
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
}, 3000)