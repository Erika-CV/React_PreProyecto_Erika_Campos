
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { handleSubmit, errors } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = (e) => {
    handleSubmit(e, email, password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onFormSubmit}>
        <h1 className="login-title">Panel de Ingreso</h1>

        <label>Email</label>
        <input
          type="email"
          placeholder="ejemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
  

