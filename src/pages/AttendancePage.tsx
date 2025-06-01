import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import CheckInOutForm from '../components/attendance/CheckInOutForm';
import AttendanceList from '../components/attendance/AttendanceList';

const AttendancePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader 
        title="Attendance" 
        description="Manage member check-ins and check-outs"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Check In / Check Out</CardTitle>
          </CardHeader>
          <CardContent>
            <CheckInOutForm />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <AttendanceList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendancePage;