// src/components/customer/user/UserSettings.tsx
import { useState } from 'react';
import { useUserProfile, useUpdateProfile } from '../../../hooks/useUser';
import { Bell, Mail, MessageCircle, Save, Shield,  Package } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Switch } from '../../ui/switch';
import LoadingSpinner from '../../layout/LoadingSpinner';
import { toast } from 'sonner';

export default function UserSettings() {
  const { data: profile, isLoading } = useUserProfile();
  const updateProfile = useUpdateProfile();
  
  const [preferences, setPreferences] = useState({
    newsletter: profile?.preferences?.newsletter ?? true,
    smsNotifications: profile?.preferences?.smsNotifications ?? true,
    orderUpdates: profile?.preferences?.orderUpdates ?? true,
    promotionalEmails: profile?.preferences?.promotionalEmails ?? true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSavePreferences = async () => {
    setIsSaving(true);
    try {
      await updateProfile.mutateAsync({
        preferences,
      });
      toast.success('Preferences updated successfully');
    } catch {
      toast.error('Failed to update preferences');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const PreferenceCard = ({ 
    title, 
    description, 
    icon: Icon, 
    enabled, 
    onToggle 
  }: {
    title: string;
    description: string;
    icon: React.ElementType;
    enabled: boolean;
    onToggle: (checked: boolean) => void;
  }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <Button onClick={handleSavePreferences} disabled={isSaving}>
          {isSaving ? (
            <>
              <Save className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <PreferenceCard
            title="Order Updates"
            description="Get notified about order status changes, shipping updates, and delivery confirmations"
            icon={Package}
            enabled={preferences.orderUpdates}
            onToggle={(checked) => setPreferences({ ...preferences, orderUpdates: checked })}
          />
          
          <PreferenceCard
            title="SMS Notifications"
            description="Receive important updates via text message"
            icon={MessageCircle}
            enabled={preferences.smsNotifications}
            onToggle={(checked) => setPreferences({ ...preferences, smsNotifications: checked })}
          />
          
          <PreferenceCard
            title="Newsletter"
            description="Get our weekly newsletter with exclusive deals and new product announcements"
            icon={Mail}
            enabled={preferences.newsletter}
            onToggle={(checked) => setPreferences({ ...preferences, newsletter: checked })}
          />
          
          <PreferenceCard
            title="Promotional Emails"
            description="Receive special offers, discounts, and promotional content"
            icon={Mail}
            enabled={preferences.promotionalEmails}
            onToggle={(checked) => setPreferences({ ...preferences, promotionalEmails: checked })}
          />
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Account Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="font-medium">Change Password</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>

         
        </CardContent>
      </Card>

      {/* Privacy Settings */}
    
      {/* Connected Accounts */}
  

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div>
              <p className="font-medium text-red-700">Delete Account</p>
              <p className="text-sm text-red-600">Permanently delete your account and all associated data</p>
            </div>
            <Button variant="destructive" size="sm">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}