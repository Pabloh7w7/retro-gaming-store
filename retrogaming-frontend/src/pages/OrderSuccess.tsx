import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">✅ ¡Gracias por tu compra!</h1>
      <p className="text-gray-700 mb-6">
        Tu orden ha sido procesada correctamente. Recibirás una confirmación por correo electrónico.
      </p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
        alt="Compra exitosa"
        className="mx-auto w-24 h-24 mb-6"
      />
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Volver a la tienda
      </Link>
    </div>
  );
}

export default OrderSuccess;