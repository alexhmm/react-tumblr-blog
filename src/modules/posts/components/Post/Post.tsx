import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

// Components
import { Zoomable } from '../../../../shared/ui/Zoomable/Zoomtable';

// Hooks
import { useBreakpoints } from '../../../../shared/hooks/use-breakpoints.hook';

// Models
import { Post as IPost } from '../../models/posts.types';

// Stores
import {
  SharedState,
  useSharedStore,
} from '../../../../shared/stores/use-shared-store.hook';

// Styles
import styles from './Post.module.scss';

type PostProps = {
  post: IPost;
};

export const Post = (props: PostProps) => {
  const { smDown, smUp, lgDown, lgUp } = useBreakpoints();

  // Component state
  const [loaded, setLoaded] = useState<boolean>(false);
  const [src, setSrc] = useState<string>('');

  // Shared store state
  const [touchId, setTouch] = useSharedStore((state: SharedState) => [
    state.touchId,
    state.setTouchId,
  ]);

  // Responsive image source
  useEffect(() => {
    if (smDown || smUp || lgDown) {
      if (smDown) {
        setSrc(props.post.photos[0]?.alt_sizes[2].url);
      } else if (smUp && lgDown) {
        setSrc(props.post.photos[0]?.alt_sizes[1].url);
      } else if (lgUp) {
        setSrc(props.post.photos[0]?.alt_sizes[0].url);
      }
    }
  }, [props, smDown, smUp, lgDown, lgUp]);

  return (
    <Box
      className={styles['post']}
      sx={{
        ':hover #post-overlay': {
          opacity: 1,
        },
        opacity: loaded ? 1 : 0,
        zIndex: touchId === props.post.id_string ? 50 : 10,
      }}
    >
      <Zoomable
        releaseAnimationTimeout={250}
        onTouchStart={() => setTouch(props.post.id_string)}
        onTouchEnd={() => setTouch(undefined)}
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
          className={styles['post-image']}
          src={src}
          onLoad={() => setLoaded(true)}
        />
      </Zoomable>
    </Box>
  );
};
