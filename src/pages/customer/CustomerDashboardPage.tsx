import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Clock, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { formatDate, formatTime } from '../../lib/utils';
import toast from 'react-hot-toast';

const CustomerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [isCheckedIn, setIsCheckedIn] = React.useState(false);
  const [checkInTime, setCheckInTime] = React.useState<Date | null>(null);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setCheckInTime(new Date());
    toast.success('Successfully checked in!');
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setCheckInTime(null);
    toast.success('Successfully checked out!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-gray-500">Track your gym activity and membership status</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Check In/Out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Current Status</p>
                  <p className="text-lg font-semibold flex items-center">
                    {isCheckedIn ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        Checked In
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-gray-500 mr-2" />
                        Not Checked In
                      </>
                    )}
                  </p>
                </div>
                {checkInTime && (
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Check-in Time</p>
                    <p className="text-lg font-semibold">{formatTime(checkInTime)}</p>
                  </div>
                )}
              </div>

              {isCheckedIn ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCheckOut}
                  leftIcon={<XCircle size={18} />}
                >
                  Check Out
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleCheckIn}
                  leftIcon={<CheckCircle size={18} />}
                >
                  Check In
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Current Plan</p>
                <p className="text-lg font-semibold">Premium Membership</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Valid Until</p>
                <p className="text-lg font-semibold">{formatDate(new Date(2024, 5, 30))}</p>
              </div>
              <div className="pt-2">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-primary-600 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">65 days remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: '2024-03-15', checkIn: '09:00 AM', checkOut: '10:30 AM' },
              { date: '2024-03-14', checkIn: '08:30 AM', checkOut: '10:00 AM' },
              { date: '2024-03-13', checkIn: '09:15 AM', checkOut: '11:00 AM' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">{activity.date}</p>
                    <p className="text-sm text-gray-500">
                      {activity.checkIn} - {activity.checkOut}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {Math.round((new Date(`2024-03-15 ${activity.checkOut}`).getTime() - 
                    new Date(`2024-03-15 ${activity.checkIn}`).getTime()) / (1000 * 60))} mins
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboardPage;