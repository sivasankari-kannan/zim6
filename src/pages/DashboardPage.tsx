import React, { useState } from 'react';
import { Users, Activity, AlertCircle, Clock, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/dashboard/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { dashboardSummary } from '../data/mockData';
import { formatDate, formatTime } from '../lib/utils';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMemberContext } from '../context/MemberContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { members } = useMemberContext();
  const [showModal, setShowModal] = useState<'all' | 'checkedIn' | 'expired' | 'expiring' | null>(null);

  const handleWhatsAppMessage = (phone: string, name: string) => {
    toast.success(`Message sent to ${name}`);
  };

  const Modal = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  const MemberList = ({ members }: { members: any[] }) => (
    <div className="divide-y divide-gray-200">
      {members.map((member) => (
        <div key={member.id} className="py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full"
              src={member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0EA5E9&color=fff`}
              alt={member.name}
            />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">{member.name}</p>
              <p className="text-xs text-gray-500">{member.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleWhatsAppMessage(member.phone, member.name)}
            >
              Message
            </Button>
            <Link to={`/members/${member.id}`}>
              <Button variant="outline" size="sm">View</Button>
            </Link>
          </div>
        </div>
      ))}
      {members.length === 0 && (
        <p className="text-center py-4 text-gray-500">No members found</p>
      )}
    </div>
  );
  
  return (
    <div>
      <PageHeader 
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'User'}`} 
        description="Here's what's happening at your gym today."
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div onClick={() => setShowModal('all')} className="cursor-pointer">
          <StatCard
            title="Total Members"
            value={dashboardSummary.totalMembers}
            icon={<Users className="h-full w-full" />}
            change={{ value: 4.5, isPositive: true }}
          />
        </div>
        
        <div onClick={() => setShowModal('checkedIn')} className="cursor-pointer">
          <StatCard
            title="Checked In Today"
            value={dashboardSummary.checkedInToday}
            icon={<Activity className="h-full w-full" />}
            change={{ value: 1.2, isPositive: false }}
            iconColor="text-secondary-600"
            iconBackground="bg-secondary-100"
          />
        </div>

        <div onClick={() => setShowModal('expired')} className="cursor-pointer">
          <StatCard
            title="Expired Members"
            value={dashboardSummary.expiredMembers}
            icon={<AlertCircle className="h-full w-full" />}
            iconColor="text-red-600"
            iconBackground="bg-red-100"
          />
        </div>

        <div onClick={() => setShowModal('expiring')} className="cursor-pointer">
          <StatCard
            title="Expiring Soon"
            value={dashboardSummary.expiringMembers}
            icon={<Clock className="h-full w-full" />}
            iconColor="text-amber-600"
            iconBackground="bg-amber-100"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Expired Memberships</CardTitle>
          </CardHeader>
          <CardContent>
            <MemberList members={dashboardSummary.expiredMembersList} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <MemberList members={dashboardSummary.expiringMembersList} />
          </CardContent>
        </Card>
      </div>

      {showModal === 'all' && (
        <Modal title="All Members">
          <MemberList members={members} />
        </Modal>
      )}

      {showModal === 'checkedIn' && (
        <Modal title="Members Checked In Today">
          <MemberList 
            members={members.filter(member => 
              dashboardSummary.recentAttendance.some(
                attendance => 
                  attendance.memberId === member.id && 
                  new Date(attendance.checkIn).toDateString() === new Date().toDateString()
              )
            )} 
          />
        </Modal>
      )}

      {showModal === 'expired' && (
        <Modal title="Expired Memberships">
          <MemberList members={dashboardSummary.expiredMembersList} />
        </Modal>
      )}

      {showModal === 'expiring' && (
        <Modal title="Memberships Expiring Soon">
          <MemberList members={dashboardSummary.expiringMembersList} />
        </Modal>
      )}
    </div>
  );
};

export default DashboardPage;