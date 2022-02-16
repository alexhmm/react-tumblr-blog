import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

// Components
import { Post } from '../../components/Post/Post';

// Hooks
import { usePosts } from '../../hooks/use-posts.hook';

// Models
import { PostsResponse } from '../../models/posts.types';
import { Theme } from '../../../../shared/models/theme.enum';

// Stores
import useSharedStore, {
  SharedState
} from '../../../../shared/stores/use-shared-store.hook';

// Styles
import './Posts.scss';

export const Posts = () => {
  const navigate = useNavigate();
  const { tag } = useParams();
  const { postsGet } = usePosts();

  // Component state
  const [posts, setPosts] = useState<PostsResponse | undefined>(undefined);

  // Shared store state
  const [theme, setTheme] = useSharedStore((state: SharedState) => [
    state.theme,
    state.setTheme
  ]);

  // Set posts (by tag) on init
  useEffect(() => {
    postsGet(20, 0, tag).then((result) => {
      setPosts(result);
    });
    // eslint-disable-next-line
  }, [tag]);

  return (
    <Box className="posts">
      <Box sx={{ color: 'success.main' }} onClick={() => navigate('/about')}>
        Go to About Page
      </Box>
      <Box
        onClick={() =>
          setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light)
        }
      >
        Toggle theme
      </Box>
      {posts && posts.posts.map((post) => <Post key={post.id} post={post} />)}
    </Box>
  );
};
