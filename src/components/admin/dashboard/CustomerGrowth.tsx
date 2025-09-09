import { useStats } from '../../../hooks/useStats';
import { Loader2, Users, UserPlus, UserCheck } from 'lucide-react';

export default function CustomerGrowth() {
  const { data: customerStats, isLoading, error } = useStats.useCustomers();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Customer Growth</h3>
        <div className="flex items-center justify-center h-[200px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-gray-600 dark:text-gray-400">Loading customer data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Customer Growth</h3>
        <div className="flex items-center justify-center h-[200px]">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-2">Failed to load customer data</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const activePercentage = customerStats ? 
    ((customerStats.activeCustomers / customerStats.totalCustomers) * 100).toFixed(1) : '0';

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Customer Growth</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(customerStats?.totalCustomers || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <UserPlus className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">New This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(customerStats?.newCustomersThisMonth || 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <UserCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(customerStats?.activeCustomers || 0)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activePercentage}% of total
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
