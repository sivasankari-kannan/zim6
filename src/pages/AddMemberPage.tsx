import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { memberships, trainers } from '../data/mockData';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import toast from 'react-hot-toast';
import { Member } from '../types';
import { useMemberContext } from '../context/MemberContext';

const AddMemberPage: React.FC = () => {
  const navigate = useNavigate();
  const { addMember } = useMemberContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipId: '',
    trainerId: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.membershipId) newErrors.membershipId = 'Membership is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create new member object
    const newMember: Member = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      membershipId: formData.membershipId,
      trainerId: formData.trainerId || undefined,
      joinDate: new Date().toISOString(),
      status: 'active',
      memberId: `MEM${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    };

    // Add member using context
    addMember(newMember);
    toast.success('Member added successfully');
    navigate('/members');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Link>
      </div>

      <Card className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Member</h1>
        
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Membership Plan
            </label>
            <select
              value={formData.membershipId}
              onChange={(e) => setFormData({ ...formData, membershipId: e.target.value })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm ${
                errors.membershipId ? 'border-red-500' : ''
              }`}
            >
              <option value="">Select a plan</option>
              {memberships.map((membership) => (
                <option key={membership.id} value={membership.id}>
                  {membership.name} - ${membership.price}/month
                </option>
              ))}
            </select>
            {errors.membershipId && (
              <p className="mt-1 text-xs text-red-500">{errors.membershipId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign Trainer (Optional)
            </label>
            <select
              value={formData.trainerId}
              onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">Select a trainer</option>
              {trainers.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.name} - {trainer.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/members')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Member
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddMemberPage;