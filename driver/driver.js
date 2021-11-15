'use strict';
// const events = require('../event-pool');

const port = 3000;
const io = require('socket.io-client');
const host = `http://localhost:${port}`
const socket = io.connect(`${host}/caps`);
const storeName ='SI-FlowerShop';
socket.emit('service',storeName );
socket.on('pickup', pickUp);

// events.on('pickup', pickUp)


function pickUp(payload) {

    setTimeout(() => {
      console.log(`DRIVER: picked up order No: ${payload.OrderId}`);
      socket.emit('in-transit', payload);
    }, 1500)


    setTimeout(() => {
      console.log(`DRIVER: delivered order No: ${payload.OrderId}`);
      socket.emit('delivered', payload);
    }, 3000)
  
  }
  
  module.exports = {pickUp} 