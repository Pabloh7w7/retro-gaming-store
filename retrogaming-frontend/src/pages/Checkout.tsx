import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = import.meta.env.VITE_API_URL;

const Checkout = () => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Debes iniciar sesión para continuar.");
      navigate('/login');
    }
  }, []);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.post(`${api}/pages/checkout`, {
        nombre,
        direccion,
        productos: [], // conecta con tu carrito real
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('✅ Orden enviada:', res.data);
      setConfirmado(true);
    } catch (err) {
      console.error('❌ Error al procesar la orden:', err);
      alert("Error al procesar la orden. Verifica tu sesión.");
    }
  };

  if (confirmado) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">🎉 ¡Gracias por tu compra!</h1>
        <p>Tu pedido ha sido procesado correctamente.</p>
      </div>
    );
  }

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
      <button onClick={handleCheckout} className="bg-purple-600 text-white px-4 py-2 rounded">
        Confirmar pedido
      </button>
    </div>
  );
};

export default Checkout;