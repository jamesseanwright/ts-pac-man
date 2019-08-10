#!/usr/bin/env node

'use strict';

const http = require('http');
const { Server } = require('node-static');
const rollup = require('rollup');
const config = require('../rollup.config');

const PORT = 8080;

const fileServer = new Server('./dist', {
  'Cache-Control': 'no-cache, must-revalidate'
});

const serveFile = fileServer.serve.bind(fileServer);
const server = http.createServer(serveFile);
const watcher = rollup.watch(config);

watcher.on('event', event => {
  if (event.code === 'BUNDLE_START') {
    console.log('Changes detected. Bundling...');
  } else if (event.code === 'BUNDLE_END') {
    console.log(`Bundling complete after ${event.duration} ms`);
  } else if (event.code === 'ERROR') {
    console.log(`Error thrown! Please fix this and try again:\n${event.error}\n`);
  } else if (event.code === 'FATAL') {
    console.error(`Fatal error!\n${event.error}\n`);
    server.close();
  }
});

server.listen(PORT, () => {
  console.log(`File server listening on port ${PORT}...`)
});
