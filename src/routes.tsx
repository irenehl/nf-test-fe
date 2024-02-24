import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/home';
import { StadisticsPage } from './pages/stadistics';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/stats',
    element: <StadisticsPage />
  }
]);

export default Router;
