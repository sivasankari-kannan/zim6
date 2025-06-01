import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, Award, Users, X } from 'lucide-react';
import { members } from '../data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { formatDate } from '../lib/utils';
import { useMemberContext } from '../context/MemberContext';
import { Member } from '../types';
import toast from 'react-hot-toast';

const TrainerDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { trainers, members: allMembers, updateTrainer } = useMemberContext();
  const trainer = trainers.find(t => t.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(trainer);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>(trainer?.assignedMembers || []);

  // Get assigned members details
  const assignedMembers = allMembers.filter(m => selectedMembers.includes(m.id));
  
  // Get available members (not assigned to this trainer)
  const availableMembers = allMembers.filter(m => !selectedMembers.includes(m.id));

  if (!trainer) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Trainer not found</h2>
          <p className="mt-2 text-gray-600">The trainer you're looking for doesn't exist.</p>
          <Link to="/members" className="mt-4 inline-block">
            <Button variant="primary" leftIcon={<ArrowLeft size={16} />}>
              Back to Members
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData!, [field]: value });
  };

  const handleSave = () => {
    if (!formData) return;
    
    const updatedTrainer = {
      ...formData,
      assignedMembers: selectedMembers
    };
    
    updateTrainer(updatedTrainer);
    toast.success('Trainer details updated successfully');
    setIsEditing(false);
  };

  const handleRemoveMember = (memberId: string) => {
    setSelectedMembers(prev => prev.filter(id => id !== memberId));
    toast.success('Member removed from trainer');
  };

  const handleAddMember = (memberId: string) => {
    setSelectedMembers(prev => [...prev, memberId]);
  };

  const MemberAssignmentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Assign New Members</h3>
          <button onClick={() => setShowMemberModal(false)} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          {availableMembers.map(member => (
            <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <img
                  src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
                  alt={member.name}
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleAddMember(member.id);
                  toast.success(`${member.name} assigned to trainer`);
                }}
              >
                Assign
              </Button>
            </div>
          ))}
          
          {availableMembers.length === 0 && (
            <p className="text-center text-gray-500 py-4">No available members to assign</p>
          )}
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => setShowMemberModal(false)}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link to="/members" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Link>
        <Button 
          variant="outline" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel Edit' : 'Edit Trainer'}
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src={trainer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(trainer.name)}&background=0EA5E9&color=fff`}
              alt={trainer.name}
              className="h-16 w-16 rounded-full"
            />
            <div className="ml-4">
              {isEditing ? (
                <input
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="text-2xl font-bold text-gray-900 border rounded px-2 py-1"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900">{trainer.name}</h1>
              )}
              <div className="mt-1 flex items-center">
                <Badge variant={trainer.status === 'active' ? 'success' : 'danger'}>
                  {trainer.status.charAt(0).toUpperCase() + trainer.status.slice(1)}
                </Badge>
                <span className="ml-2 text-sm text-gray-500">Trainer ID: {trainer.trainerId}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {isEditing ? (
                        <input
                          type="email"
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                          value={formData?.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                        />
                      ) : (
                        trainer.email
                      )}
                    </dd>
                  </div>

                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {isEditing ? (
                        <input
                          type="text"
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                          value={formData?.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                        />
                      ) : (
                        trainer.phone
                      )}
                    </dd>
                  </div>

                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Calendar className="h-4 w-4 mr-2" />
                      Joined
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {formatDate(trainer.joinDate)}
                    </dd>
                  </div>

                  <div className="flex items-center">
                    <dt className="flex items-center text-sm font-medium text-gray-500 w-24">
                      <Award className="h-4 w-4 mr-2" />
                      Experience
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {isEditing ? (
                        <input
                          type="text"
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                          value={formData?.experience}
                          onChange={(e) => handleChange('experience', e.target.value)}
                        />
                      ) : (
                        trainer.experience
                      )}
                    </dd>
                  </div>
                </dl>

                {isEditing && (
                  <div className="mt-4">
                    <Button variant="primary" onClick={handleSave}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specialization</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <textarea
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    rows={2}
                    value={formData?.specialization}
                    onChange={(e) => handleChange('specialization', e.target.value)}
                  />
                ) : (
                  <p className="text-gray-700">{trainer.specialization}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Assigned Members</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowMemberModal(true)}
                  >
                    Assign New Member
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-gray-200">
                  {assignedMembers.map((member) => (
                    <div key={member.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
                          alt={member.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/members/${member.id}`}>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {assignedMembers.length === 0 && (
                    <div className="text-center py-4">
                      <Users className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">No members assigned</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showMemberModal && <MemberAssignmentModal />}
    </div>
  );
};

export default TrainerDetailsPage;