import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  User, 
  ShoppingBag, 
  Bell,
  BellOff,
  Building
} from 'lucide-react';
import { type UserProfile } from '@/types/user';
import { userApi } from '@/lib/userApi';
import LoadingSpinner from '../../layout/LoadingSpinner';

interface CustomerDetailProps {
  customerId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerDetail({ customerId, isOpen, onClose }: CustomerDetailProps) {
  const [customer, setCustomer] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (customerId && isOpen) {
      fetchCustomerDetails();
    }
  }, [customerId, isOpen]);

  const fetchCustomerDetails = async () => {
    if (!customerId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Since we don't have a direct API to get customer by ID from admin perspective,
      // we'll need to use the existing getCustomers API and find the specific customer
      const customers = await userApi.getCustomers();
      const foundCustomer = customers.find(c => c.id === customerId);
      
      if (foundCustomer) {
        setCustomer(foundCustomer);
      } else {
        setError('Customer not found');
      }
    } catch (err) {
      setError('Failed to load customer details');
      console.error('Error fetching customer details:', err);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getCustomerStatus = (customer: UserProfile) => {
    const createdAt = new Date(customer.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    if (createdAt >= thirtyDaysAgo) {
      return { label: 'New Customer', variant: 'default' as const };
    }
    
    return { label: 'Active Customer', variant: 'secondary' as const };
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogDescription>
            View detailed information about this customer
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {customer && (
          <div className="space-y-6">
            {/* Customer Header */}
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={customer.avatar} alt={customer.name} />
                <AvatarFallback className="text-lg">{getInitials(customer.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{customer.name}</h2>
                  <Badge variant={getCustomerStatus(customer).variant}>
                    {getCustomerStatus(customer).label}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{customer.email}</span>
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {format(new Date(customer.createdAt), 'MMMM dd, yyyy')}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Customer Details Tabs */}
            <Tabs defaultValue="profile" className="space-y-4">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                        <p className="text-sm">{customer.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-sm">{customer.email}</p>
                      </div>
                      {customer.phone && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Phone</label>
                          <p className="text-sm">{customer.phone}</p>
                        </div>
                      )}
                      {customer.dateOfBirth && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                          <p className="text-sm">{format(new Date(customer.dateOfBirth), 'MMMM dd, yyyy')}</p>
                        </div>
                      )}
                    </div>
                    {customer.bio && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Bio</label>
                        <p className="text-sm">{customer.bio}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Addresses ({customer.addresses?.length || 0})
                    </CardTitle>
                    <CardDescription>
                      Customer's saved addresses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {customer.addresses && customer.addresses.length > 0 ? (
                      <div className="space-y-4">
                        {customer.addresses.map((address) => (
                          <div key={address.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">
                                    {address.firstName} {address.lastName}
                                  </h4>
                                  {address.isDefault && (
                                    <Badge variant="default" className="text-xs">Default</Badge>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground space-y-1">
                                  <p>{address.address}</p>
                                  {address.address2 && <p>{address.address2}</p>}
                                  <p>{address.city}, {address.state} {address.zipCode}</p>
                                  <p>{address.country}</p>
                                  {address.phone && (
                                    <p className="flex items-center gap-1">
                                      <Phone className="h-3 w-3" />
                                      {address.phone}
                                    </p>
                                  )}
                                </div>
                              </div>
                              {address.company && (
                                <div className="text-right">
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Building className="h-3 w-3" />
                                    {address.company}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No addresses saved</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Newsletter</p>
                          <p className="text-sm text-muted-foreground">Receive marketing emails</p>
                        </div>
                        {customer.preferences.newsletter ? (
                          <Bell className="h-5 w-5 text-green-600" />
                        ) : (
                          <BellOff className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive SMS updates</p>
                        </div>
                        {customer.preferences.smsNotifications ? (
                          <Bell className="h-5 w-5 text-green-600" />
                        ) : (
                          <BellOff className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promotional Emails</p>
                          <p className="text-sm text-muted-foreground">Receive promotional content</p>
                        </div>
                        {customer.preferences.promotionalEmails ? (
                          <Bell className="h-5 w-5 text-green-600" />
                        ) : (
                          <BellOff className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-muted-foreground">Receive order status updates</p>
                        </div>
                        {customer.preferences.orderUpdates ? (
                          <Bell className="h-5 w-5 text-green-600" />
                        ) : (
                          <BellOff className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>
                      Customer's recent orders and activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <ShoppingBag className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No recent activity to display</p>
                      <p className="text-sm">Order history and activity will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
