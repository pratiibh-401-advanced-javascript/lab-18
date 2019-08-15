'use strict';

const io = require('socket.io')(3001);
/**
 * Whenever anyone connects to my server, their socket ID will be displayed and their connection will be recognized in the console
 */
io.on('connection', (socket) => {
  console.log('Connected', socket.id);

  /**
 * Upon hearing the publish event (or emit), take the payload and as long as it is an object, parse it into JSON, and then emit the event type and the data that is carried by the payload to everyone (all socket ID's) connected to my server
 */
  socket.on('publish', (payload) => {
    try {
      if (typeof payload !== 'object'){
        payload = JSON.parse(payload);
      }
      socket.broadcast.emit(payload.event, payload.data);
    } catch(e){
      console.log(e);
    }
  });
});
