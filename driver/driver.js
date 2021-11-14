'use strict';
const events = require('../event-pool');


events.on('pickup', pickUp)

function pickUp(payload) {

    setTimeout(() => {
      console.log(`DRIVER: picked up order No: ${payload.OrderId}`);
      events.emit('in-transit', payload);
    }, 1000)


    setTimeout(() => {
      console.log(`DRIVER: delivered order No: ${payload.OrderId}`);
      events.emit('delivered', payload);
    }, 3000)
  
  }
  
  module.exports = {pickUp} 