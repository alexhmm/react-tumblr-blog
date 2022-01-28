import { useEffect, useState } from 'react';
import { useLocation, useMatch } from 'react-location';

// Components
import { Post } from '../../components/Post/Post';

// Hooks
import { usePosts } from '../../hooks/use-posts.hook';

// Models
import { PostsResponse } from '../../models/posts.types';

// Styles
import './Posts.sass';

export const Posts = () => {
  const {
    params: { tag }
  } = useMatch();
  const { history } = useLocation();
  // const navigate = useNavigate();
  const { postsGet } = usePosts();

  // Component state
  const [posts, setPosts] = useState<PostsResponse | undefined>(undefined);

  useEffect(() => {
    postsGet(20, 0).then((result) => setPosts(result));
    console.log('params.tag', tag);
    // eslint-disable-next-line
  }, []);

  return (
    <article className="posts">
      <div onClick={() => history.go(-1)}>Back</div>
      {posts && posts.posts.map((post) => <Post key={post.id} post={post} />)}
    </article>
  );
};
