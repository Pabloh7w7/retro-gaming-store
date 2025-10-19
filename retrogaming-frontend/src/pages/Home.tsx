import { useEffect, useState } from 'react';
import axios from 'axios';

const api = import.meta.env.VITE_API_URL;

interface Producto {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

const Home = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    axios.get(`${api}/products`)
      .then((res) => {
        setProductos(res.data);
      })
      .catch((err) => {
        console.error('Error al cargar productos:', err);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🎮 Catálogo de productos</h1>
      <div className="space-y-4">
        {productos.map((producto) => (
          <div key={producto.id} className="border p-4 rounded shadow flex items-center">
            <img src={producto.image_url} alt={producto.name} className="w-16 h-16 object-cover rounded mr-4" />
            <div>
              <h2 className="text-lg font-semibold">{producto.name}</h2>
              <p>${producto.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;