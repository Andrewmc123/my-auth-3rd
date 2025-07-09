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
import LoginFormModal from './components/LoginFormModal/LoginFormModal'
import SignupFormModal from './components/SignupFormModal/SignupFormModal'


// This Layout component wraps all our pages and handles authentication
function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // This checks if the user is logged in when the app starts
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    // Layout component shows the navigation bar and the current page
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />} {/* Outlet shows the current page content */}
      <LoginFormModal />
      <SignupFormModal />
</>
  );
}

// This sets up all the routes in our application
const router = createBrowserRouter([
  {
    element: <Layout />, // All routes use the Layout component
    children: [
      // Home page route
      {
        path:'/',
        element: <LandingPage />
      },
      
      // Route to create a new spot
      {
        path: '/spots/new',
        element: <CreateSpotForm />
      },
      
      // Route to view a specific spot's details
      {
        path:'/spots/:spotId', 
        element: <SpotDetailsPage /> 
      }, 
      
      // Route to manage all your spots
      { path: '/spots/current',
        element: <ManageSpotsPage />
      },
      
      // Route to edit an existing spot
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpotForm />
      },

      // Route to manage your reviews
      {
        path: '/reviews/current', 
        element: <ReviewsPage />
      },
    ]
  }
]);

// The main App componenA that renders the router
function App() {
  return (
    // This component renders the entire application
    <>
      <RouterProvider router={router} />
    </>
  );
}

// Export the App component so it can be used in index.js
export default App;