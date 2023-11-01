/* eslint-disable no-console */
import type { PageLoad } from './$types';
import { pb, getImageURL } from '$lib/utils/api';

export const prerender = true;

export const load: PageLoad = async () => {
  const blogs = await pb.collection('blogs').getList(1, 7,{
    sort: 'created',
    expand: 'author'
  });

  for (const item of blogs.items) {
    item.image = getImageURL(item.collectionId, item.id, item.image, 'thumb=200x100');
  }

  return {
    blogs: blogs.items
  };
};