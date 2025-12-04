import React from "react";
import { Link } from "react-router";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaBook,
  FaStickyNote,
  FaFolder,
  FaUsers,
  FaCalendarAlt,
  FaPlusCircle,
  FaChartLine,
  FaBell,
  FaHistory
} from "react-icons/fa";
import useAuth from "../hook/useAuth";
import useAxiosSecure from "../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DashboardHome = () => {
  const { user } = useAuth();
  const role = user?.role;
  const axiosSecure = useAxiosSecure();

  // Fetch role-specific data
  const { data: stats = {} } = useQuery({
    queryKey: ["dashboardStats", role, user?.email],
    queryFn: async () => {
      switch (role) {
        case "student":
          const [notesRes, bookingsRes] = await Promise.all([
            axiosSecure.get(`/notes-count?email=${user.email}`),
            axiosSecure.get(`/bookings-count?email=${user.email}`)
          ]);
          return {
            notesCount: notesRes.data.count || 0,
            bookingsCount: bookingsRes.data.count || 0
          };
        case "tutor":
          const sessionsRes = await axiosSecure.get(`/tutor-sessions-count?email=${user.email}`);
          return {
            sessionsCount: sessionsRes.data.count || 0
          };
        case "admin":
          const usersRes = await axiosSecure.get(`/users-count`);
          return {
            usersCount: usersRes.data.count || 0
          };
        default:
          return {};
      }
    },
    enabled: !!user?.email && !!role
  });

  // Fetch recent activity data
  const { data: recentActivity = [] } = useQuery({
    queryKey: ["recentActivity", role, user?.email],
    queryFn: async () => {
      try {
        switch (role) {
          case "student":
            const [notesRes, bookingsRes] = await Promise.all([
              axiosSecure.get(`/recent-notes?email=${user.email}&limit=3`),
              axiosSecure.get(`/recent-bookings?email=${user.email}&limit=3`)
            ]);
            
            const notesActivity = notesRes.data.map(note => ({
              id: note._id,
              type: "note",
              title: "Created a note",
              description: note.title,
              time: new Date(note.createdAt).toLocaleDateString(),
              icon: <FaStickyNote className="text-blue-500" />
            }));
            
            const bookingsActivity = bookingsRes.data.map(booking => ({
              id: booking._id,
              type: "booking",
              title: "Booked a session",
              description: booking.title,
              time: new Date(booking.createdAt).toLocaleDateString(),
              icon: <FaCalendarAlt className="text-green-500" />
            }));
            
            return [...notesActivity, ...bookingsActivity]
              .sort((a, b) => new Date(b.time) - new Date(a.time))
              .slice(0, 5);
              
          case "tutor":
            const sessionsRes = await axiosSecure.get(`/recent-tutor-sessions?email=${user.email}&limit=5`);
            return sessionsRes.data.map(session => ({
              id: session._id,
              type: "session",
              title: "Created a session",
              description: session.title,
              time: new Date(session.createdAt).toLocaleDateString(),
              icon: <FaBook className="text-purple-500" />
            }));
            
          case "admin":
            const usersRes = await axiosSecure.get(`/recent-users?limit=5`);
            return usersRes.data.map(user => ({
              id: user._id,
              type: "user",
              title: "New user registered",
              description: user.name,
              time: new Date(user.createdAt).toLocaleDateString(),
              icon: <FaUsers className="text-orange-500" />
            }));
            
          default:
            return [];
        }
      } catch (error) {
        console.error("Error fetching recent activity:", error);
        return [];
      }
    },
    enabled: !!user?.email && !!role
  });

  const getRoleIcon = () => {
    switch (role) {
      case "student":
        return <FaUserGraduate className="text-3xl text-primary" />;
      case "tutor":
        return <FaChalkboardTeacher className="text-3xl text-secondary" />;
      case "admin":
        return <FaUserShield className="text-3xl text-accent" />;
      default:
        return null;
    }
  };

  const getRoleWelcomeMessage = () => {
    switch (role) {
      case "student":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-base-100 rounded-lg shadow p-6 flex items-center">
              <FaBook className="text-3xl text-primary mr-4" />
              <div>
                <h3 className="text-2xl font-bold">{stats.bookingsCount || 0}</h3>
                <p className="text-gray-500">Booked Sessions</p>
              </div>
            </div>
            <div className="bg-base-100 rounded-lg shadow p-6 flex items-center">
              <FaStickyNote className="text-3xl text-secondary mr-4" />
              <div>
                <h3 className="text-2xl font-bold">{stats.notesCount || 0}</h3>
                <p className="text-gray-500">Personal Notes</p>
              </div>
            </div>
          </div>
        );
      case "tutor":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-base-100 rounded-lg shadow p-6 flex items-center">
              <FaCalendarAlt className="text-3xl text-primary mr-4" />
              <div>
                <h3 className="text-2xl font-bold">{stats.sessionsCount || 0}</h3>
                <p className="text-gray-500">Study Sessions</p>
              </div>
            </div>
            <div className="bg-base-100 rounded-lg shadow p-6 flex items-center">
              <FaFolder className="text-3xl text-secondary mr-4" />
              <div>
                <h3 className="text-2xl font-bold">-</h3>
                <p className="text-gray-500">Uploaded Materials</p>
              </div>
            </div>
          </div>
        );
      case "admin":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-base-100 rounded-lg shadow p-6 flex items-center">
              <FaUsers className="text-3xl text-primary mr-4" />
              <div>
                <h3 className="text-2xl font-bold">{stats.usersCount || 0}</h3>
                <p className="text-gray-500">Total Users</p>
              </div>
            </div>
            <div className="bg-base-100 rounded-lg shadow p-6 flex items-center">
              <FaBook className="text-3xl text-secondary mr-4" />
              <div>
                <h3 className="text-2xl font-bold">-</h3>
                <p className="text-gray-500">Study Sessions</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getQuickActions = () => {
    switch (role) {
      case "student":
        return (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                to="/dashboard/booked-sessions" 
                className="btn btn-primary flex flex-col items-center justify-center h-32 hover:scale-105 transition-transform"
              >
                <FaCalendarAlt className="text-2xl mb-2" />
                <span>My Sessions</span>
              </Link>
              <Link 
                to="/dashboard/create-note" 
                className="btn btn-secondary flex flex-col items-center justify-center h-32 hover:scale-105 transition-transform"
              >
                <FaPlusCircle className="text-2xl mb-2" />
                <span>Create Note</span>
              </Link>
              <Link 
                to="/dashboard/view-student-materials" 
                className="btn btn-accent flex flex-col items-center justify-center h-32 hover:scale-105 transition-transform"
              >
                <FaFolder className="text-2xl mb-2" />
                <span>Study Materials</span>
              </Link>
            </div>
          </div>
        );
      case "tutor":
        return (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                to="/dashboard/createStudy" 
                className="btn btn-primary flex flex-col items-center justify-center h-32 hover:scale-105 transition-transform"
              >
                <FaPlusCircle className="text-2xl mb-2" />
                <span>Create Session</span>
              </Link>
              <Link 
                to="/dashboard/my-study-sessions" 
                className="btn btn-secondary flex flex-col items-center justify-center h-32 hover:scale-105 transition-transform"
              >
                <FaCalendarAlt className="text-2xl mb-2" />
                <span>My Sessions</span>
              </Link>
              <Link 
                to="/dashboard/upload-materials" 
                className="btn btn-accent flex flex-col items-center justify-center h-32 hover:scale-105 transition-transform"
              >
                <FaFolder className="text-2xl mb-2" />
                <span>Upload Materials</span>
              </Link>
            </div>
          </div>
        );
      case "admin":
        return (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link 
                to="/dashboard/allUsers" 
                className="btn btn-primary flex flex-col items-center justify-center h-32 hover:scale-105 transition-transform"
              >
                <FaUsers className="text-2xl mb-2" />
                <span>Manage Users</span>
              </Link>
              <Link 
                to="/dashboard/all-study-sessions" 
                className="btn btn-secondary flex flex-col items-center justify-center h-32 hover:scale-105 transition-transform"
              >
                <FaBook className="text-2xl mb-2" />
                <span>All Sessions</span>
              </Link>
              <Link 
                to="/dashboard/admin-all-materials" 
                className="btn btn-accent flex flex-col items-center justify-center h-32 hover:scale-105 transition-transform"
              >
                <FaFolder className="text-2xl mb-2" />
                <span>All Materials</span>
              </Link>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Render recent activity feed
  const renderActivityFeed = () => {
    if (recentActivity.length === 0) {
      return (
        <div className="bg-base-100 rounded-lg shadow p-6 mt-8">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <FaHistory className="mr-2" /> Recent Activity
          </h3>
          <p className="text-gray-500 text-center py-4">No recent activity to display</p>
        </div>
      );
    }

    return (
      <div className="bg-base-100 rounded-lg shadow p-6 mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FaHistory className="mr-2" /> Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start p-3 hover:bg-base-200 rounded-lg transition-colors">
              <div className="mt-1 mr-3 text-xl">
                {activity.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{activity.title}</h4>
                <p className="text-gray-600">{activity.description}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render role-specific tips or announcements
  const renderRoleTips = () => {
    const tips = {
      student: [
        "Remember to review your notes regularly for better retention",
        "Book sessions in advance to secure your preferred time slots",
        "Check for new study materials uploaded by your tutors"
      ],
      tutor: [
        "Keep your session descriptions detailed and informative",
        "Upload supplementary materials to enhance learning",
        "Respond to student questions promptly"
      ],
      admin: [
        "Review new user registrations regularly",
        "Monitor session approvals to maintain quality",
        "Ensure all users have appropriate roles assigned"
      ]
    };

    const roleTips = tips[role] || [];
    
    if (roleTips.length === 0) return null;

    return (
      <div className="bg-base-100 rounded-lg shadow p-6 mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FaBell className="mr-2" /> Tips for You
        </h3>
        <ul className="space-y-2">
          {roleTips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="bg-base-200 rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-4">{getRoleIcon()}</div>
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">
          Welcome back, {user?.displayName || "User"}!
        </h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
          You are logged in as a <span className="capitalize font-semibold text-secondary">{role}</span>.
        </p>
        
        {/* Role-specific statistics */}
        {getRoleWelcomeMessage()}
        
        {/* Quick actions */}
        {getQuickActions()}
        
        {/* Recent activity feed */}
        {renderActivityFeed()}
        
        {/* Role-specific tips */}
        {renderRoleTips()}
        
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Need help? Check out your profile or contact support.
          </p>
          <Link 
            to="/dashboard/profile" 
            className="btn btn-outline mt-4"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;