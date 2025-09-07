import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../layout/LoadingSpinner';
import type { RootState } from '@/store/store';

interface ProtectedRouteProps {
  requiredRole?: string;
}

export default function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  console.log(user);
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}