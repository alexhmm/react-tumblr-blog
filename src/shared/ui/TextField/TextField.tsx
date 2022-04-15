import { useCallback, useState } from 'react';
import { Box, Input, InputAdornment } from '@mui/material';
import clsx from 'clsx';

// Components
import { IconButton } from '../IconButton/IconButton';

// Styles
import styles from './TextField.module.scss';

type TextFieldProps = {
  classes?: string;
  padding?: string;
  placeholder?: string;
  reset?: boolean;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
};

export const TextField = (props: TextFieldProps) => {
  const [value, setValue] = useState<string>('');

  /**
   * Handler on text field change.
   */
  const onValueChange = useCallback(
    (value: string) => {
      setValue(value);
      props.onChange && props.onChange(value);
    },
    [props]
  );

  return (
    <Box
      sx={{
        '& .MuiInput-root': {
          width: '100%',
        },
        '& .MuiInput-root:after': {
          borderColor: 'text.primary',
        },
      }}
      className={clsx(styles['text-field'], props.classes && props.classes)}
    >
      <Input
        endAdornment={
          props.reset &&
          value &&
          value.length > 0 && (
            <InputAdornment position="end">
              <IconButton
                classes={styles['text-field-reset']}
                icon={['fas', 'times']}
                onClick={() => onValueChange('')}
              />
            </InputAdornment>
          )
        }
        placeholder={props.placeholder ?? ''}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            props.onSubmit && props.onSubmit();
          }
        }}
      />
    </Box>
  );
};
