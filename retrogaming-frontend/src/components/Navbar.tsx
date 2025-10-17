import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useUser();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <Link to="/" className="text-xl font-bold hover:text-yellow-400">
        🎮 RetroGaming
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-yellow-400">Inicio</Link>
        <Link to="/cart" className="hover:text-yellow-400 relative">
          Carrito
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
        {user ? (
          <>
            <span className="text-sm text-green-400">Hola, {user.name}</span>{user && (
  <Link to="/profile" className="hover:text-yellow-400">Perfil</Link>
)}
            <button onClick={logout} className="hover:text-red-400">Salir</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-400">Login</Link>
            <Link to="/register" className="hover:text-yellow-400">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;