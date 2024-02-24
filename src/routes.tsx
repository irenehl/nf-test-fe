import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/home';
import { StatisticsPage } from './pages/statistics';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/stats',
    element: <StatisticsPage />,
  },
]);

export default Router;
