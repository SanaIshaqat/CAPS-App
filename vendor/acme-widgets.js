'use strict';

// require('dotenv').config();
// const events = require('../event-pool');
var faker = require('faker');

const port = 3000;
const io = require('socket.io-client');
const host = `http://localhost:${port}`
const socket = io.connect(`${host}/caps`);

const storeName ='acme-widgets';
//join room
socket.emit('service',storeName );



socket.on('delivered', thankYouNote);

// events.on('delivered', thankYouNote);
let vendorDetails = { clientID: storeName, event: 'delivered'};


socket.emit('get-all', vendorDetails);

socket.on('message', message => {
    if(message.payload.event === 'delivered' && message.payload.payload.store === storeName) {
        console.log('message',message)
        thankYouNote(message);
    }
    if(message.payload.event === 'in-transit' && message.payload.payload.store === storeName) {
      socket.emit('received', message.id);
      console.log('id:',message.id);
    }
  });
  
  socket.on('in-transit', message => {
    socket.emit('received', message.id);
  });
  

setInterval(() => {
    let orderDetails = {
      Store: storeName,
      OrderId: faker.datatype.uuid(),
      Customer: faker.name.findName(),
      Address: faker.address.streetAddress()
    }
  
    socket.emit('pickup', orderDetails);
  }, 5000);

  socket.on('delivered', thankYouNote);

function thankYouNote(message) {
    console.log(`${message.payload.payload.store}VENDOR: Thank you for delivering order No: ${message.payload.payload.OrderId}`); 
    console.log(`VENDOR: Thank You ${message.payload.payload.Customer} Enjoy Your Purchase !`)   
    
  socket.emit('received',JSON.stringify(message.id));
  }
