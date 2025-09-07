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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, Mail, Phone, MapPin } from 'lucide-react';
import { type UserProfile } from '@/types/user';

interface CustomerTableProps {
  customers: UserProfile[];
  onViewDetails: (customerId: string) => void;
} 

export function CustomerTable({ customers, onViewDetails }: CustomerTableProps) {
  const [sortField, setSortField] = useState<keyof UserProfile>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof UserProfile) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue && bValue && aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue && bValue && aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getCustomerStatus = (customer: UserProfile) => {
    // Simple logic to determine customer status based on registration date
    const createdAt = new Date(customer.createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    if (createdAt >= thirtyDaysAgo) {
      return { label: 'New', variant: 'default' as const };
    }
    
    return { label: 'Active', variant: 'secondary' as const };
  };

  if (customers.length === 0) {
    return (
      <div className="text-center py-8">
        <Avatar className="mx-auto h-12 w-12">
          <AvatarFallback>👥</AvatarFallback>
        </Avatar>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No customers found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          There are no customers matching the current filter.
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
              onClick={() => handleSort('name')}
            >
              Customer
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('email')}
            >
              Contact
            </TableHead>
            <TableHead>Addresses</TableHead>
            <TableHead>Status</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('createdAt')}
            >
              Member Since
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCustomers.map((customer) => {
            const statusInfo = getCustomerStatus(customer);
            const defaultAddress = customer.addresses?.find(addr => addr.isDefault);
            
            return (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={customer.avatar} alt={customer.name} />
                      <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ID: {customer.id.slice(-8).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span>{customer.email}</span>
                    </div>
                    {customer.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{customer.phone}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {defaultAddress ? (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="truncate max-w-[200px]">
                        {defaultAddress.city}, {defaultAddress.state}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">No address</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={statusInfo.variant}>
                    {statusInfo.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{format(new Date(customer.createdAt), 'MMM dd, yyyy')}</span>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(customer.createdAt), 'HH:mm')}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(customer.id)}
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
