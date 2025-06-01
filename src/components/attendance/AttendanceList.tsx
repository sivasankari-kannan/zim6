import React, { useState } from 'react';
import { Search, Clock } from 'lucide-react';
import { Attendance } from '../../types';
import { recentAttendance, members } from '../../data/mockData';
import { formatDate, formatTime } from '../../lib/utils';
import Input from '../ui/Input';

const AttendanceList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>(recentAttendance);
  
  const filteredAttendance = attendanceRecords.filter(record =>
    record.memberName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getMemberAvatar = (id: string) => {
    const member = members.find(m => m.id === id);
    return member?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member?.name || 'User')}&background=0EA5E9&color=fff`;
  };
  
  const getDuration = (record: Attendance) => {
    if (record.duration) {
      const hours = Math.floor(record.duration / 60);
      const minutes = record.duration % 60;
      return `${hours}h ${minutes}m`;
    }
    
    if (!record.checkOut) {
      return 'Still checked in';
    }
    
    const checkIn = new Date(record.checkIn);
    const checkOut = new Date(record.checkOut);
    const durationMinutes = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60));
    
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-4 animate-enter">
      <Input
        placeholder="Search attendance records..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        leftIcon={<Search size={18} />}
        className="max-w-md"
      />
      
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Member
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Check In
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Check Out
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Duration
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredAttendance.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={getMemberAvatar(record.memberId)}
                        alt={record.memberName}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">{record.memberName}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <div>{formatDate(record.checkIn)}</div>
                  <div className="text-gray-400">{formatTime(record.checkIn)}</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {record.checkOut ? (
                    <>
                      <div>{formatDate(record.checkOut)}</div>
                      <div className="text-gray-400">{formatTime(record.checkOut)}</div>
                    </>
                  ) : (
                    <span className="text-amber-600 font-medium flex items-center">
                      <Clock size={16} className="mr-1" /> In progress
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {getDuration(record)}
                </td>
              </tr>
            ))}
            
            {filteredAttendance.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceList;