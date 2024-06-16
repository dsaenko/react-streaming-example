import { queryOptions } from '@tanstack/react-query';

// const baseURL = (() => {
//   if (typeof window !== 'undefined') return ''
//   if (process.env.NEXT_PUBLIC_STREAMING_HTML_URL) return `https://${process.env.NEXT_PUBLIC_STREAMING_HTML_URL}`
//   return 'http://localhost:4100'
// })()

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const query = {
  text: (ms) =>
    queryOptions({
      queryKey: ['query.text', ms],
      queryFn: () => {
        return sleep(ms).then(() => {
          return `${new Date().toISOString()} success to get text waited after ${ms}ms`;
        });

        // return fetch(`${baseURL}/api/text?wait=${ms}`, {
        //   cache: 'no-store',
        // }).then(
        //   (res) =>
        //     res.json() as unknown as `${ReturnType<Date['toISOString']>} success to get text waited after ${TMs}ms`
        // );
      }
    }),
}
