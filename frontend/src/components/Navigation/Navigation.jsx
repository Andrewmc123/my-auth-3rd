import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <NavLink to="/" className="logo-link">
          <img src="/favicon.ico" alt="Logo" className="logo-img" />
        </NavLink>

        {sessionUser && (
          <NavLink to="/spots/new" className="create-spot-btn">
            Create a New Spot
          </NavLink>
        )}
      </div>

      <div className="nav-right">
        {isLoaded && (
          <ProfileButton 
            user={sessionUser} 
            showLogin={showLogin} 
            showSignup={showSignup} 
            setShowLogin={setShowLogin} 
            setShowSignup={setShowSignup}
          />
        )}
      </div>

      <LoginFormModal show={showLogin} onClose={() => {
        setShowLogin(false);
        navigate('/');
      }} />
      <SignupFormModal show={showSignup} onClose={() => {
        setShowSignup(false);
        navigate('/');
      }} />
    </nav>
  );
}

export default Navigation;
