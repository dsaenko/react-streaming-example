/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createContext, useContext } from 'react';

// Note: this file does not demonstrate a real data fetching strategy.
// We only use this to simulate data fetching happening on the server
// while the cache is populated on the client. In a real app, you would
// instead use a data fetching library or Server Components for this.

export const DataContext = createContext(null);

export function DataProvider({children, data}) {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useData() {
  let data;
  const ctx = useContext(DataContext);

  if (ctx !== null) {
    // This context is only provided on the server.
    // It is here to simulate a suspending data fetch.
    data = ctx.read();
  }

  return data;
}
