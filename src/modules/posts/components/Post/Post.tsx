import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { HeartIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

// Components
import { HeroIcon } from '../../../../shared/ui/HeroIcon/HeroIcon';

// Hooks
import { useBreakpoints } from '../../../../shared/hooks/use-breakpoints.hook';
import { usePosts } from '../../hooks/use-posts.hook';

// Models
import { Post as IPost } from '../../models/posts.types';

// Styles
import styles from './Post.module.scss';

type PostProps = {
  post: IPost;
};

export const Post = (props: PostProps) => {
  const { smDown, xxxxlDown } = useBreakpoints();
  const { postDetailLinkStrReplace } = usePosts();

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
        to={`/post/${props.post.id_string}${
          props.post.summary &&
          `/${postDetailLinkStrReplace(props.post.summary)}`
        }`}
        className={clsx(
          styles['post-overlay'],
          process.env.REACT_APP_VIEW_TYPE === 'Gallery'
            ? styles['post-gallery-overlay']
            : styles['post-list-overlay']
        )}
        id="post-overlay"
      >
        <div
          className={clsx(
            styles['post-overlay-data'],
            process.env.REACT_APP_VIEW_TYPE === 'Gallery'
              ? styles['post-gallery-overlay-data']
              : styles['post-list-overlay-data']
          )}
        >
          {props.post.summary && props.post.summary.length > 0 ? (
            <div
              className={clsx(
                styles['post-overlay-data-title'],
                styles['post-overlay-data-card']
              )}
            >
              {props.post.summary}
            </div>
          ) : (
            <div></div>
          )}
          {props.post.note_count > 0 && (
            <div
              className={clsx(
                styles['post-overlay-data-notes'],
                styles['post-overlay-data-card'],
                process.env.REACT_APP_VIEW_TYPE === 'Gallery'
                  ? styles['post-gallery-overlay-notes']
                  : styles['post-list-overlay-notes']
              )}
            >
              <HeroIcon
                classes={styles['post-overlay-data-notes-icon']}
                color="white"
              >
                <HeartIcon />
              </HeroIcon>
              <div>{props.post.note_count}</div>
            </div>
          )}
        </div>
      </Link>
      <img
        alt={props.post.summary}
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
