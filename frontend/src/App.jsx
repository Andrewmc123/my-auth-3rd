import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import LandingPage from './components/LandingPage/LandingPage';
import SpotDetails from './components/Spots/SpotDetails';
import ManageSpots from './components/Spots/ManageSpots';
import CreateSpot from './components/Spots/CreateSpot';
import EditSpot from './components/Spots/EditSpot';
import SpotsIndex from './components/Spots/SpotsIndex';
import LoginFormPage from './components/Authentication/LoginFormPage';
import SignupFormPage from './components/Authentication/SignupFormPage';
import NotFound from './components/NotFound';
import * as sessionActions from './store/session';
import './styles/global.css';
import './styles/App.css';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/spots',
        element: <SpotsIndex />
      },
      {
        path: '/spots/new',
        element: <CreateSpot />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: '/spots/:spotId/edit',
        element: <EditSpot />
      },
      {
        path: '/manage/spots',
        element: <ManageSpots />
      },
      {
        path: '/login',
        element: <LoginFormPage />
      },
      {
        path: '/signup',
        element: <SignupFormPage />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
