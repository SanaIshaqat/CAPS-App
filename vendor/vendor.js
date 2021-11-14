'use strict';

require('dotenv').config();
const events = require('../event-pool');
var faker = require('faker');

const storeName ='SI-FlowerShop';
events.on('delivered', thankYouNote);


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
  
    events.emit('pickup', orderDetails);
  }, 4000);

  

module.exports = { thankYouNote }