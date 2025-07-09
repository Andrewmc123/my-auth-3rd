// frontend/src/components/SignupFormModal/SignupFormModal.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal({ show, onClose }) {
  const dispatch = useDispatch();

  // I believe these hold all form input states
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // I believe this holds form validation or server errors
  const [errors, setErrors] = useState({});

  // This is doing reset when modal opens
  useEffect(() => {
    if (show) {
      setEmail("");
      setUsername("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    }
  }, [show]);

  // This is doing the modal close
  const handleClose = () => {
    onClose();
  };

  // This is doing the signup form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setErrors({});
      return dispatch(sessionActions.signup({
        email,
        username,
        firstName,
        lastName,
        password
      }))
        .then(() => handleClose())
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }

    // I believe this handles password mismatch
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  // I believe this disables sign up button if any field is invalid
  const isDisabled =
    !email ||
    !username ||
    username.length < 4 ||
    !firstName ||
    !lastName ||
    !password ||
    password.length < 6 ||
    !confirmPassword ||
    confirmPassword.length < 6;

  if (!show) return null;

  return (
    <div className="signup-modal show">
      <div className="signup-modal-content">
        <button className="close-modal" onClick={handleClose}>
          &times;
        </button>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">

          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="error">{errors.email}</p>}

          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className="error">{errors.username}</p>}

          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p className="error">{errors.lastName}</p>}

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="error">{errors.password}</p>}

          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <button type="submit" disabled={isDisabled}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupFormModal;
