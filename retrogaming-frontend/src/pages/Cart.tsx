import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  const api = import.meta.env.VITE_API_URL;
  axios.get(`${api}/products`)
    .then((res) => setProducts(res.data))
    .catch((err) => console.error('Error al cargar productos:', err));
}, []);

  const getProduct = (id: number) => products.find(p => p.id === id);

  const total = cart.reduce((sum, item) => {
    const product = getProduct(item.product_id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 Tu carrito</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => {
            const product = getProduct(item.product_id);
            if (!product) return null;
            return (
              <div key={item.product_id} className="flex items-center border p-4 rounded shadow">
                <img src={product.image_url} alt={product.name} className="w-20 h-20 object-cover rounded mr-4" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Subtotal: ${(product.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.product_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            );
          })}
          <div className="text-right mt-4"><Link to="/checkout"
  className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
  Finalizar compra
</Link>
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={clearCart}
              className="mt-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;