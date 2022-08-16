import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

// Components
import { Loader } from '../../../../shared/ui/Loader/Loader';
import { Post } from '../../components/Post/Post';

// Hooks
import { usePosts } from '../../hooks/use-posts.hook';

// Stores
import { usePostsStore } from '../../stores/use-posts.store';
import { useSharedStore } from '../../../../shared/stores/use-shared-store.hook';

// Styles
import styles from './Posts.module.scss';
import clsx from 'clsx';

export const Posts = () => {
  const { tagged } = useParams();
  const { postsGet } = usePosts();

  // Component state
  const [init, setInit] = useState<boolean>(false); // Prevent InfiniteScroll next function on navigate back. Show no founds text after search

  // Posts store state
  const [
    limit,
    loading,
    postElements,
    posts,
    tag,
    addPosts,
    setLoading,
    setPost,
    setPostElements,
    setPosts,
    setTag,
  ] = usePostsStore((state) => [
    state.limit,
    state.loading,
    state.postElements,
    state.posts,
    state.tag,
    state.addPosts,
    state.setLoading,
    state.setPost,
    state.setPostElements,
    state.setPosts,
    state.setTag,
  ]);

  // Settings store state
  const [setPageTitle] = useSharedStore((state) => [state.setPageTitle]);

  // Reset post (detail)
  useEffect(() => {
    setPost(null);
    // Timeout: Prevent InfiniteScroll next function on navigate back
    setTimeout(() => {
      setInit(true);
    }, 250);
    // eslint-disable-next-line
  }, []);

  // Detect post changes
  useEffect(() => {
    // Set posts
    const fetchPosts = async () => {
      setPosts(await postsGet(limit, 0, tagged), tagged ?? '/');
    };

    // On existing object add further posts
    // Check if there are more loaded posts than rendered elements
    if (
      posts[tagged ? tagged : '/']?.posts?.length > 0 &&
      (posts[tagged ? tagged : '/'].posts.length >
        postElements[tagged ? tagged : '/']?.length ||
        !postElements[tagged ? tagged : '/'])
    ) {
      const setElements = async () => {
        // Set start index to push new react elements (posts) into view
        let startIndex = 0;
        // Check if there are existing post elements of the current tag
        // Set start index by post elements length
        if (postElements[tagged ? tagged : '/']?.length > 0) {
          startIndex = postElements[tagged ? tagged : '/'].length;
        }

        // Check if new posts were added
        if (posts[tagged ? tagged : '/']?.posts?.length > startIndex) {
          setLoading(true);
          const elements: JSX.Element[] = [];

          // Iterate from calculated start index
          for (
            let i = startIndex > -1 ? startIndex : 0;
            i < posts[tagged ? tagged : '/'].posts.length;
            i++
          ) {
            // Add posts if photo type
            if (posts[tagged ? tagged : '/'].posts[i].type === 'photo') {
              elements.push(
                <Post key={i} post={posts[tagged ? tagged : '/'].posts[i]} />
              );
              if (postElements[tagged ? tagged : '/']) {
                // Concat react nodes to existing elements object
                setPostElements(
                  postElements[tagged ? tagged : '/'].concat(elements),
                  tagged ?? '/'
                );
              } else {
                // Insert new post elements object
                setPostElements(elements, tagged ?? '/');
              }
            }
            // Set loading to false after last element is rendered
            if (i === posts[tagged ? tagged : '/'].posts.length - 1) {
              setLoading(false);
            }
          }
        }
      };
      setElements();
    } else if (!posts[tagged ? tagged : '/']?.posts) {
      setLoading(true);
      fetchPosts();
    }
    // eslint-disable-next-line
  }, [postElements, posts, tagged]);

  // Set store tag on state change
  useEffect(() => {
    if (tagged !== tag) {
      setTag(tagged ?? '/');
    } else if (tagged === undefined) {
      setTag(null);
    }

    // Set document title based on tag
    !tagged && setPageTitle(null);
    tagged && setPageTitle({ document: `#${tagged}`, text: `#${tagged}` });
    // eslint-disable-next-line
  }, [tagged]);

  /**
   * Handler to add posts.
   */
  const onAddPosts = useCallback(async () => {
    if (
      init &&
      posts[tagged ? tagged : '/'] &&
      posts[tagged ? tagged : '/'].total >=
        posts[tagged ? tagged : '/'].posts.length
    ) {
      setLoading(true);
      addPosts(
        await postsGet(
          limit,
          posts[tagged ? tagged : '/'].posts.length,
          tagged
        ),
        limit,
        posts[tagged ? tagged : '/'].posts.length,
        tagged ?? '/'
      );
    }
    // eslint-disable-next-line
  }, [init, limit, posts, tagged]);

  return (
    <InfiniteScroll
      dataLength={postElements[tagged ? tagged : '/']?.length || 0}
      hasMore
      loader={null}
      next={onAddPosts}
      scrollThreshold={1}
      className={clsx(
        process.env.REACT_APP_VIEW_TYPE === 'Gallery'
          ? styles['posts-gallery']
          : styles['posts-list'],
        'page-image',
        process.env.REACT_APP_VIEW_TYPE === 'Gallery'
          ? 'page-image-gallery'
          : 'page-image-list'
      )}
    >
      {postElements[tagged ?? '/']}
      <Box
        sx={{ opacity: loading ? 0.5 : 0 }}
        className={styles['posts-loading']}
      >
        <Loader />
      </Box>
      {!postElements[tagged ?? '/'] && init && tagged && !loading && (
        <Box className={styles['posts-empty']}>No posts found: #{tagged}</Box>
      )}
    </InfiniteScroll>
  );
};
