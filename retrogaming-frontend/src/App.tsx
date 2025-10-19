import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        {/* otras rutas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;