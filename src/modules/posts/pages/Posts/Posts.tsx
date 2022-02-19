import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

// Components
import { Post } from '../../components/Post/Post';

// Hooks
import { usePosts } from '../../hooks/use-posts.hook';

// Models
import { PostsResponse } from '../../models/posts.types';

// Styles
import './Posts.scss';

export const Posts = () => {
  const { tag } = useParams();
  const { postsGet } = usePosts();

  // Component state
  const [posts, setPosts] = useState<PostsResponse | undefined>(undefined);

  // Set posts (by tag) on init
  useEffect(() => {
    postsGet(20, 0, tag).then((result) => {
      setPosts(result);
    });
    // eslint-disable-next-line
  }, [tag]);

  return (
    <Box className="posts">
      {posts && posts.posts.map((post) => <Post key={post.id} post={post} />)}
    </Box>
  );
};
