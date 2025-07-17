import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AcercaDe from './pages/AcercaDe';
import Contacto from './pages/Contacto';
import GaleriaDeProductos from './pages/GaleriaDeProductos';
import NotFound from './pages/NotFound';
import DetallesProducto from './components/DetallesProducto';
import RutasProtegidas from './rutas/RutasProtegidas';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';  // IMPORTAR hook correcto

function App() {
  const { isAuth } = useAuth();  // obtener estado de autenticación

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/acercade' element={<AcercaDe />} />
      <Route path='/productos' element={<GaleriaDeProductos />} />
      <Route path='/productos/:id' element={<DetallesProducto />} />
      <Route path='/contacto' element={<Contacto />} />

      <Route
        path='/admin'
        element={
          <RutasProtegidas isAuthenticated={isAuth}>
            <Admin />
          </RutasProtegidas>
        }
      />

      <Route path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
