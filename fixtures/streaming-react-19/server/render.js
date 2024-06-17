/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from '../src/App';
import { DataProvider } from '../src/data';
import { ABORT_DELAY, API_DELAY } from './delays';

// In a real setup, you'd read it from webpack build stats.
let assets = {
  'main.js': '/main.js',
  'main.css': '/main.css',
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = function render(url, res) {
  // The new wiring is a bit more involved.
  res.socket.on('error', error => {
    console.error('Fatal', error);
  });
  let didError = false;

  const testPromise = sleep(API_DELAY).then(() => {
    return ['test 1', 'test 2', 'test 3'];
  });

  const {pipe, abort} = renderToPipeableStream(
    <DataProvider data={testPromise}>
      <App assets={assets} />
    </DataProvider>,
    {
      bootstrapScripts: [assets['main.js']],
      onShellReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html');
        pipe(res);
      },
      onShellError() {
        res.statusCode = 500;
        res.send('<!doctype><p>Error</p>');
      },
      onError(x) {
        didError = true;
        console.error(x);
      },
    }
  );

  // Abandon and switch to client rendering if enough time passes.
  // Try lowering this to see the client recover.
  setTimeout(abort, ABORT_DELAY);
};
