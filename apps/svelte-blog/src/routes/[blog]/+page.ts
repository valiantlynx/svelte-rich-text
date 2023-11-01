/* eslint-disable no-console */
import type { PageLoad } from './$types';
import { pb, getImageURL } from '$lib/utils/api';

export const prerender = true;

export const load: PageLoad = async (event) => {
  const slug = event.params['blog'];
  const blog = await pb.collection('blogs').getFirstListItem(`slug="${slug}"`, {});
  blog.image = getImageURL(blog.collectionId, blog.id, blog.image);

  return {
    blog
  };
};