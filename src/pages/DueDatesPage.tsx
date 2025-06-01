import React from 'react';
import { Calendar } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { members, memberships } from '../data/mockData';
import { formatDate } from '../lib/utils';
import Badge from '../components/ui/Badge';

const DueDatesPage: React.FC = () => {
  const getMembershipDetails = (membershipId: string) => {
    return memberships.find(m => m.id === membershipId);
  };

  const calculateDueDate = (joinDate: string, duration: number) => {
    const date = new Date(joinDate);
    date.setDate(date.getDate() + duration);
    return date;
  };

  const calculateDaysLeft = (dueDate: Date) => {
    const today = new Date();
    const diff = dueDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getStatusBadgeVariant = (daysLeft: number) => {
    if (daysLeft <= 0) return 'danger';
    if (daysLeft <= 30) return 'warning';
    return 'success';
  };

  const getStatusText = (daysLeft: number) => {
    if (daysLeft <= 0) return 'Expired';
    if (daysLeft <= 30) return 'Upcoming';
    return 'Active';
  };

  return (
    <div>
      <PageHeader 
        title="Due Dates" 
        description="Track membership renewals and due dates"
      />
      
      <Card className="mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Left
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member) => {
                const membership = getMembershipDetails(member.membershipId);
                const dueDate = calculateDueDate(member.joinDate, membership?.duration || 0);
                const daysLeft = calculateDaysLeft(dueDate);
                
                return (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full"
                            src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
                            alt={member.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{membership?.name}</div>
                      <div className="text-sm text-gray-500">{membership?.duration} days</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(member.joinDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(dueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {daysLeft} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusBadgeVariant(daysLeft)}>
                        {getStatusText(daysLeft)}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DueDatesPage;