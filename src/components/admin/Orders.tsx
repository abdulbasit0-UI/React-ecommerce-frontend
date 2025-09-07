import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderTable } from './orders/OrderTable';
import { OrderDetail } from './orders/OrderDetail';
import { useAdminOrders } from '@/hooks/useOrders';

export function Orders() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { data: orders, isLoading: loading, error } = useAdminOrders();

  console.log(orders);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error loading orders: {error?.message || 'Unknown error'}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage and view all customer orders
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>
                View and manage all customer orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrderTable 
                orders={orders || []} 
                onViewDetails={setSelectedOrderId}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Orders</CardTitle>
              <CardDescription>
                Orders awaiting payment confirmation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrderTable 
                orders={orders?.filter(order => order.status === 'pending') || []} 
                onViewDetails={setSelectedOrderId}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processing Orders</CardTitle>
              <CardDescription>
                Orders being prepared for shipment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrderTable 
                orders={orders?.filter(order => order.status === 'processing') || []} 
                onViewDetails={setSelectedOrderId}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipped" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipped Orders</CardTitle>
              <CardDescription>
                Orders that have been shipped
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrderTable 
                orders={orders?.filter(order => order.status === 'shipped') || []} 
                onViewDetails={setSelectedOrderId}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Delivered Orders</CardTitle>
              <CardDescription>
                Orders that have been delivered
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrderTable 
                orders={orders?.filter(order => order.status === 'delivered') || []} 
                onViewDetails={setSelectedOrderId}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Orders</CardTitle>
              <CardDescription>
                Orders that have been cancelled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrderTable 
                orders={orders?.filter(order => order.status === 'cancelled') || []} 
                onViewDetails={setSelectedOrderId}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <OrderDetail
        orderId={selectedOrderId}
        isOpen={!!selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
      />
    </div>
  );
}