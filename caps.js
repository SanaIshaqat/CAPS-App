'use strict';

const events = require('./event-pool');
require('./driver/driver');
require('./vendor/vendor');

events.on('pickup', pickUp);
events.on('in-transit', inTransit);
events.on('delivered', delivered);


function pickUp(payload) {
    let results = {
      event : 'pickup',
      time: new Date().toLocaleString(),
      payload : payload,
    };
    console.log('EVENT', results);
  }

  function inTransit(payload) {
    let results = {
      event : 'inTransit',
      time: new Date().toLocaleString(),
      payload : payload,
    };
    console.log('EVENT', results);
  }

  function delivered(payload) {
    let results = {
      event : 'delivered',
      time: new Date().toLocaleString(),
      payload : payload,
    };
    console.log('EVENT', results);
  }


  module.exports = {
    pickUp,
    inTransit,
    delivered,
  };