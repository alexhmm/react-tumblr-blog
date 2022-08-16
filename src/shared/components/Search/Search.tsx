import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Input, InputAdornment } from '@mui/material';
import { SearchIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

// Components
import { HeroIcon } from '../../ui/HeroIcon/HeroIcon';
import { HeroIconButton } from '../../ui/HeroIconButton/HeroIconButton';

// Stores
import { useSharedStore } from '../../stores/use-shared-store.hook';

// Styles
import styles from './Search.module.scss';

export const Search = () => {
  const navigate = useNavigate();

  // Component state
  const [value, setValue] = useState<string>('');

  // User store state
  const [search, setSearch] = useSharedStore((state) => [
    state.search,
    state.setSearch,
  ]);

  // Refs
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  // Set search display and opacity on change
  useEffect(() => {
    if (search) {
      if (searchRef.current) {
        document.body.style.overflow = 'hidden';
        searchRef.current.style.display = 'flex';
        setTimeout(() => {
          if (searchRef.current) {
            searchRef.current.style.opacity = '1';
          }
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 10);
      }
    } else {
      if (searchRef.current) {
        searchRef.current.style.opacity = '0';
        setTimeout(() => {
          if (searchRef.current) {
            searchRef.current.style.display = 'none';
            document.body.style.overflow = 'initial';
          }
        }, 250);
      }
    }
  }, [search]);

  /**
   * Handler to submit search. Navigate to tagged posts.
   */
  const onSearchSubmit = useCallback(() => {
    if (value && value.length > 0) {
      navigate(`/tagged/${value}`);
      setSearch(false);
      setTimeout(() => {
        setValue('');
      }, 250);
    }
    // eslint-disable-next-line
  }, [value]);

  return (
    <Box
      className={clsx(styles['search'], 'page-common')}
      ref={searchRef}
      sx={{
        backgroundColor: 'background.paper',
        '& .MuiInput-root:after': { borderColor: 'text.primary' },
      }}
    >
      <div className={styles['search-close']}>
        <HeroIconButton onClick={() => setSearch(false)}>
          <XIcon />
        </HeroIconButton>
      </div>
      <Input
        autoFocus
        className={styles['search-text-field']}
        endAdornment={
          value &&
          value.length > 0 && (
            <InputAdornment position="end">
              <HeroIconButton
                classes={styles['search-text-field-icon']}
                onClick={() => setValue('')}
              >
                <XIcon />
              </HeroIconButton>
            </InputAdornment>
          )
        }
        inputRef={inputRef}
        placeholder={'Search'}
        startAdornment={
          <InputAdornment position="start">
            <HeroIcon
              color="text.secondary"
              classes={styles['search-text-field-icon']}
            >
              <SearchIcon />
            </HeroIcon>
          </InputAdornment>
        }
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            onSearchSubmit();
          }
        }}
      />
    </Box>
  );
};
