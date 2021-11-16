'use strict';
// const events = require('../event-pool');

const port = 3000;
const io = require('socket.io-client');
const host = `http://localhost:${port}`
const socket = io.connect(`${host}/caps`);
// const storeName ='SI-FlowerShop';
// socket.emit('service',storeName );
// socket.on('pickup', pickUp);


let driver = {clientID: 'driver', event: 'pickup'};

//get all messages 
socket.emit('get-all', driver);

socket.on('message', message => {
  if(message.payload.event === 'pickup') {
    console.log('message',message)
    pickUp( JSON.stringify(message));
  }
});


socket.on('pickup', pickUp);


function pickUp(message) {

    setTimeout(() => {
      console.log(`DRIVER: picked up order No: ${message.payload.payload.OrderId}`);
      socket.emit('in-transit',  JSON.stringify(message.payload.payload));
    }, 1500)


    setTimeout(() => {
      console.log(`DRIVER: delivered order No: ${message.payload.payload.OrderId}`);
      socket.emit('delivered',  JSON.stringify(message.payload.payload));
    }, 3000)

    socket.emit('received', message.id);
  }
  
  module.exports = {pickUp} 