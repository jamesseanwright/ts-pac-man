#!/usr/bin/env node

'use strict';

const http = require('http');
const { Server } = require('node-static');
const rollup = require('rollup');
const config = require('../rollup.config');

const PORT = 8080;

const watcher = rollup.watch(config);

watcher.on('event', ({ code, duration }) => {
  if (code === 'BUNDLE_START') {
    console.log('Changes detected. Bundling...');
  } else if (code === 'BUNDLE_END') {
    console.log(`Bundling complete after ${duration} ms`);
  }
});

const fileServer = new Server('./dist', {
  'Cache-Control': 'no-cache, must-revalidate'
});

const serveFile = fileServer.serve.bind(fileServer);

http.createServer(serveFile)
  .listen(PORT, () => {
    console.log(`File server listening on port ${PORT}...`)
  });
