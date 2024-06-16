/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {use, useContext} from 'react';
import { useData, DataContext } from './data';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// const test = sleep(5000).then(() => {
//   return ['test 1', 'test 2', 'test 3'];
// });


// export default function Comments({ promise }) {
export default function Comments() {
  const comments = useData();
  // const ctx = use(DataContext);
  // const comments = use(sleep(5000).then(() => {
  //   return ['test 1', 'test 2', 'test 3'];
  // }));
  // const dataPromise = useContext(DataContext);
  // const comments = use(dataPromise);

  console.log('comments', comments);

  return (
    <>
      {comments.map((comment, i) => (
        <p className="comment" key={i}>
          {comment}
        </p>
      ))}
    </>
  );
}
