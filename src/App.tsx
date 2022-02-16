import { BrowserRouter } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';

// Components
import Title from './shared/components/Title/Title';

// Hooks
import { useTheme } from './shared/hooks/use-theme.hook';

// Router
import { AppRouter } from './shared/router/AppRouter';

// Styles
import './App.scss';

function App() {
  const { themeGet } = useTheme();

  return (
    <ThemeProvider theme={themeGet()}>
      <Box bgcolor="background.default" color="text.primary" className="app">
        <BrowserRouter>
          <Title />
          <AppRouter />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
