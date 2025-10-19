import { useEffect, useState } from 'react';
import { axiosAuth } from '../context/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image_url: string;
}

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosAuth.get('/cart')
      .then(res => setItems(res.data))
      .catch(err => console.error('Error al cargar el carrito:', err));
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🛒 Tu carrito</h1>
      {items.length === 0 ? (
        <p className="text-gray-600 text-center">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.product_id} className="flex items-center border p-4 rounded shadow">
                <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xl font-bold text-center mt-6">Total: ${total.toFixed(2)}</p>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/checkout')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Ir a pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;