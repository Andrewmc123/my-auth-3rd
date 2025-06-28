import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // This is used to redirect the user after logout
import { FaUserCircle } from 'react-icons/fa'; // This is the user icon that appears in the button
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem'; // This creates the menu items
import LoginFormModal from '../LoginFormModal/LoginFormModal'; // This is the login form
import SignupFormModal from '../SignupFormModal/SignupFormModal'; // This is the signup form
import '/src/index.css'
import './ProfileButton.css'

// This component creates the profile button and dropdown menu
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // This allows us to navigate to the home page
  const [showMenu, setShowMenu] = useState(false); // Controls whether the menu is visible
  const ulRef = useRef(); // Used to reference the menu element

  // This function toggles the menu visibility
  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevents clicks from bubbling up
    setShowMenu(!showMenu);
  };

  // This effect handles closing the menu when clicking outside
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // This function closes the menu
  const closeMenu = () => setShowMenu(false);

  // This function handles user logout
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu(); // This closes the menu
    navigate('/'); // This sends the user back to the home page
  };

  // This sets the class name for the dropdown menu
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle /> {/* Shows the user icon */}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            {/* This shows the greeting with the user's first name */}
            <li onClick={(e) => e.stopPropagation()}>Hello, {user.firstName}</li>

            {/* This shows the user's email */}
            <li onClick={(e) => e.stopPropagation()}>{user.email}</li>

            {/* This is the logout button */}
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            {/* This opens the login modal */}
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            {/* This opens the signup modal */}
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

// Export the component so it can be used in Navigation
export default ProfileButton;
