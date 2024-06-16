/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Suspense, lazy, useMemo} from 'react';
import { Suspense as SuspensiveSuspense, Suspensive, SuspensiveProvider } from '@suspensive/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ErrorBoundary} from 'react-error-boundary';
import Html from './Html';
import Spinner from './Spinner';
import Layout from './Layout';
import NavBar from './NavBar';
import { Text } from './query/Text';

const Comments = lazy(() => import('./Comments' /* webpackPrefetch: true */));
const Sidebar = lazy(() => import('./Sidebar' /* webpackPrefetch: true */));
const Post = lazy(() => import('./Post' /* webpackPrefetch: true */));

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function App({assets}) {
  const suspensive = new Suspensive({
    defaultProps: {
      suspense: {
        fallback: <Spinner />,
        clientOnly: false,
      },
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000,
      },
    },
  });

  return (
    <Html assets={assets} title="Hello">
      <SuspensiveProvider value={suspensive}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Spinner />}>
            <ErrorBoundary FallbackComponent={Error}>
              <Content />
            </ErrorBoundary>
          </Suspense>
        </QueryClientProvider>
      </SuspensiveProvider>
    </Html>
  );
}

function Content() {
  // const testPromise = useMemo(() => {
  //   return sleep(5000).then(() => {
  //     return ['test 1', 'test 2', 'test 3'];
  //   });
  // }, []);

  console.log('render Content');

  return (
    <Layout>
      <NavBar />
      <aside className="sidebar">
        <Suspense fallback={<Spinner />}>
          <Sidebar />
        </Suspense>
      </aside>
      <article className="post">
        <Suspense fallback={<Spinner />}>
          <Post />
        </Suspense>
        <SuspensiveSuspense fallback={<Spinner />}>
          <Text ms={1500} />
        </SuspensiveSuspense>
        {/*<section className="comments">
          <h2>Comments</h2>
          <Suspense fallback={<Spinner />}>
            <Comments />
          </Suspense>
        </section>*/}
        <h2>Thanks for reading!</h2>
      </article>
    </Layout>
  );
}

function Error({error}) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{whiteSpace: 'pre-wrap'}}>{error.stack}</pre>
    </div>
  );
}
