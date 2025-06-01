import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useMemberContext } from '../context/MemberContext';
import { Membership } from '../types';
import toast from 'react-hot-toast';

const CreatePlanPage: React.FC = () => {
  const navigate = useNavigate();
  const { addMembership } = useMemberContext();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    description: '',
    features: [''],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (formData.features.some(f => !f)) newErrors.features = 'All features must be filled out';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create new membership plan
    const newPlan: Membership = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      description: formData.description,
      features: formData.features,
      color: `bg-${['blue', 'green', 'purple', 'amber'][Math.floor(Math.random() * 4)]}-500`,
    };

    // Add membership using context
    addMembership(newPlan);
    toast.success('Membership plan created successfully');
    navigate('/memberships');
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ''],
    });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/memberships" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Memberships
        </Link>
      </div>

      <Card className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Membership Plan</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Plan Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            placeholder="Premium Plan"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              label="Price ($)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              error={errors.price}
              placeholder="99.99"
            />

            <Input
              type="number"
              label="Duration (days)"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              error={errors.duration}
              placeholder="30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Describe the benefits of this plan..."
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features
            </label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="e.g., Unlimited gym access"
                  />
                  {formData.features.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeFeature(index)}
                    >
                      <X size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addFeature}
              className="mt-2"
            >
              <Plus size={16} className="mr-2" />
              Add Feature
            </Button>
            {errors.features && (
              <p className="mt-1 text-xs text-red-500">{errors.features}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/memberships')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Plan
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreatePlanPage;