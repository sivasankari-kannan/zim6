import { Member, Membership, Attendance, DashboardSummary, Trainer } from '../types';
import { addDays, subDays, subMonths, format } from 'date-fns';

export const memberships: Membership[] = [
  {
    id: '1',
    name: 'Basic',
    duration: 30,
    price: 49.99,
    description: 'Access to basic facilities and classes',
    features: ['Gym access', 'Basic equipment', '2 classes per week'],
    color: 'bg-blue-500',
  },
  {
    id: '2',
    name: 'Standard',
    duration: 30,
    price: 79.99,
    description: 'Full access to all facilities and classes',
    features: [
      'Gym access',
      'All equipment',
      'Unlimited classes',
      'Pool access',
    ],
    color: 'bg-green-500',
  },
  {
    id: '3',
    name: 'Premium',
    duration: 30,
    price: 119.99,
    description: 'VIP access with personal training sessions',
    features: [
      'Gym access',
      'All equipment',
      'Unlimited classes',
      'Pool access',
      'Sauna access',
      '2 PT sessions per month',
    ],
    color: 'bg-purple-500',
  },
  {
    id: '4',
    name: 'Annual',
    duration: 365,
    price: 599.99,
    description: 'Full year of standard membership at a discount',
    features: [
      'Gym access',
      'All equipment',
      'Unlimited classes',
      'Pool access',
      '15% off merchandise',
    ],
    color: 'bg-amber-500',
  },
];

export const trainers: Trainer[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    phone: '(555) 111-2233',
    specialization: 'Strength Training',
    experience: '5 years',
    joinDate: subMonths(new Date(), 2).toISOString(),
    status: 'active',
    trainerId: 'TR001',
    assignedMembers: ['1', '2']
  },
  {
    id: '2',
    name: 'Sarah Martinez',
    email: 'sarah.m@example.com',
    phone: '(555) 444-5566',
    specialization: 'Yoga & Pilates',
    experience: '7 years',
    joinDate: subMonths(new Date(), 8).toISOString(),
    status: 'active',
    trainerId: 'TR002',
    assignedMembers: ['3']
  },
  {
    id: '3',
    name: 'David Kim',
    email: 'david.k@example.com',
    phone: '(555) 777-8899',
    specialization: 'CrossFit',
    experience: '4 years',
    joinDate: subMonths(new Date(), 1).toISOString(),
    status: 'active',
    trainerId: 'TR003'
  }
];

export const members: Member[] = [
  {
    id: '1',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '(555) 123-4567',
    membershipId: '3',
    trainerId: '1',
    joinDate: subMonths(new Date(), 6).toISOString(),
    status: 'active',
    memberId: 'MEM001',
    expiryDate: addDays(new Date(), 5).toISOString()
  },
  {
    id: '2',
    name: 'James Rodriguez',
    email: 'james@example.com',
    phone: '(555) 987-6543',
    membershipId: '2',
    trainerId: '1',
    joinDate: subMonths(new Date(), 2).toISOString(),
    status: 'active',
    memberId: 'MEM002',
    expiryDate: subDays(new Date(), 2).toISOString()
  },
  {
    id: '3',
    name: 'Olivia Chen',
    email: 'olivia@example.com',
    phone: '(555) 456-7890',
    membershipId: '4',
    trainerId: '2',
    joinDate: subMonths(new Date(), 10).toISOString(),
    status: 'active',
    memberId: 'MEM003',
    expiryDate: addDays(new Date(), 15).toISOString()
  },
  {
    id: '4',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '(555) 234-5678',
    membershipId: '1',
    joinDate: subDays(new Date(), 5).toISOString(),
    status: 'pending',
    memberId: 'MEM004',
    expiryDate: subDays(new Date(), 5).toISOString()
  },
  {
    id: '5',
    name: 'Sophia Martinez',
    email: 'sophia@example.com',
    phone: '(555) 345-6789',
    membershipId: '2',
    joinDate: subMonths(new Date(), 1).toISOString(),
    status: 'active',
    memberId: 'MEM005',
    expiryDate: subDays(new Date(), 1).toISOString()
  },
  {
    id: '6',
    name: 'Daniel Kim',
    email: 'daniel@example.com',
    phone: '(555) 876-5432',
    membershipId: '1',
    joinDate: subDays(new Date(), 20).toISOString(),
    status: 'inactive',
    memberId: 'MEM006',
    expiryDate: addDays(new Date(), 10).toISOString()
  },
];

export const todayAttendance: Attendance[] = [
  {
    id: '1',
    memberId: '1',
    memberName: 'Emma Wilson',
    checkIn: subHours(new Date(), 3).toISOString(),
    checkOut: subHours(new Date(), 1).toISOString(),
    duration: 120,
    uniqueId: 'MEM001'
  },
  {
    id: '2',
    memberId: '2',
    memberName: 'James Rodriguez',
    checkIn: subHours(new Date(), 2).toISOString(),
    checkOut: null,
    uniqueId: 'MEM002'
  },
  {
    id: '3',
    memberId: '5',
    memberName: 'Sophia Martinez',
    checkIn: subHours(new Date(), 4).toISOString(),
    checkOut: subHours(new Date(), 2).toISOString(),
    duration: 120,
    uniqueId: 'MEM005'
  },
];

export const recentAttendance: Attendance[] = [
  ...todayAttendance,
  {
    id: '4',
    memberId: '3',
    memberName: 'Olivia Chen',
    checkIn: subDays(new Date(), 1).toISOString(),
    checkOut: subDays(addHours(new Date(), -1), 1).toISOString(),
    duration: 90,
    uniqueId: 'MEM003'
  },
  {
    id: '5',
    memberId: '1',
    memberName: 'Emma Wilson',
    checkIn: subDays(new Date(), 2).toISOString(),
    checkOut: subDays(addHours(new Date(), -1.5), 2).toISOString(),
    duration: 90,
    uniqueId: 'MEM001'
  },
];

// Get expired and expiring members
const expiredMembers = members.filter(m => new Date(m.expiryDate!) < new Date());
const expiringMembers = members.filter(m => {
  const expiryDate = new Date(m.expiryDate!);
  const today = new Date();
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return daysUntilExpiry > 0 && daysUntilExpiry <= 15;
});

export const dashboardSummary: DashboardSummary = {
  totalMembers: members.length,
  activeMembers: members.filter(m => m.status === 'active').length,
  newMembersToday: 1,
  checkedInToday: todayAttendance.length,
  expiredMembers: expiredMembers.length,
  expiringMembers: expiringMembers.length,
  membershipStats: [
    { name: 'Basic', value: members.filter(m => m.membershipId === '1').length },
    { name: 'Standard', value: members.filter(m => m.membershipId === '2').length },
    { name: 'Premium', value: members.filter(m => m.membershipId === '3').length },
    { name: 'Annual', value: members.filter(m => m.membershipId === '4').length },
  ],
  recentAttendance: recentAttendance.slice(0, 5),
  expiredMembersList: expiredMembers,
  expiringMembersList: expiringMembers,
};

// Helper function
function subHours(date: Date, hours: number): Date {
  return new Date(date.getTime() - hours * 60 * 60 * 1000);
}

function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}