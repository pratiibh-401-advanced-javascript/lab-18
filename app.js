'use strict';

const fs = require('fs');
const util = require('util');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const file = {};

file.loadFile = (file) => readFile(file);
file.saveFile = (file, buffer) => writeFile(file, buffer);
file.convertBuffer = buffer => {
  return Buffer.from( buffer.toString().trim().toUpperCase());
};

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