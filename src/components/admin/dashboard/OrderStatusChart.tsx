import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useStats } from '../../../hooks/useStats';
import { Loader2 } from 'lucide-react';

const COLORS = {
  completed: '#10b981', // green
  pending: '#f59e0b',   // yellow
  cancelled: '#ef4444', // red
};

export default function OrderStatusChart() {
  const { data: orderStats, isLoading, error } = useStats.useOrders();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Status</h3>
        <div className="flex items-center justify-center h-[300px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="text-gray-600 dark:text-gray-400">Loading order data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Status</h3>
        <div className="flex items-center justify-center h-[300px]">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-2">Failed to load order data</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  const data = [
    {
      name: 'Completed',
      value: orderStats?.completedOrders || 0,
      color: COLORS.completed,
    },
    {
      name: 'Pending',
      value: orderStats?.pendingOrders || 0,
      color: COLORS.pending,
    },
    {
      name: 'Cancelled',
      value: orderStats?.cancelledOrders || 0,
      color: COLORS.cancelled,
    },
  ].filter(item => item.value > 0); // Only show categories with data

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const CustomTooltip = ({ active, payload }: { active: boolean, payload: { name: string, value: number }[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 dark:text-white">
            {data.name}: {formatNumber(data.value)}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {((data.value / (orderStats?.totalOrders || 1)) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Status Distribution</h3>
      
      {data.length > 0 ? (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip active={true} payload={[]} />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[300px]">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">No order data available</p>
          </div>
        </div>
      )}
    </div>
  );
}
