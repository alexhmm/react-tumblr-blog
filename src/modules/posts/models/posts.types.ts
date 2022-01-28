import { Info } from '../../../shared/models/tumblr.types';

/**
 * Tumblr post interface.
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
