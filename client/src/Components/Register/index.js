import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie" 

function Register({onLogin}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    const options = {
      method: 'POST',
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password})
    }
    
    const url = "http://localhost:3000/api/register"
    try {
      const response = await fetch(url, options)
      const jwtToken = await response.json()
      console.log(jwtToken, "token")

      if (jwtToken.token) Cookies.set('jwt_token', jwtToken.token, { expires: 7 });

      onLogin()
      navigate("/")
    } catch(e) {
      setError(e.message)
      console.log("Error", e.message)
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;