import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = import.meta.env.VITE_API_URL;

interface Producto {
  product_id: number;
  quantity: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');                                                                                                   
  const [direccion, setDireccion] = useState('');
  const [productos] = useState<Producto[]>([
    { product_id: 1, quantity: 2 },
    { product_id: 3, quantity: 1 },
  ]);

  const handleCheckout = async () => {
    try {
      const res = await axios.post(`${api}/order/checkout`, {
        nombre,
        direccion,
        productos,
      });

      // Guardar datos en localStorage para Success.tsx
      localStorage.setItem('justPurchased', 'true');
      localStorage.setItem('lastOrderId', res.data.orderId);
      localStorage.setItem('lastOrderItems', JSON.stringify(res.data.items));

      // Redirigir a página de éxito
      navigate('/success');
    } catch (err) {
      console.error('❌ Error al procesar la orden:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">💳 Checkout</h1>
      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Dirección de envío"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleCheckout}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Confirmar pedido
      </button>
    </div>
  );
};

export default Checkout;