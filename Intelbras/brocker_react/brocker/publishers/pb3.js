const mqtt = require('mqtt');

const brokerUrl = 'mqtt://localhost';
const options = {
  clientId: 'device1_HJX',
  clean: false,
};

const client = mqtt.connect(brokerUrl, options);

const topic = 'updateDB';
let ciclo = 1

function updateDb(status = true){
  const message = {
    request: {
      id: 2, 
      produto: 'Placa modem HJX',
      quantidade: ciclo,
      status: status,
    }
  }
  ciclo++
  setPublish(topic, message);
}

function setPublish(topic, message) {
  message = JSON.stringify(message);
  client.publish(topic, message);
  console.clear();
  console.log(`Mensagem publicada: ${JSON.stringify(message)}`);
}

setInterval(() => {
  updateDb()
}, 4000)