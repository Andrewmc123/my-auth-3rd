// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom'; // This helps create clickable links
import { useSelector } from 'react-redux'; // This helps us get user information
import ProfileButton from './ProfileButton'; // This shows the user's profile button
import './Navigation.css'; // This contains the styles for the navigation

// This component creates the navigation bar
function Navigation({ isLoaded }) {
  // This gets the current user from our Redux store
  const sessionUser = useSelector(state => state.session.user);

  return (
    // This creates an unordered list for our navigation items
    <ul>
      {/* This creates a link to the home page */}
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      
      {/* This shows the profile button only when the app is loaded */}
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

// Export the Navigation component so it can be used in other files
export default Navigation;