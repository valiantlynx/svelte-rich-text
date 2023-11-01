/* eslint-disable no-console */
import type { PageLoad } from './$types';
import { pb, getImageURL } from '$lib/utils/api';

export const prerender = true;

export const load: PageLoad = async () => {
  const blogs = await pb.collection('blogs').getList(1, 20);

  for (const item of blogs.items) {
    item.image = getImageURL(item.collectionId, item.id, item.image);
  }

  return {
    blogs: blogs.items
  };
};