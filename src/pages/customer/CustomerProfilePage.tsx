import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Phone, User } from 'lucide-react';
import toast from 'react-hot-toast';

const CustomerProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(555) 123-4567', // Mock data
    address: '123 Main St, City, State', // Mock data
  });

  const handleSave = () => {
    // In a real app, this would call an API
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Personal Information</span>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=0EA5E9&color=fff`}
                alt={formData.name}
                className="h-20 w-20 rounded-full"
              />
              {isEditing && (
                <Button variant="outline\" className="ml-4">
                  Change Photo
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                {isEditing ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    leftIcon={<User size={18} />}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    leftIcon={<Mail size={18} />}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                {isEditing ? (
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    leftIcon={<Phone size={18} />}
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{formData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{formData.address}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end">
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerProfilePage;