#!/usr/bin/env node

'use strict';

const http = require('http');
const { Server } = require('node-static');
const rollup = require('rollup');
const puppeteer = require('puppeteer-core');
const config = require('../rollup.config');

const PORT = 8080;

(async () => {
  /* Using Puppeteer to speed up initial
   * development. TODO: remove when done? */
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    headless: false,
  });

  const page = await browser.newPage();

  const fileServer = new Server('./dist', {
    headers: {
      'Cache-Control': 'no-cache, must-revalidate',
    },
  });

  const serveFile = fileServer.serve.bind(fileServer);
  const server = http.createServer(serveFile);
  const watcher = rollup.watch(config(false));

  watcher.on('event', event => {
    if (event.code === 'BUNDLE_START') {
      console.log('Changes detected. Bundling...');
    } else if (event.code === 'BUNDLE_END') {
      console.log(`Bundling complete after ${event.duration} ms`);
      page.reload();
    } else if (event.code === 'ERROR') {
      console.log(
        `Error thrown! Please fix this and try again:\n${event.error}\n`,
      );
    } else if (event.code === 'FATAL') {
      console.error(`Fatal error!\n${event.error}\n`);
      server.close();
    }
  });

  server.listen(PORT, () => {
    console.log(`File server listening on port ${PORT}...`);
    page.goto(`http://localhost:${PORT}`);
  });
})();
