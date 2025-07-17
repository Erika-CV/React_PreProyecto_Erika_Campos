import React from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    errors
  } = useAuth();

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: 'auto',
      }}
    >
      {/* Email */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="formBasicEmail" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Email address
        </label>
        <input
          id="formBasicEmail"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '0.5rem',
            border: `1px solid ${errors.email ? 'red' : '#ced4da'}`,
            borderRadius: '0.25rem',
          }}
        />
        {errors.email && (
          <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {errors.email}
          </div>
        )}
      </div>

      {/* Password */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="formBasicPassword" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Password
        </label>
        <input
          id="formBasicPassword"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '0.5rem',
            border: `1px solid ${errors.password ? 'red' : '#ced4da'}`,
            borderRadius: '0.25rem',
          }}
        />
        {errors.password && (
          <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {errors.password}
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!email || !password}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '0.75rem',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
