import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import toast from 'react-hot-toast';
import { Trainer } from '../types';
import { useMemberContext } from '../context/MemberContext';

const AddTrainerPage: React.FC = () => {
  const navigate = useNavigate();
  const {addTrainer} = useMemberContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTrainer:Trainer = {
      id:Math.random().toString(),
      name:formData.name,
      email:formData.email,
      phone:formData.email,
      specialization:formData.specialization,
      experience:formData.experience,
      joinDate:new Date().toISOString(),
      status:"active",
      trainerId:"TR004"
    } 

    addTrainer(newTrainer);
    toast.success('Trainer added successfully');
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Trainer</h1>
        
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
            label="Specialization"
            value={formData.specialization}
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            error={errors.specialization}
            placeholder="e.g., Strength Training, Yoga, CrossFit"
          />

          <Input
            label="Experience"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            error={errors.experience}
            placeholder="e.g., 5 years"
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/members')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Trainer
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddTrainerPage;