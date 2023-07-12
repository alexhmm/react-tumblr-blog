import { Post, PostBlocksFormatPhoto } from './posts.types';

/**
 * Utility function to get photo urls + photo sizes by body html string.
 * @param body Body html string
 * @returns PostBlocksFormat array
 */
export const getBlocksPostFormatPhotos = (
  body: string
): PostBlocksFormatPhoto[] => {
  const postBlocksFormatPhotos: PostBlocksFormatPhoto[] = [];

  const urlRegex = new RegExp(
    // eslint-disable-next-line
    '(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))',
    'g'
  );

  const matchedUrls = body.match(urlRegex);

  if (matchedUrls) {
    for (const url of matchedUrls) {
      const postBlocksFormat: PostBlocksFormatPhoto = {
        size: getPhotoSize(url),
        url: url.replace(' ', ''),
      };
      postBlocksFormatPhotos.push(postBlocksFormat);
    }
  }

  return postBlocksFormatPhotos;
};

/**
 * Utility function to get photo size by url string.
 * @param url URL
 * @returns Photo size
 */
const getPhotoSize = (url: string): number => {
  if (url.includes('s400x600')) {
    return 400;
  } else if (url.includes('s500x750')) {
    return 500;
  } else if (url.includes('s540x810')) {
    return 540;
  } else if (url.includes('s640x960')) {
    return 640;
  } else if (url.includes('s1280x1920')) {
    return 1280;
  } else if (url.includes('s2048x3072')) {
    return 2048;
  }
  return 250;
};

/**
 * Get Post component image source by post object and breakpoints
 * @param post Post
 * @param smDown SmDown breakpoint
 * @param xxxxlDown Xxxxl breakpoint
 * @returns Post component image source
 */
export const getPostImgSrc = (
  post: Post,
  smDown: boolean,
  xxxxlDown: boolean
): string | undefined => {
  if (post.is_blocks_post_format && post.body) {
    // Check for photos in new blocks post format
    const postBlocksFormatPhotos = getBlocksPostFormatPhotos(post.body);
    if (process.env.REACT_APP_VIEW_TYPE === 'List') {
      if (smDown) {
        return postBlocksFormatPhotos.find((photo) => photo.size === 640)?.url;
      } else {
        return postBlocksFormatPhotos.find((photo) => photo.size === 2048)?.url;
      }
    }
    if (process.env.REACT_APP_VIEW_TYPE === 'Gallery') {
      if (xxxxlDown) {
        return postBlocksFormatPhotos.find((photo) => photo.size === 640)?.url;
      } else {
        return postBlocksFormatPhotos.find((photo) => photo.size === 1280)?.url;
      }
    }
  } else {
    // Check for photos in legacy post format
    if (process.env.REACT_APP_VIEW_TYPE === 'List') {
      return smDown
        ? post.photos[0]?.alt_sizes[2].url
        : post.photos[0]?.alt_sizes[0].url;
    }
    if (process.env.REACT_APP_VIEW_TYPE === 'Gallery') {
      return xxxxlDown
        ? post.photos[0]?.alt_sizes[2].url
        : post.photos[0]?.alt_sizes[1].url;
    }
  }
};

/**
 * Get PostDetail component image source by post object and breakpoints.
 * @param post Post
 * @param lgDown LgDown breakpoint
 * @returns PostDetail component image source
 */
export const getPostDetailImgSrc = (
  post: Post,
  lgDown: boolean
): string | undefined => {
  if (post.is_blocks_post_format && post.body) {
    const postBlocksFormatPhotos = getBlocksPostFormatPhotos(post.body);

    if (lgDown) {
      return postBlocksFormatPhotos.find((photo) => photo.size === 2048)?.url;
    } else {
      return postBlocksFormatPhotos.find((photo) => photo.size === 1280)?.url;
    }
  } else {
    return lgDown
      ? post.photos[0]?.alt_sizes[1].url
      : post.photos[0]?.alt_sizes[0].url;
  }
};
