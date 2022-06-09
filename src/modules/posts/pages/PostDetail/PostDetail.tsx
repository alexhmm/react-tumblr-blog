import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HashtagIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import * as dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

// Components
import { HeroIconTextButton } from '../../../../shared/ui/HeroIconTextButton/HeroIconTextButton';
import { Zoomable } from '../../../../shared/ui/Zoomable/Zoomtable';

// Hooks
import { useBreakpoints } from '../../../../shared/hooks/use-breakpoints.hook';
import { usePosts } from '../../hooks/use-posts.hook';

// Models
import { Post as IPost } from '../../models/posts.types';

// Stores
import {
  SharedState,
  useSharedStore,
} from '../../../../shared/stores/use-shared-store.hook';

// Styles
import styles from './PostDetail.module.scss';

export const PostDetail = () => {
  const { lgDown, lgUp } = useBreakpoints();
  const navigate = useNavigate();
  const { id } = useParams();
  const { postByIdGet } = usePosts();

  // Component state
  const [date, setDate] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [post, setPost] = useState<IPost | undefined>(undefined);
  const [src, setSrc] = useState<string>('');
  const [touch, setTouch] = useState<boolean>(false);

  // Shared store state
  const [setPageTitle] = useSharedStore((state: SharedState) => [
    state.setPageTitle,
  ]);

  // Effect on component mount
  useEffect(() => {
    dayjs.extend(LocalizedFormat);
  }, []);

  // Get post by id
  useEffect(() => {
    const fetchPostById = async () => {
      if (id) {
        const postsResponse = await postByIdGet(id);
        setPost(postsResponse.posts[0]);
      }
    };

    fetchPostById();
    // eslint-disable-next-line
  }, [id]);

  // Responsive image source
  useEffect(() => {
    if (post) {
      setPageTitle({
        document: post.summary.toUpperCase(),
        text: post.summary.toUpperCase(),
      });
      if (lgDown || lgUp) {
        lgDown && setSrc(post.photos[0]?.alt_sizes[1].url);
        lgUp && setSrc(post.photos[0]?.alt_sizes[0].url);
      }
    }
    // eslint-disable-next-line
  }, [post, lgDown]);

  useEffect(() => {
    if (post) {
      // Set post date
      setDate(dayjs.unix(post.timestamp).format('LL'));
    }
  }, [post]);

  return (
    <>
      {post && (
        <div className={clsx(styles['post-detail'], 'page-image')}>
          <Box className={styles['post-detail-content']}>
            <Box
              className={styles['post-detail-content-src']}
              sx={{
                opacity: loaded ? 1 : 0,
                zIndex: touch ? 50 : 10,
              }}
            >
              <Zoomable
                releaseAnimationTimeout={250}
                onTouchStart={() => setTouch(true)}
                onTouchEnd={() => setTouch(false)}
              >
                <img
                  alt={post.caption}
                  src={src}
                  onLoad={() => setLoaded(true)}
                  className={styles['post-detail-content-src-image']}
                />
              </Zoomable>
            </Box>
            <Box
              className={styles['post-detail-content-data']}
              sx={{
                opacity: loaded ? 1 : 0,
              }}
            >
              {date && (
                <div className={styles['post-detail-content-data-header-date']}>
                  <span>{date}</span>
                  <span>{`${post.note_count} notes`}</span>
                </div>
              )}
              <div className={styles['post-detail-content-data-tags']}>
                {post.tags.map((tag) => (
                  <HeroIconTextButton
                    key={tag}
                    classes={styles['post-detail-content-data-tags-item']}
                    icon={<HashtagIcon />}
                    iconSize={16}
                    onClick={() => navigate(`/tagged/${tag}`)}
                  >
                    {tag}
                  </HeroIconTextButton>
                ))}
              </div>
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};
