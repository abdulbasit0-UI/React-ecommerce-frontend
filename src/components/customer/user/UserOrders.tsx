// src/components/customer/user/UserOrders.tsx
import { useState } from 'react';
import { useMyOrders } from '../../../hooks/useUser';
import { Search, Package, Eye } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../layout/LoadingSpinner';
import { format } from 'date-fns';
import type { OrderResponseDto } from '@/types/order';

const statusOptions = [
  { value: 'all', label: 'All Orders' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
];


const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  SHIPPED: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default function UserOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  
  const { data, isLoading } = useMyOrders(currentPage, 10, selectedStatus === 'all' ? undefined : selectedStatus);



  const filteredOrders = data?.data.filter((order: { items: { productName: string; }[]; }) =>
    order.items.some((item: { productName: string; }) => 
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) || [];


  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {data?.meta?.total || 0} total orders
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm || selectedStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'You haven\'t placed any orders yet'
              }
            </p>
            <Button onClick={() => navigate('/shop')}>
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order: OrderResponseDto) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-lg">Order #{order.id}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {format(new Date(order.createdAt), 'MMMM d, yyyy')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${Number(order.total).toFixed(2)}</p>
                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                      {order.status}
                    </Badge>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.image || '/placeholder-product.png'}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.productName}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {order.status === 'DELIVERED' && (
                      <Button variant="outline" size="sm">
                        Write Review
                      </Button>
                    )}
                    {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && (
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/account/orders/${order.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data?.meta && data.meta.lastPage > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {data.meta.lastPage}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, data.meta.lastPage))}
            disabled={currentPage === data.meta.lastPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}