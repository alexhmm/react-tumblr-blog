import { useEffect, useState } from 'react';

// Components
import { Post } from '../../components/Post/Post';

// Hooks
import { usePosts } from '../../hooks/use-posts.hook';

// Models
import { PostsResponse } from '../../models/posts-response.interface';

// Styles
import './Posts.sass';

export const Posts = () => {
  const { postsGet } = usePosts();

  // Component state
  const [posts, setPosts] = useState<PostsResponse | undefined>(undefined);

  useEffect(() => {
    postsGet(20, 0).then((result) => setPosts(result));
    // eslint-disable-next-line
  }, []);

  return (
    <article className="posts">
      {posts && posts.posts.map((post) => <Post key={post.id} post={post} />)}
    </article>
  );
};
