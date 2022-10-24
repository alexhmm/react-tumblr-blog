import { memo, useEffect } from 'react';
import { Box } from '@mui/material';
import * as dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

// Models
import { Comment as IComment } from '../../models/posts.types';

// Styles
import styles from './Comment.module.scss';

type CommentProps = {
  comment: IComment;
};

const Comment = (props: CommentProps) => {
  // Effect on component mount
  useEffect(() => {
    dayjs.extend(LocalizedFormat);
  }, []);

  return (
    <div className={styles['comment']}>
      <div className={styles['comment-header']}>
        <div className={styles['comment-header-name']}>
          {props.comment.blog_name}
        </div>
        <Box
          className={styles['comment-header-timestamp']}
          sx={{ color: 'text.secondary' }}
        >
          {dayjs.unix(props.comment.timestamp).format('LLL')}
        </Box>
      </div>
      <div className={styles['comment-text']}>{props.comment.reply_text}</div>
    </div>
  );
};

export default memo(Comment);
