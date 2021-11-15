'use strict';

// const events = require('./event-pool');
// require('./driver/driver');
// require('./vendor/vendor');

// events.on('pickup', pickUp);
// events.on('in-transit', inTransit);
// events.on('delivered', delivered);

const port = 3000;
const io = require('socket.io')(port);
const caps = io.of('/caps');

//Equivalent of end points NAMESPACES

io.on('connection', (socket) => {
  console.log("Global Connection is working! ", socket.id);

});
caps.on('connection', (socket) => {
  console.log('connected to CAPS', socket.id);


  socket.on('service', room => {
    socket.join(room);
  })

  //Equivalent of Event Funtions

// function pickUp(payload) {
//     let results = {
//       event : 'pickup',
//       time: new Date().toLocaleString(),
//       payload : payload,
//     };
//     console.log('EVENT', results);
//   }

  socket.on('pickup',payload=>{
    let results = {
            event : 'pickup',
            time: new Date().toLocaleString(),
            payload : payload,
          };
          caps.emit('pickup', payload);
          console.log('EVENT', results);
  })


  // function inTransit(payload) {
  //   let results = {
  //     event : 'inTransit',
  //     time: new Date().toLocaleString(),
  //     payload : payload,
  //   };
  //   console.log('EVENT', results);
  // }

  socket.on('in-transit',payload=>{
    let results = {
            event : 'in-transit',
            time: new Date().toLocaleString(),
            payload : payload,
          };
          caps.emit('in-transit', payload);
          console.log('EVENT', results);
  })

  // function delivered(payload) {
  //   let results = {
  //     event : 'delivered',
  //     time: new Date().toLocaleString(),
  //     payload : payload,
  //   };
  //   console.log('EVENT', results);
  // }

  socket.on('delivered',payload=>{
    let results = {
            event : 'delivered',
            time: new Date().toLocaleString(),
            payload : payload,
          };
          caps.emit('delivered', payload);
          console.log('EVENT', results);
  })
})
  // module.exports = {
  //   pickUp,
  //   inTransit,
  //   delivered,
  // };

  module.exports=caps