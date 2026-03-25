import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface StaffMember {
  id: string;
  name: string;
  position: string;
  image: string;
  alt: string;
  role: 'manager' | 'supervisor' | 'counselor' | 'team_member'; 
  display_order: number;
}

const LeadershipTeam = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('staff_members')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;

        const mappedData: StaffMember[] = data.map((member) => ({
          id: member.id,
          name: member.name,
          position: member.designation,
          image: member.profile_image_url || '/default-profile.png',
          alt: `${member.name}'s profile picture`,
          role: member.display_order === 1 
            ? 'manager'
            : member.display_order === 2
            ? 'supervisor'
            : member.display_order === 3
            ? 'counselor'
            : 'team_member',
          display_order: member.display_order
        }));

        setStaffMembers(mappedData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching staff members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffMembers();
  }, []);

  if (loading) return <div className="text-center py-16">Loading team members...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;

  const managers = staffMembers.filter((member) => member.role === 'manager');
  const supervisors = staffMembers.filter((member) => member.role === 'supervisor');
  const counselors = staffMembers.filter((member) => member.role === 'counselor');
  const teamMembers = staffMembers.filter((member) => member.role === 'team_member');

  // For UI consistency, we'll render managers in the same way as leaders were rendered
  const renderManagerCard = (manager: StaffMember) => (
    <Link to={`/staff/${manager.id}`} key={manager.id}>
      <div className="group bg-white rounded-2xl border-gray-100 shadow-lg border-[1px] cursor-pointer hover:shadow-xl transition-all duration-300">
        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center w-full h-[250px] sm:h-[300px]">
            <img
              src={manager.image}
              alt={manager.alt}
              className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        <div className="p-6 text-center">
          <h5 className="text-xl font-semibold text-primary mb-2 group-hover:text-orange-500 transition-colors duration-300">
            {manager.name}
          </h5>
        </div>
      </div>
    </Link>
  );

  // For UI consistency, we'll render supervisors in the same way as leaders were rendered
  const renderSupervisorCard = (supervisor: StaffMember) => (
    <Link to={`/staff/${supervisor.id}`} key={supervisor.id}>
      <div className="group bg-white rounded-2xl border-gray-100 shadow-lg border-[1px] cursor-pointer hover:shadow-xl transition-all duration-300">
        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center w-full h-[250px] sm:h-[300px]">
            <img
              src={supervisor.image}
              alt={supervisor.alt}
              className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        <div className="p-6 text-center">
          <h5 className="text-xl font-semibold text-primary mb-2 group-hover:text-orange-500 transition-colors duration-300">
            {supervisor.name}
          </h5>
        </div>
      </div>
    </Link>
  );

  const renderCounselorCard = (counselor: StaffMember) => (
    <Link to={`/staff/${counselor.id}`} key={counselor.id}>
      <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl">
        <div className="flex items-center justify-center w-full h-[250px]">
          <img
            src={counselor.image}
            alt={counselor.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6 text-center">
          <h5 className="text-lg font-semibold text-primary mb-1 group-hover:text-orange-500 transition-colors duration-300">
            {counselor.name}
          </h5>
        </div>
      </div>
    </Link>
  );

  const renderMemberCard = (member: StaffMember) => (
    <Link to={`/staff/${member.id}`} key={member.id}>
      <div className="group h-full bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl">
        {/* Square Image Container */}
        <div className="w-full aspect-square bg-gray-100">
          <img
            src={member.image}
            alt={member.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Content */}
        <div className="p-4 text-center">
          <h5 className="text-xl font-semibold text-primary mb-2 group-hover:text-orange-500 transition-colors duration-300">
            {member.name}
          </h5>
        </div>
      </div>
    </Link>
  );


  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        

        {/* Managers Section */}
        {managers.length > 0 && (
          <div className="mb-10 sm:mb-14 lg:mb-16">
            <h5 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-5 sm:mb-8 text-center">
              Our Managers
            </h5>
            <div className="grid sm:max-w-[630px] mx-auto grid-cols-1 sm:grid-cols-2 gap-[30px]">
              {managers.map(renderManagerCard)}
            </div>
          </div>
        )}

        {/* Supervisors Section */}
        {supervisors.length > 0 && (
          <div className="mb-10 sm:mb-14 lg:mb-16">
            <h5 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-5 sm:mb-8 text-center">
              Our Supervisors
            </h5>
            <div className="grid sm:max-w-[630px] mx-auto grid-cols-1 sm:grid-cols-2 gap-[30px]">
              {supervisors.map(renderSupervisorCard)}
            </div>
          </div>
        )}

        {/* Counselors Section */}
        {counselors.length > 0 && (
          <div className="mb-10 sm:mb-14 lg:mb-16">
            <h5 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-5 sm:mb-8 text-center">
              Our Counselors
            </h5>
            <div className="grid lg:max-w-[960px] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
              {counselors.map(renderCounselorCard)}
            </div>
          </div>
        )}

        {/* Team Members Section */}
        {teamMembers.length > 0 && (
          <div className="mb-10 sm:mb-14 lg:mb-16">
            <h5 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-5 sm:mb-8 text-center">
              Team Members
            </h5>
            <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {teamMembers.map(renderMemberCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadershipTeam;