import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { HeartIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

// Components
import { HeroIcon } from '../../../../shared/ui/HeroIcon/HeroIcon';

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
  const { smDown, xxxxlDown } = useBreakpoints();

  // Component state
  const [loaded, setLoaded] = useState<boolean>(false);
  const [src, setSrc] = useState<string>('');

  // Responsive image source (list view type)
  useEffect(() => {
    if (process.env.REACT_APP_VIEW_TYPE === 'List') {
      smDown && setSrc(props.post.photos[0]?.alt_sizes[2].url);
      !smDown && setSrc(props.post.photos[0]?.alt_sizes[0].url);
    }
  }, [props.post, smDown]);

  // Responsive image source (gallery view type)
  useEffect(() => {
    if (process.env.REACT_APP_VIEW_TYPE === 'Gallery') {
      xxxxlDown && setSrc(props.post.photos[0]?.alt_sizes[2].url);
      !xxxxlDown && setSrc(props.post.photos[0]?.alt_sizes[1].url);
    }
  }, [props.post, xxxxlDown]);

  return (
    <Box
      className={clsx(
        styles['post'],
        process.env.REACT_APP_VIEW_TYPE === 'Gallery'
          ? styles['post-gallery']
          : styles['post-list']
      )}
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
        <Box
          className={styles['post-overlay-notes']}
          sx={{
            backgroundColor: 'background.default',
            color: 'text.primary',
          }}
        >
          <HeroIcon classes={styles['post-overlay-notes-icon']}>
            <HeartIcon />
          </HeroIcon>
          <div>{props.post.note_count}</div>
        </Box>
      </Link>
      <img
        alt={props.post.caption}
        className={
          process.env.REACT_APP_VIEW_TYPE === 'Gallery'
            ? styles['post-gallery-image']
            : styles['post-list-image']
        }
        src={src}
        onLoad={() => setLoaded(true)}
      />
    </Box>
  );
};
