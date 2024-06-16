/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {hydrateRoot} from 'react-dom/client';
import App from './App';

console.log(11111);

hydrateRoot(document, <App assets={window.assetManifest} />);
