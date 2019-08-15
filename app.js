'use strict';

const fs = require('fs');
const util = require('util');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const file = {};
/**
 * loadFile, saveFile, convertBuffer, and alterFile are methods of the file object declared above
 * loadFile takes in file paramater and then executes the readFile method on it
 * saveFile takes in a file and buffer, executes writeFile method on that file and buffer
 * convertBuffer will take in the buffer, turn it to a string, uppercase it and return the buffer
 */
file.loadFile = (file) => readFile(file);
file.saveFile = (file, buffer) => writeFile(file, buffer);
file.convertBuffer = buffer => {
  return Buffer.from( buffer.toString().trim().toUpperCase());
};

/**
 * alterFile will take in the passFile as a parameter and will trigger all the above methods on it, and then will emit the save or error publish event for the listener to catch it
 */
file.alterFile = (passfile) => {
  return file.loadFile(passfile)
    .then(contents => file.convertBuffer(contents))
    .then(buffer => {
      return file.saveFile(passfile, buffer);

    })
    .then(() => socket.emit('publish', { event: 'save', data: passfile}))
    .then(() => true)
    .catch((error) => socket.emit('publish', { event: 'error', data: error}));
};

let f = process.argv.slice(2).shift();
file.alterFile(f);

module.exports = file;