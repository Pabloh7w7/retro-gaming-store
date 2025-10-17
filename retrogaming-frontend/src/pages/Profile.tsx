import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import axios from 'axios';

interface Order {
  id: number;
  created_at: string;
  total: number;
  items: {
    product_id: number;
    quantity: number;
  }[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

function Profile() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    axios.get('http://localhost:3000/orders', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data));

    axios.get('http://localhost:3000/products')
      .then(res => setProducts(res.data));
  }, []);

  const getProduct = (id: number) => products.find(p => p.id === id);

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">👤 Mi perfil</h1>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Correo:</strong> {user.email}</p>

      <h2 className="text-xl font-semibold mt-8 mb-4">🧾 Historial de compras</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No has realizado ninguna compra aún.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="mb-6 border p-4 rounded shadow-sm">
            <p className="text-sm text-gray-500">Fecha: {new Date(order.created_at).toLocaleDateString()}</p>
            <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
            <ul className="mt-2 space-y-2">
              {order.items.map(item => {
                const product = getProduct(item.product_id);
                if (!product) return null;
                return (
                  <li key={item.product_id} className="flex items-center gap-4">
                    <img src={product.image_url} alt={product.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <p>{product.name}</p>
                      <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;