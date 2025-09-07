// src/components/customer/user/UserProfile.tsx
import { useState } from 'react';
import { useUserProfile, useUpdateProfile, useUploadAvatar } from '../../../hooks/useUser';
import { User, Mail, Phone, Calendar, Edit3, Camera } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import LoadingSpinner from '../../layout/LoadingSpinner';
import { toast } from 'sonner';

export default function UserProfile() {
  const { data: profile, isLoading } = useUserProfile();
  const updateProfile = useUpdateProfile();
  const uploadAvatar = useUploadAvatar();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dateOfBirth: '',
    bio: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleEdit = () => {
    setFormData({
      name: profile?.name || '',
      phone: profile?.phone || '',
      dateOfBirth: profile?.dateOfBirth || '',
      bio: profile?.bio || '',
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync(formData);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      try {
        await uploadAvatar.mutateAsync(file);
        toast.success('Avatar updated successfully');
      } catch (error) {
        toast.error('Failed to upload avatar');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Information</h1>
        {!isEditing && (
          <Button onClick={handleEdit}>
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Avatar Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatar} alt={profile?.name} />
                <AvatarFallback className="text-xl">
                  {profile?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer hover:bg-primary/90">
                  <Camera className="h-3 w-3" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-semibold">{profile?.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{profile?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={isEditing ? formData.name : profile?.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">{profile?.email}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={isEditing ? formData.phone : profile?.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={isEditing ? formData.dateOfBirth : profile?.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={isEditing ? formData.bio : profile?.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEditing}
              placeholder="Tell us a bit about yourself"
              rows={4}
            />
          </div>

          {isEditing && (
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates about your orders</p>
            </div>
            <input type="checkbox" className="toggle" checked={profile?.preferences?.orderUpdates} readOnly />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="font-medium">Newsletter</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get latest offers and updates</p>
            </div>
            <input type="checkbox" className="toggle" checked={profile?.preferences?.newsletter} readOnly />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get SMS updates about orders</p>
            </div>
            <input type="checkbox" className="toggle" checked={profile?.preferences?.smsNotifications} readOnly />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}