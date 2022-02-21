import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';

// Components
import { Menu } from './shared/components/Menu/Menu';
import { Title } from './shared/components/Title/Title';

// Hooks
import { useSharedUtils } from './shared/hooks/use-shared-utils.hook';
import { useTheme } from './shared/hooks/use-theme.hook';

// Router
import { AppRouter } from './shared/router/AppRouter';

// Stores
import {
  SharedState,
  useSharedStore
} from './shared/stores/use-shared-store.hook';

// Styles
import './App.scss';

// Utils
import './shared/utils/fa';

function App() {
  const { appMetaDataSet } = useSharedUtils();
  const { themeGet } = useTheme();

  // Shared store state
  const [theme] = useSharedStore((state: SharedState) => [state.theme]);

  // Set meta data on application mount
  useEffect(() => {
    appMetaDataSet();
    // eslint-disable-next-line
  }, [theme]);

  return (
    <ThemeProvider theme={themeGet()}>
      <Box bgcolor="background.default" color="text.primary" className="app">
        <BrowserRouter>
          <Title />
          <Menu />
          <AppRouter />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
