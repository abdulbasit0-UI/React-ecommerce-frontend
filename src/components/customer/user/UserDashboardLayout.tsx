// src/components/customer/user/UserDashboardLayout.tsx
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  MapPin, 
  LogOut 
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';

interface UserDashboardLayoutProps {
  children: ReactNode;
}

const sidebarItems = [
  { name: 'Overview', href: '/account', icon: User },
  { name: 'Orders', href: '/account/orders', icon: ShoppingBag },
  { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { name: 'Addresses', href: '/account/addresses', icon: MapPin },
  { name: 'Settings', href: '/account/settings', icon: Settings },
];

export default function UserDashboardLayout({ children }: UserDashboardLayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">My Account</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your profile</p>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <Separator className="my-4" />

            <Button
              variant="ghost"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}