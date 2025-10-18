import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { addToCart } = useCart();

useEffect(() => {
  const api = import.meta.env.VITE_API_URL;
  axios.get(`${api}/products`)
    .then((res) => setProducts(res.data))
    .catch((err) => console.error('Error al cargar productos:', err));
}, []);

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🎮 Catálogo de productos</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full max-w-md px-4 py-2 border rounded shadow-sm"
      />

      {/* Filtros por categoría */}
      <div className="mb-6 flex gap-4 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Productos filtrados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={() => {
              addToCart(product.id);
              alert(`${product.name} agregado al carrito`);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;