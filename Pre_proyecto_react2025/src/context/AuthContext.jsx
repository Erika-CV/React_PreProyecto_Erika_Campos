import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [errors, setErrors] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Persistencia de sesión
  useEffect(() => {
    const auth = localStorage.getItem('isAuth') === 'true';
    setIsAuth(auth);
    setLoading(false);

    if (auth && window.location.pathname === '/login') {
      navigate('/admin');
    }
  }, [navigate]);

  // Guardar estado de autenticación
  useEffect(() => {
    localStorage.setItem('isAuth', isAuth.toString());
  }, [isAuth]);

  // Manejo de login
  const handleSubmit = async (e, formEmail, formPassword) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formEmail) validationErrors.email = 'Email es requerido';
    if (!formPassword) validationErrors.password = 'Password es requerido';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch('/data/users.json');
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === formEmail && user.password === formPassword
      );

      if (!foundUser) {
        setErrors({ email: 'Credenciales inválidas' });
      } else {
        setIsAuth(true);
        localStorage.setItem('user', JSON.stringify(foundUser));

        if (foundUser.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setErrors({ email: 'Error del servidor. Intenta más tarde.' });
    }
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('isAuth');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        handleSubmit,
        errors,
        isAuth,
        logout
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
