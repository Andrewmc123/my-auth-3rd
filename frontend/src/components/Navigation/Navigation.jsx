// frontend/src/components/Navigation/Navigation.jsx
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

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
          <ProfileButton user={sessionUser} />
        )}
      </div>
    </nav>
  );
}

export default Navigation;
