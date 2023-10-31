import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const slug = params['blog']; // retrieve the "slug" param

  console.log('slug', slug);

  return {
    slug,
  };
};