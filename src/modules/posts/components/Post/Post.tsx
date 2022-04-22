import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

// Hooks
import { useBreakpoints } from '../../../../shared/hooks/use-breakpoints.hook';

// Models
import { Post as IPost } from '../../models/posts.types';

// Styles
import styles from './Post.module.scss';

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
      className={styles['post']}
      sx={{
        ':hover #post-overlay': {
          opacity: 1,
        },
        opacity: loaded ? 1 : 0,
      }}
    >
      <Link
        to={`/post/${props.post.id_string}`}
        className={styles['post-overlay']}
        id="post-overlay"
      >
        <Box
          className={styles['post-overlay-title']}
          sx={{
            backgroundColor: 'background.default',
            color: 'text.primary',
          }}
        >
          {props.post.summary.toUpperCase()}
        </Box>
      </Link>
      <img
        alt={props.post.caption}
        src={src}
        onLoad={() => setLoaded(true)}
        className={styles['post-image']}
      />
    </Box>
  );
};
