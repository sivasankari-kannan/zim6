import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

const AddGymOwnerPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gymName: '',
    location: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.gymName) newErrors.gymName = 'Gym name is required';
    if (!formData.location) newErrors.location = 'Location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Here you would normally make an API call to create the gym owner
    // For demo purposes, we'll just navigate back
    navigate('/admin/gym-owners');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/admin/gym-owners" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gym Owners
        </Link>
      </div>

      <Card className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Gym Owner</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            placeholder="John Doe"
          />

          <Input
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="john@example.com"
          />

          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
            placeholder="(555) 123-4567"
          />

          <Input
            label="Gym Name"
            value={formData.gymName}
            onChange={(e) => setFormData({ ...formData, gymName: e.target.value })}
            error={errors.gymName}
            placeholder="FitnessHub Elite"
          />

          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            error={errors.location}
            placeholder="New York, NY"
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/gym-owners')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Gym Owner
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddGymOwnerPage;