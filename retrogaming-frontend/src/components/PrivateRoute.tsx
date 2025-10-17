import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function PrivateRoute({ children }: { children: ReactElement }) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;