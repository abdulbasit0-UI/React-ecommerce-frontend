import DashboardStats from "./dashboard/DashboardStats";
import SalesChart from "./dashboard/SalesChart";
import TopProducts from "./dashboard/TopProducts";
import OrderStatusChart from "./dashboard/OrderStatusChart";
import CustomerGrowth from "./dashboard/CustomerGrowth";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <OrderStatusChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopProducts />
        </div>
        <div className="lg:col-span-1">
          <CustomerGrowth />
        </div>
      </div>
    </div>
  );
}