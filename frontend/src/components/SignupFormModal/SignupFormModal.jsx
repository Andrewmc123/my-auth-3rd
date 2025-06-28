import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

// I believe this component renders the sign-up form modal
function SignupFormModal() {
  const dispatch = useDispatch();

  // I believe these states store the input values for each form field
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // I believe this stores errors returned from the server or validation
  const [errors, setErrors] = useState({});

  // I believe this gets the modal context close function to close the modal after signup
  const { closeModal } = useModal();

  // I believe this handles form submission with validation and dispatches signup thunk
  const handleSubmit = (e) => {
    e.preventDefault();

    // I believe this validates if password and confirm password match
    if (password === confirmPassword) {
      setErrors({}); // I believe this clears previous errors before dispatch

      // I believe this dispatches the signup thunk action with all form data
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        // I believe this closes the modal on successful signup
        .then(closeModal)
        // I believe this catches server errors and sets errors state
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }

    // I believe this sets an error if confirm password doesn't match password
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  // I believe this disables the submit button if required validations fail
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

  return (
    <>
      {/* I believe this is the modal title */}
      <h1>Sign Up</h1>

      {/* I believe this is the form handling user sign-up input */}
      <form onSubmit={handleSubmit}>

        {/* I believe this is the email input field */}
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

        {/* I believe this is the username input field */}
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

        {/* I believe this is the first name input field */}
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

        {/* I believe this is the last name input field */}
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

        {/* I believe this is the password input field */}
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

        {/* I believe this is the confirm password input field */}
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

        {/* I believe this is the submit button, disabled if inputs are invalid */}
        <button type="submit" disabled={isDisabled}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
