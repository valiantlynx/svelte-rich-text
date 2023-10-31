/* eslint-disable no-console */
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
  const slug = event.params['blog'];
  const post = await event.fetch(`/md-content/${slug}/+page.svelte.md`);
  const markdown = await post.text();


    return {
        markdown
    };
};