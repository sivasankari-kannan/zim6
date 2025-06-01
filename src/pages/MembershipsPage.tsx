import React, { useContext, useState } from 'react';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import MembershipCard from '../components/membership/MembershipCard';
import { memberships as initialMemberships } from '../data/mockData';
import { Membership } from '../types';
import toast from 'react-hot-toast';
import { useMemberContext } from '../context/MemberContext';

const MembershipsPage: React.FC = () => {
  const navigate = useNavigate();
  const [membershipsList, setMembershipsList] = useState(initialMemberships);
  const {memberships} = useMemberContext();

  const handleEdit = (membership: Membership) => {
    
  };

  const handleDelete = (membership: Membership) => {
    setMembershipsList(prev => prev.filter(m => m.id !== membership.id));
  };

  // Function to update membership plan
  const updateMembership = (updatedMembership: Membership) => {
    setMembershipsList(prev => 
      prev.map(membership => 
        membership.id === updatedMembership.id ? updatedMembership : membership
      )
    );
    toast.success('Membership plan updated successfully');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader 
        title="Memberships" 
        description="Manage your gym membership plans"
        action={
          <Link to="/memberships/new">
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              Create Plan
            </Button>
          </Link>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
        {memberships.map((membership, idx) => (
          <MembershipCard 
            key={membership.id} 
            membership={membership}
            isPopular={idx === 1}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MembershipsPage;