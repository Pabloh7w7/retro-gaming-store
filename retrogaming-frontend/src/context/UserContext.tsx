import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('http://localhost:3000/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setUser(res.data);
      }).catch(() => {
        localStorage.removeItem('authToken');
        setUser(null);
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de UserProvider');
  return context;
};