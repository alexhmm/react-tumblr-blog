import { Box, Divider } from '@mui/material';
import {
  Fragment,
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { HashtagIcon } from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import * as dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

// Components
import { HeroIcon } from '../../../../shared/ui/HeroIcon/HeroIcon';
import { HeroIconTextButton } from '../../../../shared/ui/HeroIconTextButton/HeroIconTextButton';
import { Loader } from '../../../../shared/ui/Loader/Loader';
import { Zoomable } from '../../../../shared/ui/Zoomable/Zoomtable';

// Hooks
import { useBreakpoints } from '../../../../shared/hooks/use-breakpoints.hook';
import { usePosts } from '../../hooks/use-posts.hook';

// Models
import {
  Comment as IComment,
  Note,
  Post as IPost,
} from '../../models/posts.types';

// Stores
import { useSharedStore } from '../../../../shared/stores/use-shared-store.hook';

// Styles
import styles from './PostDetail.module.scss';

// Lazy-load components
const Comment = lazy(() => import('../../components/Comment/Comment'));

type TagProps = {
  tag: string;
};

const Tag = (props: TagProps) => {
  return (
    <Link to={`/tagged/${props.tag}`}>
      <HeroIconTextButton
        key={props.tag}
        classes={styles['tag']}
        icon={<HashtagIcon />}
        iconSize={16}
      >
        {props.tag}
      </HeroIconTextButton>
    </Link>
  );
};

const PostDetail = () => {
  const { lgDown, lgUp } = useBreakpoints();
  const { id } = useParams();
  const { notesGet, postByIdGet } = usePosts();

  // Component state
  const [comments, setComments] = useState<IComment[]>([]);
  const [date, setDate] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [post, setPost] = useState<IPost | undefined>(undefined);
  const [src, setSrc] = useState<string>('');
  const [touch, setTouch] = useState<boolean>(false);

  // Shared store state
  const [setPageTitle] = useSharedStore((state) => [state.setPageTitle]);

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

      // Fetch notes if note count is bigger than 0
      const fetchNotes = async () => {
        if (post.id_string) {
          const notesResponse = await notesGet(post.id_string);
          onNotesResponse(notesResponse.notes);
        }
      };

      if (post.note_count > 0) {
        fetchNotes();
      }
    }
    // eslint-disable-next-line
  }, [post]);

  // ######### //
  // CALLBACKS //
  // ######### //

  /**
   * Handler to display comments on notes response.
   * @param notes Note array
   */
  const onNotesResponse = useCallback((notes: Note[]) => {
    const cmmnts: IComment[] = [];
    for (const note of notes) {
      note.reply_text &&
        note.type === 'reply' &&
        cmmnts.push({
          id: notes.indexOf(note),
          blog_name: note.blog_name,
          blog_uuid: note.blog_uuid,
          reply_text: note.reply_text,
          timestamp: note.timestamp,
        });
    }
    setComments(cmmnts);
  }, []);

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
                <div className={styles['post-detail-content-data-header']}>
                  <Box
                    className={styles['post-detail-content-data-header-date']}
                    sx={{ color: 'text.secondary' }}
                  >
                    {date}
                  </Box>
                  {post.note_count > 0 && (
                    <div
                      className={
                        styles['post-detail-content-data-header-notes']
                      }
                    >
                      <HeroIcon
                        classes={
                          styles['post-detail-content-data-header-notes-icon']
                        }
                      >
                        <HeartIcon />
                      </HeroIcon>
                      <div>{post.note_count}</div>
                    </div>
                  )}
                </div>
              )}
              <div className={styles['post-detail-content-data-tags']}>
                {post.tags.map((tag, index: number) => {
                  if (!process.env.REACT_APP_TAGS_EXCLUDE?.includes(tag)) {
                    return <Tag key={index} tag={tag} />;
                  }
                  return null;
                })}
              </div>
            </Box>
            {loaded && comments.length > 0 && (
              <>
                <div className={styles['post-detail-content-comments']}>
                  <Divider className="mb-4" />
                  {comments.map((comment, index: number) => (
                    <Fragment key={index}>
                      <Suspense fallback={<Loader />}>
                        <Comment key={index} comment={comment} />
                      </Suspense>
                    </Fragment>
                  ))}
                </div>
              </>
            )}
          </Box>
        </div>
      )}
    </>
  );
};

export default memo(PostDetail);
