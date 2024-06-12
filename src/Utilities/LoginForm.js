// LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      if (response.data.authenticated) {
        onLogin(username, password, navigate, response.data.role);
      } else {
        alert('Incorrect username or password');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">WELCOME TO LNHS PORTAL!</h1>
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input placeholder="user" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input
            placeholder="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
