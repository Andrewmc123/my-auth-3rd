import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { ReactIcon } from 'react-icons/ri';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="header">
      <div className="container">
        <div className="nav-content">
          <NavLink to="/" className="nav-link">
            <ReactIcon className="nav-logo" size={32} />
          </NavLink>
          <div className="nav-links">
            <NavLink to="/spots" className="nav-link">Vacation Rentals</NavLink>
            <NavLink to="/spots/new" className="nav-link">List Your Property</NavLink>
            <ProfileButton user={sessionUser} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
