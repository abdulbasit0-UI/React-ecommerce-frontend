import { useState } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { type OrderResponseDto } from '@/types/order';

interface OrderTableProps {
  orders: OrderResponseDto[];
  onViewDetails: (orderId: string) => void;
} 

const statusConfig = {
  pending: { label: 'Pending', variant: 'secondary' as const, icon: Package },
  processing: { label: 'Processing', variant: 'default' as const, icon: Package },
  shipped: { label: 'Shipped', variant: 'default' as const, icon: Truck },
  delivered: { label: 'Delivered', variant: 'default' as const, icon: CheckCircle },
  cancelled: { label: 'Cancelled', variant: 'destructive' as const, icon: XCircle },
};

export function OrderTable({ orders, onViewDetails }: OrderTableProps) {
  const [sortField, setSortField] = useState<keyof OrderResponseDto>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof OrderResponseDto) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue && bValue && aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue && bValue && aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getStatusConfig = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          There are no orders matching the current filter.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('id')}
            >
              Order ID
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('userId')}
            >
              Customer
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('total')}
            >
              Total
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('status')}
            >
              Status
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('createdAt')}
            >
              Date
            </TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedOrders.map((order) => {
            const statusInfo = getStatusConfig(order.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  #{order.id.slice(-8).toUpperCase()}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{order.user.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  ${Number(order.total).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge variant={statusInfo.variant} className="flex items-center gap-1 w-fit">
                    <StatusIcon className="h-3 w-3" />
                    {statusInfo.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{format(new Date(order.createdAt), 'MMM dd, yyyy')}</span>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(order.createdAt), 'HH:mm')}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {order.items.length} product{order.items.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(order.id)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}