import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

const stats = [
  { name: 'Total Products', value: '2,847', change: '+12%', changeType: 'increase', icon: Package },
  { name: 'Total Orders', value: '1,234', change: '+8%', changeType: 'increase', icon: ShoppingCart },
  { name: 'Total Customers', value: '5,678', change: '+15%', changeType: 'increase', icon: Users },
  { name: 'Revenue', value: '$45,231', change: '+20%', changeType: 'increase', icon: DollarSign },
];

export default function DashboardStats() {
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
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}