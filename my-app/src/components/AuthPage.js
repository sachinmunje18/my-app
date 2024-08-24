// src/components/AuthPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/flight/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // Clear form fields
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsLogin(true); // Switch to login after successful registration
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/flight/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="welcome-message">
          <h3>Welcome to FlightBooker!</h3>
          <p>Start your journey today!</p>
        </div>
        <div className="wrapper">
          {isLogin ? (
            <div className="login-form">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <div className="input-field">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="email">Enter your email</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Enter your password</label>
                </div>
                
                <button type="submit">Log In</button>
                <div className="register">
                  <p>Don't have an account? <button type="button" onClick={() => setIsLogin(false)}>Register</button></p>
                </div>
              </form>
            </div>
          ) : (
            <div className="registration-form">
              <h2>Register</h2>
              <form onSubmit={handleRegister}>
                <div className="input-field">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="name">Enter your name</label>
                </div>
                <div className="input-field">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="email">Enter your email</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Enter your password</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="confirm-password">Confirm password</label>
                </div>
                <button type="submit">Register</button>
                <div className="register">
                  <p>Already have an account? <button type="button" onClick={() => setIsLogin(true)}>Login</button></p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
