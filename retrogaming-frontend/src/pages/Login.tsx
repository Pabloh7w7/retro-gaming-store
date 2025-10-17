import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/login', {
        email,
        password
      });

      const token = res.data.token;
      localStorage.setItem('authToken', token);
      alert('Inicio de sesión exitoso');
      navigate('/');
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('Credenciales incorrectas o error de servidor');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">🔐 Iniciar sesión</h1>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-6 px-4 py-2 border rounded"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;