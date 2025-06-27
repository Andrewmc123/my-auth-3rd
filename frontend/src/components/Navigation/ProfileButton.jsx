import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
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
    closeMenu();
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
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
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