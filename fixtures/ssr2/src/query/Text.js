'use client'

import { forwardRef } from 'react';
// import { useSuspenseQuery } from '@tanstack/react-query'
import { useSuspenseQuery } from '@suspensive/react-query';
import { query } from './index'

export const Text = forwardRef(({ ms }, ref) => {
  const { data: text } = useSuspenseQuery(query.text(ms))

    console.log('Text', text);

  return (
    <p ref={ref}>
      result: {text}
    </p>
  )
});

Text.displayName = 'Text';
