'use strict';

const port = 3000;
const io = require('socket.io')(port);
const uuid = require('uuid').v4;
const caps = io.of('/caps');

//Storing Messages in a Queue Obj.

const messagesQueue = {
  messages: {}
};

caps.on('connection', socket => {
    console.log('Connected to CAPS system MessageQueue', socket.id);

  socket.on('pickup', payload => {
    const id = uuid();
    messagesQueue.messages[id] = {
      event: 'pickup',
       time: new Date(),
       payload: payload};
    caps.emit('pickup', {id, payload: messagesQueue.messages[id]});
  });

 


  socket.on('in-transit', payload => { 
    const id = uuid();
    // 2 add the chore to the Msg Q
    messagesQueue.messages[id] = {
      event: 'in-transit',
       time: new Date(),
       payload: payload};
    // 3 send to the parent that the MsgQ added ur task to the Q
    // 4 send the chore to the child
    caps.to(payload.store).emit('in-transit', {id, payload: messagesQueue.messages[id]}); 
  });

  socket.on('delivered', payload => {
    const id = uuid();
    // 2 add the chore to the Msg Q
    messagesQueue.messages[id] = {
      event: 'delivered',
       time: new Date(),
       payload: payload}
    
    // 3 send to the parent that the MsgQ added ur task to the Q
    // 4 send the chore to the child
    caps.to(payload.store).emit('delivered',{id, payload: messagesQueue.messages[id]});
  });


  
  socket.on('get-all', payload => {
    console.log("++++ Get All Messages ++++")

    Object.keys(messagesQueue.messages).forEach(id=> {
      socket.emit('message', {id, payload: messagesQueue.messages[id]});
    });

  });


  // 6 >> delete the chore from the Q
  socket.on('received', id => {
    console.log("---- Message Received you can remove it from Queue ----")
    delete messagesQueue.messages[id];
    console.log("XXXX Delete Messages XXXX",messagesQueue)
  });
  
});