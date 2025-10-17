import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:3000/register', {
        name,
        email,
        password
      });

      const token = res.data.token;
      localStorage.setItem('authToken', token);
      alert('Registro exitoso. ¡Bienvenido!');
      navigate('/');
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      alert('No se pudo completar el registro');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">📝 Crear cuenta</h1>
      <input
        type="text"
        placeholder="Nombre completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
      />
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
        onClick={handleRegister}
        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Registrarse
      </button>
    </div>
  );
}

export default Register;