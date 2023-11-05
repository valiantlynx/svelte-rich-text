import { getImageURL, serializeNonPOJOs } from '$lib/utils/api';

export const prerender = true;

export const load = async (event) => {
  const blogs = await event.locals.pb.collection('blogs').getList(1, 7,{
    sort: 'created',
    expand: 'author'
  });

  for (const item of blogs.items) {
    item.image = getImageURL(item.collectionId, item.id, item.image, 'thumb=200x100');
  }

  return {
    blogs: serializeNonPOJOs(blogs)
  };
};