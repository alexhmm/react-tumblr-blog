import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Components
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
  const { id } = useParams();
  const { postByIdGet } = usePosts();

  // Component state
  const [loaded, setLoaded] = useState<boolean>(false);
  const [post, setPost] = useState<IPost | undefined>(undefined);
  const [src, setSrc] = useState<string>('');

  // Shared store state
  const [touchId, setPageTitle, setTouch] = useSharedStore(
    (state: SharedState) => [
      state.touchId,
      state.setPageTitle,
      state.setTouchId,
    ]
  );

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

  return (
    <>
      {post && (
        <div className={styles['post-detail-container']}>
          <Box
            className={styles['post-detail']}
            sx={{
              ':hover #post-detail-overlay': {
                opacity: 1,
              },
              opacity: loaded ? 1 : 0,
              zIndex: touchId === post.id_string ? 50 : 10,
            }}
          >
            <Zoomable
              releaseAnimationTimeout={250}
              onTouchStart={() => setTouch(post.id_string)}
              onTouchEnd={() => setTouch(undefined)}
            >
              <div
                className={styles['post-detail-overlay']}
                id="post-detail-overlay"
              >
                <Box
                  className={styles['post-detail-overlay-title']}
                  sx={{
                    backgroundColor: 'background.default',
                    color: 'text.primary',
                  }}
                >
                  {post.summary.toUpperCase()}
                </Box>
              </div>
              <img
                alt={post.caption}
                src={src}
                onLoad={() => setLoaded(true)}
                className={styles['post-detail-image']}
              />
            </Zoomable>
          </Box>
        </div>
      )}
    </>
  );
};
