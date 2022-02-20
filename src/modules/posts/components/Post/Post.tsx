import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

// Hooks
import { useBreakpoints } from '../../../../shared/hooks/use-breakpoints.hook';

// Models
import { Post as IPost } from '../../models/posts.types';

// Styles
import './Post.scss';

type PostProps = {
  post: IPost;
};

export const Post = (props: PostProps) => {
  const { lgDown } = useBreakpoints();

  // Component state
  const [loaded, setLoaded] = useState<boolean>(false);
  const [src, setSrc] = useState<string>('');

  // Responsive image source
  useEffect(() => {
    lgDown && setSrc(props.post.photos[0]?.alt_sizes[1].url);
    !lgDown && setSrc(props.post.photos[0]?.alt_sizes[0].url);
  }, [props, lgDown]);

  return (
    <Box
      className="post"
      sx={{
        opacity: loaded ? 1 : 0
      }}
    >
      <Box className="post-title">{props.post.summary.toUpperCase()}</Box>
      <img
        alt={props.post.caption}
        src={src}
        onLoad={() => setLoaded(true)}
        className="post-image"
      />
    </Box>
  );
};
