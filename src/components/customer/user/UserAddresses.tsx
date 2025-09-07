// src/components/customer/user/UserAddresses.tsx
import { useState } from 'react';
import { useUserAddresses, useCreateAddress, useUpdateAddress, useDeleteAddress, useSetDefaultAddress } from '../../../hooks/useUser';
import { Plus, Edit2, Trash2, MapPin, Home, Building, Check } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent } from '../../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem } from '../../ui/select';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { toast } from 'sonner';
import type { Address, AddressType } from '../../../types/user';
import LoadingSpinner from '@/components/layout/LoadingSpinner';

export default function UserAddresses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({});

  const { data: addresses = [], isLoading } = useUserAddresses();
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();
  const deleteAddress = useDeleteAddress();
  const setDefaultAddress = useSetDefaultAddress();

  const handleAddNew = () => {
    setEditingAddress(null);
    setFormData({
      type: 'shipping',
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      isDefault: false,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      type: address.type,
      firstName: address.firstName,
      lastName: address.lastName,
      company: address.company || '',
      address: address.address,
      address2: address.address2 || '',
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingAddress) {
        await updateAddress.mutateAsync({
          id: editingAddress.id,
          address: formData as Partial<Address>,
        });
        toast.success('Address updated successfully');
      } else {
        await createAddress.mutateAsync(formData as Omit<Address, 'id'>);
        toast.success('Address added successfully');
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to save address');
    }
  };

  const handleDelete = async (addressId: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress.mutateAsync(addressId);
        toast.success('Address deleted successfully');
      } catch (error) {
        toast.error('Failed to delete address');
      }
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      await setDefaultAddress.mutateAsync(addressId);
      toast.success('Default address updated');
    } catch (error) {
      toast.error('Failed to update default address');
    }
  };

  const AddressCard = ({ address }: { address: Address }) => {
    const Icon = address.type === 'shipping' ? Home : Building;
    
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{address.firstName} {address.lastName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {address.type === 'shipping' ? 'Shipping Address' : 'Billing Address'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {address.isDefault && (
                <Badge variant="default" className="gap-1">
                  <Check className="h-3 w-3" />
                  Default
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(address)}
                className="h-8 w-8 p-0"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(address.id)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <p>{address.address}</p>
            {address.address2 && <p>{address.address2}</p>}
            <p>{address.city}, {address.state} {address.zipCode}</p>
            <p>{address.country}</p>
            {address.company && <p className="text-gray-600 dark:text-gray-400">{address.company}</p>}
          </div>

          <Separator className="my-4" />

          <div className="flex gap-2">
            {!address.isDefault && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSetDefault(address.id)}
              >
                Set as Default
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Addresses</h1>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No addresses yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add your first address to make checkout faster and easier
            </p>
            <Button onClick={handleAddNew}>
              Add Address
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      )}

      {/* Address Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name *</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label>Last Name *</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Company (Optional)</Label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company name"
              />
            </div>

            <div className="space-y-2">
              <Label>Address Line 1 *</Label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Main Street"
              />
            </div>

            <div className="space-y-2">
              <Label>Address Line 2 (Optional)</Label>
              <Input
                value={formData.address2}
                onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                placeholder="Apartment, suite, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City *</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="New York"
                />
              </div>
              <div className="space-y-2">
                <Label>State *</Label>
                <Input
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="NY"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ZIP Code *</Label>
                <Input
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="10001"
                />
              </div>
              <div className="space-y-2">
                <Label>Country *</Label>
                <Input
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="United States"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Address Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as unknown as AddressType })}
                >
                  <SelectContent>
                    <SelectItem value="shipping">Shipping</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  />
                  <Label htmlFor="isDefault">Set as default address</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!formData.firstName || !formData.lastName || !formData.address}>
              {editingAddress ? 'Update Address' : 'Add Address'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}