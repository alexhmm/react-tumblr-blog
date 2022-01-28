import { Outlet, ReactLocation, Router } from 'react-location';

// Components
import Title from './shared/components/Title/Title';

// Router
import { routes } from './shared/router/routes';

// Styles
import './App.sass';

function App() {
  const location = new ReactLocation();

  return (
    <>
      <Router location={location} routes={routes}>
        <Title />
        <Outlet />
      </Router>
    </>
  );
}

export default App;
