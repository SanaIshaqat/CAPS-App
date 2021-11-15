'use strict';

// require('dotenv').config();
// const events = require('../event-pool');
var faker = require('faker');


const port = 3000;
const io = require('socket.io-client');
const host = `http://localhost:${port}`
const socket = io.connect(`${host}/caps`);
const storeName ='SI-FlowerShop';
socket.emit('service',storeName );
socket.on('delivered', thankYouNote);

// events.on('delivered', thankYouNote);


function thankYouNote(payload) {
    console.log(`VENDOR: Thank you for delivering order No: ${payload.OrderId}`); 
    console.log(`VENDOR: Thank You ${payload.Customer} Enjoy Your Purchase !`)   
  }

setInterval(() => {
    let orderDetails = {
      Store: storeName,
      OrderId: faker.datatype.uuid(),
      Customer: faker.name.findName(),
      Address: faker.address.streetAddress()
    }
  
    socket.emit('pickup', orderDetails);
  }, 5000);

  

module.exports = { thankYouNote }