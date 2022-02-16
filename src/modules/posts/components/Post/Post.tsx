// Models
import { Post as IPost } from '../../models/posts.types';

// Styles
import './Post.scss';

type PostProps = {
  post: IPost;
};

export const Post = (props: PostProps) => {
  return (
    <img
      alt={props.post.caption}
      className="post"
      src={props.post.photos[0]?.alt_sizes[0].url}
    />
  );
};
