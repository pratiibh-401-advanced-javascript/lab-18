'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

const logger = {};

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

socket.on('save', logger.save);
socket.on('error', logger.error);


