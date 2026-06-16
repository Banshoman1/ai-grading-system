import React, { useState, useEffect } from 'react';
import {
  Users,
  BookOpen,
  FileText,
  TrendingUp,
  Upload,
  CheckCircle,
  BarChart3,
  Settings,
} from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import api from '../services/api';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalExams: 0,
    averagePerformance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const quickActions = [
    {
      title: 'Upload Scripts',
      description: 'Upload student answer scripts for grading',
      icon: Upload,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      link: '/upload',
    },
    {
      title: 'AI Grading',
      description: 'Grade answers using AI algorithms',
      icon: CheckCircle,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      link: '/grading',
    },
    {
      title: 'View Results',
      description: 'Check grading results and feedback',
      icon: FileText,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      link: '/results',
    },
    {
      title: 'Analytics',
      description: 'View performance analytics and charts',
      icon: BarChart3,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      link: '/analytics',
    },
  ];

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
          trend="5% increase"
        />
        <DashboardCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={BookOpen}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <DashboardCard
          title="Total Exams"
          value={stats.totalExams}
          icon={FileText}
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <DashboardCard
          title="Avg Performance"
          value={`${stats.averagePerformance}%`}
          icon={TrendingUp}
          bgColor="bg-orange-100"
          iconColor="text-orange-600"
          trend="2% up"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <a
                key={index}
                href={action.link}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:translate-y-[-4px]"
              >
                <div className={`${action.color} p-3 rounded-lg w-fit mb-4`}>
                  <Icon className={action.iconColor} size={24} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">CSC201 - Exam graded</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">25 students evaluated</p>
            </div>
            <span className="text-green-600 font-semibold">✓ Completed</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Student data updated</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">New students added</p>
            </div>
            <span className="text-blue-600 font-semibold">→ In Progress</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Monthly report generated</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">All courses analyzed</p>
            </div>
            <span className="text-green-600 font-semibold">✓ Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;