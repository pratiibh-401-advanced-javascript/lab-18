'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

const logger = {};

/** 
 * .save and .error are methods of the logger object above, will trigger either the save event or the error event depending on what is triggered
*/
logger.save = (payload) => {
  if(payload){
    console.log('save', payload);
  }
};


logger.error = (payload) => {
  if(payload){
    console.log('error', payload);
  }
};

/**
 * socket.on('save') and socket.on('error') are listening for either the save or error emit, and upon hearing them will trigger the logger.save or logger.error with respect to what is the logger hears from app.js
 */
socket.on('save', logger.save);
socket.on('error', logger.error);


