import { stringify } from 'query-string';

// Models
import { PostsResponse } from '../models/posts.types';

export const usePosts = () => {
  /**
   * GET posts.
   * @param limit Limit
   * @param offset Offset
   * @param tag Tag
   * @returns PostsResponse
   */
  const postsGet = async (
    limit: number,
    offset: number,
    tag?: string
  ): Promise<PostsResponse> => {
    const params = {
      api_key: process.env.REACT_APP_API_KEY,
      limit: limit ?? 20,
      offset,
      tag,
      type: 'photo'
    };

    const url = `${process.env.REACT_APP_API_URL}/posts/?${stringify(params)}`;

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        return data.response;
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        return null;
      });
  };

  return { postsGet };
};
