
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Phone, Mail, Edit, BookOpen, GraduationCap, Calendar, Clock } from 'lucide-react';

interface CounsellingBooking {
  id: string;
  student_name: string;
  student_email: string;
  student_phone: string;
  preferred_destination?: string;
  preferred_start?: string; 
  course_interest?: string;
  current_education_level?: string;
  english_test_score?: string;
  work_experience?: string;
  message?: string;
  preferred_date?: string;
  preferred_time?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

interface BookingCardProps {
  booking: CounsellingBooking;
  onUpdateClick: (booking: CounsellingBooking) => void;
  getStatusColor: (status: string) => string;
}

const BookingCard = ({ booking, onUpdateClick, getStatusColor }: BookingCardProps) => {
  return (
    <div className="border rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-gray-500" />
          <div>
            <h3 className="font-semibold text-lg">{booking.student_name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{booking.student_email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{booking.student_phone}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={getStatusColor(booking.status)}>
            {booking.status}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateClick(booking)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Update
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          {booking.preferred_destination && (
            <p><strong>Destination:</strong> {booking.preferred_destination}</p>
          )}
          {booking.preferred_start && (
  <p><strong>Preferred Start:</strong> {booking.preferred_start}</p>
)}
          {booking.course_interest && (
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span><strong>Consultation Mode:</strong> {booking.course_interest}</span>
            </div>
          )}
          {booking.current_education_level && (
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span><strong>Nearest Branch:</strong> {booking.current_education_level}</span>
            </div>
          )}
          {booking.english_test_score && (
            <p><strong>English Test Score:</strong> {booking.english_test_score}</p>
          )}
          {booking.work_experience && (
            <p><strong>Work Experience:</strong> {booking.work_experience}</p>
          )}
          {booking.preferred_date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span><strong>Date:</strong> {new Date(booking.preferred_date).toLocaleDateString()}</span>
              {booking.preferred_time && (
                <>
                  <Clock className="h-4 w-4 ml-2" />
                  <span>{booking.preferred_time}</span>
                </>
              )}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <p className="text-gray-500">
            <strong>Submitted:</strong> {new Date(booking.created_at).toLocaleDateString()}
          </p>
          {booking.updated_at !== booking.created_at && (
            <p className="text-gray-500">
              <strong>Last Updated:</strong> {new Date(booking.updated_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {booking.message && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="font-medium text-sm">Message:</p>
          <p className="text-sm text-gray-700 mt-1">{booking.message}</p>
        </div>
      )}

      {booking.admin_notes && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="font-medium text-sm text-blue-800">Admin Notes:</p>
          <p className="text-sm text-blue-700 mt-1">{booking.admin_notes}</p>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
