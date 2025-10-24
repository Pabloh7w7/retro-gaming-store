import { useState } from 'react';
import axios from 'axios';

const api = import.meta.env.VITE_API_URL;

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${api}/pages/register`, {
        username,
        email,
        password,
      });
      console.log('✅ Registro exitoso:', res.data);
      // Puedes redirigir o guardar token
    } catch (err) {
      console.error('❌ Error al registrar usuario:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Registro</h1>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button onClick={handleRegister} className="bg-green-600 text-white px-4 py-2 rounded">
        Registrarse
      </button>
    </div>
  );
};

export default Register;