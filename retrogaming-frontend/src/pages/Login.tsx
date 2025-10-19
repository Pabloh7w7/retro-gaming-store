import { useState } from 'react';
import axios from 'axios';

const api = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${api}/auth/login`, { email, password });

      console.log('✅ Login exitoso:', res.data);

      // Validar que el token exista
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setError('');
        alert('Inicio de sesión exitoso');
        // Aquí podrías redirigir al usuario si lo deseas
      } else {
        setError('No se recibió token. Verifica el backend.');
      }
    } catch (err) {
      console.error('❌ Error al iniciar sesión:', err);
      setError('Credenciales inválidas o error de servidor.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🔐 Iniciar sesión</h1>
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
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
        Entrar
      </button>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default Login;