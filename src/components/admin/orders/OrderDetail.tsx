import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  User,
  CreditCard,
  Calendar,
  X,
} from "lucide-react";
import { orderApi } from "@/lib/orderApi";
import { type OrderResponseDto } from "@/types/order";

interface OrderDetailProps {
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig = {
  pending: {
    label: "Pending",
    variant: "secondary" as const,
    icon: Package,
    color: "text-yellow-600",
  },
  processing: {
    label: "Processing",
    variant: "default" as const,
    icon: Package,
    color: "text-blue-600",
  },
  shipped: {
    label: "Shipped",
    variant: "default" as const,
    icon: Truck,
    color: "text-purple-600",
  },
  delivered: {
    label: "Delivered",
    variant: "default" as const,
    icon: CheckCircle,
    color: "text-green-600",
  },
  cancelled: {
    label: "Cancelled",
    variant: "destructive" as const,
    icon: XCircle,
    color: "text-red-600",
  },
};

export function OrderDetail({ orderId, isOpen, onClose }: OrderDetailProps) {
  const [order, setOrder] = useState<OrderResponseDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId && isOpen) {
      fetchOrderDetails();
    }
  }, [orderId, isOpen]);

  console.log(order);

  const fetchOrderDetails = async () => {
    if (!orderId) return;

    setLoading(true);
    setError(null);

    try {
      const orderData = await orderApi.getAdminOrder(orderId);
      setOrder(orderData);
    } catch (err) {
      setError("Failed to load order details");
      console.error("Error fetching order:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    );
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order Details</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            View detailed information about this order
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-lg">Loading order details...</div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-8">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        )}

        {order && (
          <div className="space-y-6">
            {/* Order Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Order #{order.id.slice(-8).toUpperCase()}
                    </CardTitle>
                    <CardDescription>
                      Placed on{" "}
                      {format(
                        new Date(order.createdAt),
                        "MMMM dd, yyyy 'at' HH:mm"
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const statusInfo = getStatusConfig(order.status);
                      const StatusIcon = statusInfo.icon;
                      return (
                        <Badge
                          variant={statusInfo.variant}
                          className="flex items-center gap-1"
                        >
                          <StatusIcon className="h-3 w-3" />
                          {statusInfo.label}
                        </Badge>
                      );
                    })()}
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Customer ID
                    </label>
                    <p className="text-sm">{order.user.name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Order Total
                    </label>
                    <p className="text-2xl font-bold">
                      ${Number(order.total).toFixed(2)}
                    </p>
                  </div>
                  {order.paidAt && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Payment Date
                      </label>
                      <p className="text-sm">
                        {format(
                          new Date(order.paidAt),
                          "MMMM dd, yyyy 'at' HH:mm"
                        )}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Payment Status
                    </label>
                    <p className="text-sm">
                      {order.paidAt ? (
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800"
                        >
                          Paid
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </p>
                  </div>
                  {order.stripeSessionId && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Stripe Session ID
                      </label>
                      <p className="text-xs font-mono">
                        {order.stripeSessionId}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Shipping Address
                    </label>
                    <p className="text-sm">{order.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Shipping City
                    </label>
                    <p className="text-sm">{order.city}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Shipping State
                    </label>
                    <p className="text-sm">{order.state}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Shipping Zip Code
                    </label>
                    <p className="text-sm">{order.zipCode}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Shipping Country
                    </label>
                    <p className="text-sm">{order.country}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Items ({order.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-4">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="w-16 h-16 object-cover rounded-md border"
                            />
                          )}
                          <div>
                            <h4 className="font-medium">{item.productName}</h4>
                            <p className="text-sm text-muted-foreground">
                              Product ID: {item.productId}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${Number(item.price).toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-medium">
                            Total: $
                            {(Number(item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      {index < order.items.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Order Total:</span>
                  <span>${Number(order.total).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Order Created</p>
                      <p className="text-xs text-muted-foreground">
                        {format(
                          new Date(order.createdAt),
                          "MMMM dd, yyyy 'at' HH:mm"
                        )}
                      </p>
                    </div>
                  </div>

                  {order.paidAt && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Payment Completed</p>
                        <p className="text-xs text-muted-foreground">
                          {format(
                            new Date(order.paidAt),
                            "MMMM dd, yyyy 'at' HH:mm"
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-xs text-muted-foreground">
                        {format(
                          new Date(order.updatedAt),
                          "MMMM dd, yyyy 'at' HH:mm"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
