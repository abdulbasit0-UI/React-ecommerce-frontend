# Admin Dashboard Components

This directory contains the admin dashboard components that display real-time statistics and analytics for the ecommerce platform.

## Components

### DashboardStats
- Displays key performance indicators (KPIs)
- Shows total products, orders, customers, and revenue
- Uses real data from `/stats/overview` endpoint
- Includes loading states and error handling

### SalesChart
- Line chart showing revenue trends over the last 30 days
- Uses data from `/stats/revenue/trend?days=30` endpoint
- Formatted currency display and responsive design

### OrderStatusChart
- Pie chart showing distribution of order statuses
- Displays completed, pending, and cancelled orders
- Uses data from `/stats/orders` endpoint

### TopProducts
- Lists the top 5 best-selling products
- Shows product name, units sold, and revenue generated
- Uses data from `/stats/products/top-selling?limit=5` endpoint

### CustomerGrowth
- Displays customer growth metrics
- Shows total customers, new customers this month, and active customers
- Uses data from `/stats/customers` endpoint

## Features

- **Real-time Data**: All components fetch live data from the backend API
- **Auto-refresh**: Data refreshes every 60 seconds automatically
- **Loading States**: Skeleton loaders while data is being fetched
- **Error Handling**: Graceful error messages when API calls fail
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: All components support dark/light themes

## API Endpoints Used

- `GET /stats/overview` - Overview statistics
- `GET /stats/revenue/trend?days=30` - Revenue trends
- `GET /stats/orders` - Order statistics
- `GET /stats/customers` - Customer statistics
- `GET /stats/products/top-selling?limit=5` - Top selling products

## Data Refresh

All dashboard components automatically refresh their data every 60 seconds to ensure the information stays current. The data is considered stale after 30 seconds, which helps balance between real-time updates and performance.
