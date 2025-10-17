interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  onAddToCart: () => void;
}

function ProductCard({ name, description, price, image_url, onAddToCart }: Product) {
  return (
    <div className="border rounded shadow p-4 flex flex-col">
      <img src={image_url} alt={name} className="h-40 object-cover mb-2" />
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-green-600 font-semibold mt-1">${price}</p>
      <button
        onClick={onAddToCart}
        className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductCard;