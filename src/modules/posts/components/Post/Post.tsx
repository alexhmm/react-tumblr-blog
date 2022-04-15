import { useEffect, useState } from 'react';
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
        opacity: loaded ? 1 : 0,
      }}
    >
      <div className={styles['post-title']}>
        {props.post.summary.toUpperCase()}
      </div>
      <img
        alt={props.post.caption}
        src={src}
        onLoad={() => setLoaded(true)}
        className={styles['post-image']}
      />
    </Box>
  );
};
