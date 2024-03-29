import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Box, StyledEngineProvider, ThemeProvider } from '@mui/material';

// Components
import { Menu } from './shared/components/Menu/Menu';
import { Search } from './shared/components/Search/Search';
import { Title } from './shared/components/Title/Title';

// Hooks
import { useShared } from './shared/hooks/use-shared.hook';
import { useTheme } from './shared/hooks/use-theme.hook';

// Router
import { AppRouter } from './shared/router/AppRouter';

// Stores
import { useSharedStore } from './shared/stores/use-shared-store.hook';

// Styles
import './App.scss';

// Utils
import './shared/utils/fa';

function App() {
  const { appMetaDataSet } = useShared();
  const { themeGet } = useTheme();

  // Shared store state
  const [theme] = useSharedStore((state) => [state.theme]);

  // Set meta data on application mount
  useEffect(() => {
    appMetaDataSet();
    // eslint-disable-next-line
  }, [theme]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themeGet()}>
        <Box bgcolor="background.default" color="text.primary" className="app">
          <BrowserRouter>
            <Title />
            <Menu />
            <Search />
            <AppRouter />
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
