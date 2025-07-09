// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

function LoginFormModal({ show, onClose }) {
  const dispatch = useDispatch();


  // I believe these hold input and error state for the form
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // This is doing a reset of inputs/errors when modal opens
  useEffect(() => {
    if (show) {
      setCredential("");
      setPassword("");
      setErrors({});
    }
  }, [show]);

  // This is doing the close behavior
  const handleClose = () => {
    onClose();
  };

  // This is doing form submission to login a user
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.login({ credential, password }))
      .then(() => handleClose())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ credential: "The provided credentials were invalid" });
        }
      });
  };

  // This is doing login as demo user
  const handleDemoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.loginDemo())
      .then(() => {
        handleClose();
        // Navigate to home page after successful login
        window.location.href = '/';
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  // I believe this disables the login button if inputs are invalid
  const isDisabled = credential.length < 4 || password.length < 6;

  // This is doing conditional rendering of the modal
  if (!show) return null;

  return (
    <div className="login-modal show">
      <div className="login-modal-content">
        <button className="close-modal" onClick={handleClose}>&times;</button>
        <h2>Log In</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username or Email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              className={credential.length > 0 && credential.length < 4 ? 'invalid-input' : ''}
            />
            {credential.length > 0 && credential.length < 4 && (
              <p className="input-warning">Username must be at least 4 characters</p>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={password.length > 0 && password.length < 6 ? 'invalid-input' : ''}
            />
            {password.length > 0 && password.length < 6 && (
              <p className="input-warning">Password must be at least 6 characters</p>
            )}
          </div>

          {errors.credential && <p className="error">{errors.credential}</p>}
          {errors.password && <p className="error">{errors.password}</p>}

          <div className="button-group">
            <button type="submit" disabled={isDisabled}>Log In</button>
            <button type="button" onClick={handleDemoLogin}>Log in as Demo User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
