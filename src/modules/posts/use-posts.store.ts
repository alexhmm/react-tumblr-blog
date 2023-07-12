import { ReactNode } from 'react';
import create, { State } from 'zustand';

// Models
import { Post, PostsResponse } from './posts.types';

export interface PostsState extends State {
  limit: number;
  loading: boolean;
  navUsed: boolean;
  offset: number;
  post: Post | null;
  postElements: {
    [tag: string]: ReactNode[];
  };
  posts: {
    [tag: string]: {
      offset: number;
      posts: Post[];
      total: number;
    };
  };
  tag: string | null;
  total: number;
  addPosts: (
    postsResponse: PostsResponse,
    limit: number,
    offset: number,
    tag: string | null
  ) => void;
  setLoading: (loading: boolean) => void;
  setNavUsed: (navUsed: boolean) => void;
  setPost: (post: Post | null) => void;
  setPostElements: (postElements: ReactNode[], tag: string | null) => void;
  setPosts: (postsReponse: PostsResponse, tag: string) => void;
  setTag: (tag: string | null) => void;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  limit: process.env.REACT_APP_API_LIMIT
    ? parseInt(process.env.REACT_APP_API_LIMIT, 10)
    : 20,
  loading: true,
  navUsed: false,
  offset: 0,
  post: null,
  postElements: {},
  posts: {},
  tag: null,
  total: 0,
  addPosts: async (
    postsResponse: PostsResponse,
    limit: number,
    offset: number,
    tag: string | null
  ) => {
    if (postsResponse && postsResponse.posts.length > 0) {
      await set((state: PostsState) => ({
        ...state,
        posts: {
          ...state.posts,
          [tag ?? '/']: {
            ...state.posts[tag ?? '/'],
            offset: offset + limit,
            posts: state.posts[tag ?? '/'].posts.concat(postsResponse.posts),
          },
        },
        tag,
      }));
    }
    await set({ loading: false });
  },
  setLoading: (loading: boolean) => {
    set({ loading });
  },
  setNavUsed: (navUsed: boolean) => {
    if (navUsed) {
      set({ navUsed });
      setTimeout(() => {
        set({ navUsed: false });
      }, 250);
    }
  },
  setPost: async (post: Post | null) => {
    set({ post });
  },
  setPostElements: (postElements: ReactNode[], tag: string | null) =>
    set((state: PostsState) => ({
      ...state,
      postElements: {
        ...state.postElements,
        [tag ?? '/']: postElements,
      },
    })),
  setPosts: async (fetchPosts: PostsResponse, tag: string) => {
    // Fetch tumblr posts
    if (fetchPosts) {
      // Set initial posts for specific tag.
      set((state: PostsState) => ({
        ...state,
        loading: false,
        posts: {
          ...state.posts,
          // Create tag based object
          [tag ?? '/']: {
            offset: 0,
            posts: fetchPosts.posts,
            total: fetchPosts.total_posts,
          },
        },
        tag,
      }));
    }
  },
  setTag: (tag: string | null) => set({ tag }),
}));
