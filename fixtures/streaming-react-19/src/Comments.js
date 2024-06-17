/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { use, useContext } from 'react';
import { DataContext } from './data';

export default function Comments() {
  const dataPromise = useContext(DataContext);
  const comments = use(dataPromise);

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
