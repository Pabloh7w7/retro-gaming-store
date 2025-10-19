import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Redirige la raíz al login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Página de login */}
      <Route path="/login" element={<Login />} />

      {/* Checkout protegido por token */}
      <Route path="/checkout" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />

      {/* Puedes agregar más rutas aquí */}
    </Routes>
  );
}

export default App;