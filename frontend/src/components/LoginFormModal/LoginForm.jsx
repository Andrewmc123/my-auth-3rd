import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { login } from '../../../store/session';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const user = await dispatch(login({ credential, password }));
      if (user) {
        closeModal();
      }
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-header">
        <h2>Login</h2>
      </div>

      {errors.length > 0 && (
        <div className="errors">
          {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
        </div>
      )}

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

      <button type="submit" className="submit-btn">Login</button>
    </form>
  );
}

export default LoginForm;
