import { Post as IPost } from '../../models/post.interface';

// Styles
import './Post.sass';

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
