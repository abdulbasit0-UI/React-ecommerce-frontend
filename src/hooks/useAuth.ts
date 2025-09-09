import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import type { RootState } from '@/store/store';
import type { User } from '@/types/auth';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();


  const logout = () => {
    // This would typically dispatch a logout action
    localStorage.removeItem('token');
    navigate('/login');
  };


  return {
    user,
    isAuthenticated,
    logout,
  };
};

// Hook to require authentication
export const useRequireAuth = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return { isAuthenticated };
};

// Hook to check specific roles
export const useRole = (requiredRole?: string) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const hasRole = !requiredRole || (user && user.role === requiredRole);
  
  return {
    hasRole,
    userRole: user?.role,
    isAuthenticated,
  };
};