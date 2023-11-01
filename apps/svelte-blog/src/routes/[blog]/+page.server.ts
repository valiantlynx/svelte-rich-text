import { getImageURL, serializeNonPOJOs } from '$lib/utils/api';

export const prerender = true;

export const load = async (event) => {
  const slug = event.params['blog'];
  const blog = await event.locals.pb.collection('blogs').getFirstListItem(`slug="${slug}"`, {});
  blog.image = getImageURL(blog.collectionId, blog.id, blog.image, 'thumb=200x200');

  return {
    blog: serializeNonPOJOs(blog)
  };
};