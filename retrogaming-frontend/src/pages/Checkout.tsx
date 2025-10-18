import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

function Checkout() {
  const { cart, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

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

  const handleCheckout = () => {
  const api = import.meta.env.VITE_API_URL;
  axios.post(`${api}/orders`, {
    items: cart,
    total
  }).then(() => {
    clearCart();
    alert('¡Compra realizada con éxito!');
    navigate('/success');
  }).catch((err) => {
    console.error('Error al finalizar compra:', err);
    alert('Hubo un problema al procesar tu orden.');
  });
};

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🧾 Finalizar compra</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">No hay productos en el carrito.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => {
            const product = getProduct(item.product_id);
            if (!product) return null;
            return (
              <div key={item.product_id} className="flex items-center border p-4 rounded shadow">
                <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded mr-4" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Subtotal: ${(product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            );
          })}
          <div className="text-right mt-4">
            <p className="text-xl font-bold">Total a pagar: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Confirmar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;