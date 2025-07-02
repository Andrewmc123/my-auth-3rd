// frontend/src/components/LoginFormModal/LoginFormModal.jsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    const modal = document.querySelector('.login-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  };

  useEffect(() => {
    const modal = document.querySelector('.login-modal');
    if (modal) {
      modal.style.display = 'block';
    }

    return () => {
      if (modal) {
        modal.style.display = 'none';
      }
    };
  }, []);

  const isDisabled = credential.length < 4 || password.length < 6;

  useEffect(() => {
    setCredential("");
    setPassword("");
    setErrors({});
  }, []);

  if (sessionUser) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        handleClose();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'Demo', password: 'password' }))
      .then(() => {
        handleClose();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className="login-modal">
      <div className="login-modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
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
          <div>
            <button type="submit" disabled={isDisabled}>Log In</button>
            <button type="button" onClick={handleDemoLogin}>Log in as Demo User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
