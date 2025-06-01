import React, { createContext, useContext, useState } from 'react';
import { Member, Trainer, Membership } from '../types';
import { members as initialMembers, trainers as initialTrainers, memberships as initialMemberships } from '../data/mockData';

interface MemberContextType {
  members: Member[];
  trainers: Trainer[];
  memberships: Membership[];
  addMember: (member: Member) => void;
  updateMember: (member: Member) => void;
  deleteMember: (id: string) => void;
  addTrainer: (trainer: Trainer) => void;
  updateTrainer: (trainer: Trainer) => void;
  deleteTrainer: (id: string) => void;
  addMembership: (membership: Membership) => void;
  updateMembership: (membership: Membership) => void;
  deleteMembership: (id: string) => void;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error('useMemberContext must be used within a MemberProvider');
  }
  return context;
};

export const MemberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [trainers, setTrainers] = useState<Trainer[]>(initialTrainers);
  const [memberships, setMemberships] = useState<Membership[]>(initialMemberships);

  const addMember = (member: Member) => {
    setMembers(prev => [...prev, member]);
  };

  const updateMember = (updatedMember: Member) => {
    setMembers(prev => prev.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  const addTrainer = (trainer: Trainer) => {
    setTrainers(prev => [...prev, trainer]);
  };

  const updateTrainer = (updatedTrainer: Trainer) => {
    setTrainers(prev => prev.map(trainer => 
      trainer.id === updatedTrainer.id ? updatedTrainer : trainer
    ));
  };

  const deleteTrainer = (id: string) => {
    setTrainers(prev => prev.filter(trainer => trainer.id !== id));
  };

  const addMembership = (membership: Membership) => {
    setMemberships(prev => [...prev, membership]);
  };

  const updateMembership = (updatedMembership: Membership) => {
    setMemberships(prev => prev.map(membership =>
      membership.id === updatedMembership.id ? updatedMembership : membership
    ));
  };

  const deleteMembership = (id: string) => {
    setMemberships(prev => prev.filter(membership => membership.id !== id));
  };

  return (
    <MemberContext.Provider value={{
      members,
      trainers,
      memberships,
      addMember,
      updateMember,
      deleteMember,
      addTrainer,
      updateTrainer,
      deleteTrainer,
      addMembership,
      updateMembership,
      deleteMembership,
    }}>
      {children}
    </MemberContext.Provider>
  );
};