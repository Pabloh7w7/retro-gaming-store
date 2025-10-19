import { useEffect, useState } from 'react';
import axios from 'axios';

const api = import.meta.env.VITE_API_URL;

interface Producto {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<Producto[]>([]);

  useEffect(() => {
    axios.get(`${api}/cart`)
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error('❌ Error al cargar el carrito:', err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🛒 Carrito</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow flex items-center">
              <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;