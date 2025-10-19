import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PurchasedItem {
  product_id: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

const Success = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [items, setItems] = useState<PurchasedItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const purchased = localStorage.getItem('justPurchased');
    const id = localStorage.getItem('lastOrderId');
    const rawItems = localStorage.getItem('lastOrderItems');

    if (!purchased || !id || !rawItems) {
      navigate('/');
    } else {
      setOrderId(id);
      setItems(JSON.parse(rawItems));
      localStorage.removeItem('justPurchased');
      localStorage.removeItem('lastOrderId');
      localStorage.removeItem('lastOrderItems');
    }
  }, []);

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL;
    fetch(`${api}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

    const getProduct = (id: number) => products.find(p => p.id === id);

  const total = items.reduce((sum, item) => {
    const product = getProduct(item.product_id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-3xl font-bold mb-2">¡Gracias por tu compra!</h1>
      <p className="text-gray-700 mb-2">Tu pedido ha sido procesado con éxito.</p>
      {orderId && (
        <p className="text-lg font-semibold text-green-700 mb-2">
          Número de orden: #{orderId}
        </p>
      )}
      <p className="text-xl font-bold mb-6">Total pagado: ${total.toFixed(2)}</p>

      <div className="space-y-4 mb-6">
        {items.map(item => {
          const product = getProduct(item.product_id);
          if (!product) return null;
          return (
            <div key={item.product_id} className="flex items-center border p-4 rounded shadow">
              <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded mr-4" />
              <div className="flex-1 text-left">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p>Cantidad: {item.quantity}</p>
                <p>Subtotal: ${(product.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Volver al catálogo
      </button>
    </div>
  );
};

export default Success;