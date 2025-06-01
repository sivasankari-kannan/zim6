import React from 'react';
import { UserPlus } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import MemberList from '../components/member/MemberList';
import { Link } from 'react-router-dom';
import { useMemberContext } from '../context/MemberContext';

const MembersPage: React.FC = () => {
  const { members, trainers, deleteMember, deleteTrainer } = useMemberContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader 
        title="Members / Trainers" 
        description="Manage your gym members and trainers"
      />
      
      <MemberList 
        members={members}
        trainers={trainers}
        onDeleteMember={deleteMember}
        onDeleteTrainer={deleteTrainer}
      />
    </div>
  );
};

export default MembersPage;