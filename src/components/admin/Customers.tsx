import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import { CustomerTable } from './customers/CustomerTable';
import { CustomerDetail } from './customers/CustomerDetail';
import { useCustomers } from '@/hooks/useUser';

export function Customers() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const { data: customers, isLoading, error } = useCustomers();


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality can be implemented here
  };

  const filteredCustomers = customers?.filter(() => {
    if (activeTab === 'all') return true;
    // Add filtering logic based on customer status, registration date, etc.
    return true;
  }) || [];

  const searchedCustomers = filteredCustomers.filter(customer =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading customers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error loading customers: {error?.message || 'Unknown error'}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">
          Manage and view all customer accounts
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search customers by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 max-w-md"
            />
          </div>
        </form>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="new">New This Month</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Customers</CardTitle>
              <CardDescription>
                View and manage all customer accounts ({searchedCustomers.length} customers)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerTable 
                customers={searchedCustomers} 
                onViewDetails={setSelectedCustomerId}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>New Customers This Month</CardTitle>
              <CardDescription>
                Customers who registered in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerTable 
                customers={searchedCustomers.filter(customer => {
                  const createdAt = new Date(customer.createdAt);
                  const thirtyDaysAgo = new Date();
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                  return createdAt >= thirtyDaysAgo;
                })} 
                onViewDetails={setSelectedCustomerId}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Customers</CardTitle>
              <CardDescription>
                Customers with recent activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerTable 
                customers={searchedCustomers} 
                onViewDetails={setSelectedCustomerId}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Customers</CardTitle>
              <CardDescription>
                Customers with no recent activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerTable 
                customers={searchedCustomers} 
                onViewDetails={setSelectedCustomerId}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CustomerDetail
        customerId={selectedCustomerId}
        isOpen={!!selectedCustomerId}
        onClose={() => setSelectedCustomerId(null)}
      />
    </div>
  );
}
