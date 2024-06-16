/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
// import {renderToString} from 'react-dom/server';
import {renderToPipeableStream } from 'react-dom/server';
import { renderToReadableStream} from 'react-dom/server.browser';
import App from '../src/App';
import {DataProvider} from '../src/data';
import {API_DELAY, ABORT_DELAY} from './delays';

// In a real setup, you'd read it from webpack build stats.
let assets = {
  'main.js': '/main.js',
  'main.css': '/main.css',
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = async function render(url, res) {
  // // The new wiring is a bit more involved.
  // res.socket.on('error', error => {
  //   console.error('Fatal', error);
  // });
  let didError = false;

  try {
    console.log('renderToReadableStream');

    const stream = await renderToReadableStream(
      <DataProvider>
        <App assets={assets} />
      </DataProvider>,
      {
        bootstrapScripts: [assets['main.js']],
        onError(error) {
          console.error(error);
          didError = true;
        }
      }
    );

    console.log('render', stream);

    return new Response(stream, {
      status: didError ? 500 : 200,
      headers: { 'Content-type': 'text/html' },
    });

  } catch (error) {
    return new Response('<h1>Something went wrong</h1>', {
      status: 500,
      headers: { 'Content-type': 'text/html' },
    });
  }
};

// Simulate a delay caused by data fetching.
// We fake this because the streaming HTML renderer
// is not yet integrated with real data fetching strategies.
function createServerData() {
  let done = false;
  let promise = null;
  return {
    read() {
      if (done) {
        return;
      }
      if (promise) {
        throw promise;
      }
      promise = new Promise(resolve => {
        setTimeout(() => {
          done = true;
          promise = null;
          resolve();
        }, API_DELAY);
      });
      throw promise;
    },
  };
}
