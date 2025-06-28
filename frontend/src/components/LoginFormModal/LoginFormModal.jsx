// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // I believe this disables the button until username/password length is valid
  const isDisabled = credential.length < 4 || password.length < 6;

  // I believe this resets the form on open/close
  useEffect(() => {
    setCredential("");
    setPassword("");
    setErrors({});
  }, []);

  if (sessionUser) return null;

  // I believe this handles login form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        } else {
          // This shows fallback error if backend doesn’t give specific message
          setErrors({ credential: "The provided credentials were invalid" });
        }
      });
  };

  // This logs in the demo user
  const handleDemoLogin = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ credential: "The provided credentials were invalid" });
        }
      });
  };

  return (
    <div className="login-form-modal">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="credential">Username or Email</label>
          <input
            type="text"
            id="credential"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors.credential && <p>{errors.credential}</p>}

        {/* This is the login submit button */}
        <button type="submit" disabled={isDisabled}>Log In</button>

        {/* This is the demo login button */}
        <button type="button" onClick={handleDemoLogin}>Log in as Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
