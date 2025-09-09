import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { useStats } from '../../../hooks/useStats';

export default function DashboardStats() {
  const { data: overview, isLoading, error } = useStats.useOverview();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 py-5 shadow sm:px-6"
          >
            <div className="animate-pulse">
              <div className="absolute rounded-md bg-gray-200 dark:bg-gray-700 p-3">
                <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
              <div className="ml-16">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <p className="text-red-600 dark:text-red-400">
          Failed to load dashboard statistics. Please try again later.
        </p>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(num);
  };

  const stats = [
    {
      name: 'Total Products',
      value: formatNumber(overview?.totalProducts || 0),
      icon: Package,
    },
    {
      name: 'Total Orders',
      value: formatNumber(overview?.totalOrders || 0),
      icon: ShoppingCart,
    },
    {
      name: 'Total Customers',
      value: formatNumber(overview?.totalCustomers || 0),
      icon: Users,
    },
    {
      name: 'Revenue',
      value: formatCurrency(overview?.totalRevenue || 0),
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 py-5 shadow sm:px-6"
        >
          <dt>
            <div className="absolute rounded-md bg-primary p-3">
              <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
          </dd>
        </div>
      ))}
    </div>
  );
}