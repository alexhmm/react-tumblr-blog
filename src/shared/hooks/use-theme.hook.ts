import { createTheme, Theme } from '@mui/material/styles';

// Models
import { Theme as ETheme } from '../models/theme.enum';

// Stores
import { SharedState, useSharedStore } from '../stores/use-shared-store.hook';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
    xxxl: true;
  }
  interface PaletteOptions {
    bg: {
      card: string;
    };
  }
}

const breakpoints = {
  values: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
    xxxl: 1920
  }
};

const typography = { fontFamily: "'Space Grotesk', sans-serif" };

export const themeDark = createTheme({
  breakpoints,
  palette: {
    background: {
      default: '#1f1f1f'
    },
    bg: {
      card: '#2b2b2b'
    },
    mode: 'dark'
  },
  typography
});

export const themeLight = createTheme({
  breakpoints,
  palette: {
    background: {
      default: '#fafafa'
    },
    bg: {
      card: '#f3f6f9'
    },
    mode: 'light'
  },
  typography
});

export const useTheme = () => {
  // Shared store state
  const [theme] = useSharedStore((state: SharedState) => [state.theme]);

  /**
   * Returns active mui theme.
   * @returns Active MUI theme
   */
  const themeGet = (): Theme => {
    switch (theme) {
      case ETheme.Dark:
        return themeDark;
      default:
        return themeLight;
    }
  };

  return {
    themeGet
  };
};
