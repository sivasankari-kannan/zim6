import React from 'react';
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import StatCard from '../../components/dashboard/StatCard';
import { adminStats } from '../../data/adminMockData';
import { formatDate } from '../../lib/utils';

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of all gym owners and revenue</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Gym Owners"
          value={adminStats.totalGymOwners}
          icon={<Users className="h-full w-full" />}
        />
        <StatCard
          title="Active Owners"
          value={adminStats.activeGymOwners}
          icon={<Activity className="h-full w-full" />}
          iconColor="text-green-600"
          iconBackground="bg-green-100"
        />
        <StatCard
          title="Total Revenue"
          value={`$${adminStats.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-full w-full" />}
          iconColor="text-blue-600"
          iconBackground="bg-blue-100"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${adminStats.monthlyRevenue.toLocaleString()}`}
          icon={<TrendingUp className="h-full w-full" />}
          iconColor="text-purple-600"
          iconBackground="bg-purple-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Gym Owners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-200">
              {adminStats.recentGymOwners.map((owner) => (
                <div key={owner.id} className="py-3 flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(owner.name)}&background=0EA5E9&color=fff`}
                      alt={owner.name}
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">{owner.name}</p>
                    <p className="text-sm text-gray-500">{owner.gymName}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm text-gray-900">Joined</p>
                    <p className="text-sm text-gray-500">{formatDate(owner.joinDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {adminStats.revenueByMonth.map((month) => (
                <div key={month.month} className="flex items-center">
                  <div className="w-16 text-sm text-gray-600">{month.month}</div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary-600 h-2.5 rounded-full"
                        style={{
                          width: `${(month.revenue / 7000) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-24 text-right text-sm text-gray-900">
                    ${month.revenue.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboardPage;