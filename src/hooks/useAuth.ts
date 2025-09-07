import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import type { RootState } from '@/store/store';

interface UseAuthReturn {
  user: any;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  console.log(user);
  const navigate = useNavigate();

  const login = async (credentials: any) => {
    // This would typically dispatch a login action
    // For now, it's a placeholder that would integrate with your auth system
    console.log('Login attempt with:', credentials);
  };

  const logout = () => {
    // This would typically dispatch a logout action
    localStorage.removeItem('token');
    navigate('/login');
  };

  console.log(isAuthenticated);

  return {
    user,
    isAuthenticated,
    login,
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