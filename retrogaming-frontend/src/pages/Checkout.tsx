import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { axiosAuth } from '../context/axiosInstance';

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

  const handleCheckout = async () => {
    try {
      const res = await axiosAuth.post('/order/checkout');
      const orderId = res.data.order_id;

      localStorage.setItem('justPurchased', 'true');
      localStorage.setItem('lastOrderId', orderId.toString());
      localStorage.setItem('lastOrderItems', JSON.stringify(cart));

      clearCart();
      navigate('/success');
    } catch (err) {
      console.error('Error al finalizar compra:', err);
      alert('Hubo un problema al procesar tu orden.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🧾 Finalizar compra</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">No hay productos en el carrito.</p>
      ) : (
        <>
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
          </div>
          <p className="text-xl font-bold text-center mt-6">Total a pagar: ${total.toFixed(2)}</p>
          <div className="text-center mt-4">
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Confirmar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;