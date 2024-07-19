import React, { useState } from 'react';
import './index.css';
import Cookies from 'js-cookie'

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('') 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/api/login"
    const options = {
      method: 'POST',
      headers : {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({email,password})
    }
    
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.token 
      console.log(jwtToken, "token")
      Cookies.set("jwt_token", data.token, {expires: 7})
      onLogin();
    }
    else {
      setError(data.message)
      console.log("Error", data.message)
    }
    
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;