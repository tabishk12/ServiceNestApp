import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@components/Layout';
import ErrorPage from '@components/Error';
import PrivateRoute from '@components/PrivateRoute';
import Login from '@components/LoginPage';
import Register from '@components/Register';
import { useSelector } from 'react-redux';

import { customerRoutes } from '@userComponent/customerRoutes';
import { providerRoutes } from '@providerComponent/ProviderRoutes';

function App() {
  const { userInfo } = useSelector((state) => state.auth); // Assuming role is in userInfo.role

  // Choose routes based on role
  let roleRoutes = [];
  if (userInfo?.role === 'provider') {
    roleRoutes = providerRoutes;
  } else if (userInfo?.role === 'customer') {
    roleRoutes = customerRoutes;
  }

  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        {
          path: '',
          element: <PrivateRoute />,
          children: roleRoutes
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
