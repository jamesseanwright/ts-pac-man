#!/usr/bin/env node

'use strict';

const http = require('http');
const { Server } = require('node-static');
const rollup = require('rollup');
const config = require('../rollup.config');

const PORT = 8080;

const fileServer = new Server('./dist', {
  headers: {
    'Cache-Control': 'no-cache, must-revalidate',
  },
});

const serveFile = fileServer.serve.bind(fileServer);
const server = http.createServer(serveFile);
const watcher = rollup.watch(config(false));

watcher.on('event', event => {
  switch (event.code) {
    case 'BUNDLE_START':
      console.log('Changes detected. Bundling...');
      break;

    case 'BUNDLE_END':
      console.log(`Bundling complete after ${event.duration} ms`);
      break;

    case 'ERROR':
      console.log(
        `Error thrown! Please fix this and try again:\n${event.error}\n`,
      );

      break;

    case 'FATAL':
      console.error(`Fatal error!\n${event.error}\n`);
      server.close();
      break;
  }
});

server.listen(PORT, () => {
  console.log(`File server listening on port ${PORT}...`);
});
