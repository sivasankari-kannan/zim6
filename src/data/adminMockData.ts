import { GymOwner, AdminStats } from '../types';
import { subDays, subMonths, format } from 'date-fns';

export const gymOwners: GymOwner[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@fitnesshub.com',
    phone: '(555) 123-4567',
    gymName: 'FitnessHub Elite',
    location: 'New York, NY',
    joinDate: subMonths(new Date(), 6).toISOString(),
    status: 'active',
    lastLogin: subDays(new Date(), 1).toISOString(),
    subscriptionStatus: 'active',
    revenue: 2499.99
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@powerzone.com',
    phone: '(555) 234-5678',
    gymName: 'PowerZone Fitness',
    location: 'Los Angeles, CA',
    joinDate: subMonths(new Date(), 3).toISOString(),
    status: 'active',
    lastLogin: subDays(new Date(), 2).toISOString(),
    subscriptionStatus: 'active',
    revenue: 1899.99
  },
  {
    id: '3',
    name: 'Mike Williams',
    email: 'mike@strengthcore.com',
    phone: '(555) 345-6789',
    gymName: 'StrengthCore Gym',
    location: 'Chicago, IL',
    joinDate: subDays(new Date(), 15).toISOString(),
    status: 'active',
    lastLogin: new Date().toISOString(),
    subscriptionStatus: 'trial',
    revenue: 0
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@fitlife.com',
    phone: '(555) 456-7890',
    gymName: 'FitLife Center',
    location: 'Miami, FL',
    joinDate: subMonths(new Date(), 1).toISOString(),
    status: 'inactive',
    lastLogin: subDays(new Date(), 30).toISOString(),
    subscriptionStatus: 'expired',
    revenue: 899.99
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@elitegym.com',
    phone: '(555) 567-8901',
    gymName: 'Elite Performance Gym',
    location: 'Houston, TX',
    joinDate: subMonths(new Date(), 2).toISOString(),
    status: 'active',
    lastLogin: subDays(new Date(), 3).toISOString(),
    subscriptionStatus: 'active',
    revenue: 1699.99
  }
];

export const adminStats: AdminStats = {
  totalGymOwners: gymOwners.length,
  activeGymOwners: gymOwners.filter(owner => owner.status === 'active').length,
  totalRevenue: gymOwners.reduce((total, owner) => total + owner.revenue, 0),
  monthlyRevenue: 3599.99,
  recentGymOwners: gymOwners.sort((a, b) => 
    new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
  ).slice(0, 5),
  ownersByStatus: [
    { name: 'Active', value: gymOwners.filter(o => o.status === 'active').length },
    { name: 'Inactive', value: gymOwners.filter(o => o.status === 'inactive').length }
  ],
  revenueByMonth: [
    { month: 'Jan', revenue: 4500 },
    { month: 'Feb', revenue: 5200 },
    { month: 'Mar', revenue: 4800 },
    { month: 'Apr', revenue: 6100 },
    { month: 'May', revenue: 5900 },
    { month: 'Jun', revenue: 6500 }
  ]
};