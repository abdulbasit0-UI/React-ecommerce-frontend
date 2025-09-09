// src/components/customer/user/UserOverview.tsx
import { useUserProfile, useMyOrderStats } from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Package, Clock, CheckCircle, CreditCard, MapPin, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import LoadingSpinner from '../../layout/LoadingSpinner';

export default function UserOverview() {
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: orderStats, isLoading: statsLoading } = useMyOrderStats();
  const navigate = useNavigate();


  if (profileLoading || statsLoading) {
    return <LoadingSpinner />;
  }

  const stats = [
    { name: 'Total Orders', value: orderStats?.totalOrders || 0, icon: ShoppingBag, color: 'bg-blue-500' },
    { name: 'Total Spent', value: `$${Number(orderStats?.totalSpent).toFixed(2) || 0}`, icon: CreditCard, color: 'bg-green-500' },
    { name: 'Pending Orders', value: orderStats?.pendingOrders || 0, icon: Clock, color: 'bg-yellow-500' },
    { name: 'Completed Orders', value: orderStats?.completedOrders || 0, icon: CheckCircle, color: 'bg-purple-500' },
  ];

  console.log(orderStats);
  

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {profile?.name}!</h1>
        <p className="text-white/80">Manage your orders, profile, and preferences from one place.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/account/orders')}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Order */}
      {orderStats?.recentOrder && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Order</span>
              <Button variant="outline" size="sm" onClick={() => navigate('/account/orders')}>
                View All Orders
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium">Order #{orderStats.recentOrder.id}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(orderStats.recentOrder.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">${Number(orderStats?.totalSpent).toFixed(2)}</p>
                <Badge variant={
                  orderStats.recentOrder.status === 'COMPLETED' ? 'default' :
                  orderStats.recentOrder.status === 'PENDING' ? 'secondary' :
                  orderStats.recentOrder.status === 'PROCESSING' ? 'outline' :
                  'destructive'
                }>
                  {orderStats.recentOrder.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/account/addresses')}>
          <CardContent className="p-6 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Manage Addresses</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update your shipping addresses</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/account/wishlist')}>
          <CardContent className="p-6 text-center">
            <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Wishlist</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">View saved items</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/account/settings')}>
          <CardContent className="p-6 text-center">
            <Settings className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold mb-1">Settings</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage preferences</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}