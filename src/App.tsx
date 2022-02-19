import { BrowserRouter } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';

// Components
import { Menu } from './shared/components/Menu/Menu';
import { Title } from './shared/components/Title/Title';

// Hooks
import { useTheme } from './shared/hooks/use-theme.hook';

// Router
import { AppRouter } from './shared/router/AppRouter';

// Styles
import './App.scss';

// Utils
import './shared/utils/fa';

function App() {
  const { themeGet } = useTheme();

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
