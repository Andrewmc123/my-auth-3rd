import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import LandingPage from './Pages/LandingPage'; 
import CreateSpotForm from './components/CreateSpotForm/CreateSpotForm';
import SpotDetailsPage from './Pages/SpotDetailsPage/SpotDetailsPage';
import ManageSpotsPage from './Pages/ManagaeSpotPage/ManageSpotPage'
import UpdateSpotForm from './Pages/UpdateSpotPage'
import ReviewsPage from './Pages/ManageReviewsPage/ManageReviewsPage'
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
        path:'/',
        element: <LandingPage />
      },
       {
        path: '/spots/new',
        element: <CreateSpotForm />
      },
      {
        path:'/spots/:spotId', 
        element: <SpotDetailsPage /> 
      }, 
      { path: '/spots/current',
        element: <ManageSpotsPage />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpotForm />
      },

      {
        path: '/reviews/current', 
        element: <ReviewsPage />
      },
    
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
