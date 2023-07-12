import { Info } from '../../shared/models/tumblr.types';

export interface Comment {
  id: number;
  blog_uuid: string;
  blog_name: string;
  reply_text: string;
  timestamp: number;
}

/**
 * Tumblr note interface
 */
export interface Note {
  avatar_shape: string;
  blog_name: string;
  blog_uuid: string;
  blog_url: string;
  can_block?: boolean;
  followed: boolean;
  formatting?: any[];
  reply_text?: string;
  timestamp: number;
  type: string;
}

export interface NotesResponse {
  notes: Note[];
}

/**
 * Tumblr post interface
 */
export interface Post {
  blog: {
    name: string;
    title: string;
    description: string;
    url: string;
    uuid: string;
    updated: number;
  };
  blog_name: string;
  body?: string;
  can_like: boolean;
  can_reblog: boolean;
  can_reply: boolean;
  can_send_in_message: boolean;
  caption: string;
  date: string;
  display_avatar: boolean;
  format: string;
  id: number;
  id_string: string;
  image_permalink: string;
  is_blocks_post_format: string;
  note_count: number;
  photos: any[];
  post_url: string;
  reblog: {
    comment: string;
    tree_html: string;
  };
  reblog_key: string;
  recommended_color?: any;
  recommended_source?: any;
  short_url: string;
  should_open_in_legacy: boolean;
  slug: string;
  state: string;
  summary: string;
  tags: string[];
  timestamp: number;
  trail: any;
  type: string;
}

export interface PostsResponse {
  blog: Info;
  posts: Post[];
  total_posts: number;
}

export interface PostBlocksFormatPhoto {
  size: number;
  url: string;
}
