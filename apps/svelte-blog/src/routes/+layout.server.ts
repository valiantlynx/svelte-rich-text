import { loadFlash } from 'sveltekit-flash-message/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load = loadFlash(async (event) => {
  const data = { data: 'data' };
  return data;
});