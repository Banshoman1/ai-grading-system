import React, { useState } from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState('student');
  const [dateRange, setDateRange] = useState('month');

  const reportTypes = [
    {
      id: 'student',
      title: 'Student Report',
      description: 'Individual student performance report',
      icon: '👤',
    },
    {
      id: 'course',
      title: 'Course Report',
      description: 'Course-wide performance analysis',
      icon: '📚',
    },
    {
      id: 'department',
      title: 'Department Report',
      description: 'Department-level statistics',
      icon: '🏢',
    },
    {
      id: 'semester',
      title: 'Semester Report',
      description: 'Comprehensive semester analysis',
      icon: '📊',
    },
  ];

  const handleGenerateReport = () => {
    toast.success(`${reportType} report generated!`);
  };

  const handleExportReport = () => {
    toast.success('Report exported as PDF!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Generate and export comprehensive reports</p>
      </div>

      {/* Report Type Selection */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setReportType(type.id)}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              reportType === type.id
                ? 'border-primary bg-primary bg-opacity-10'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary'
            }`}
          >
            <div className="text-3xl mb-2">{type.icon}</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">{type.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
          </button>
        ))}
      </div>

      {/* Report Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Generate Report</h2>

        <div className="space-y-6">
          {/* Date Range Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              <Calendar size={18} className="inline mr-2" />
              Date Range
            </label>
            <div className="grid md:grid-cols-4 gap-3">
              {[
                { value: 'week', label: 'This Week' },
                { value: 'month', label: 'This Month' },
                { value: 'semester', label: 'This Semester' },
                { value: 'year', label: 'This Year' },
              ].map((range) => (
                <button
                  key={range.value}
                  onClick={() => setDateRange(range.value)}
                  className={`px-4 py-3 rounded-lg border transition-all ${
                    dateRange === range.value
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-primary'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Report Details */}
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4">Report Details</h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>✓ Comprehensive performance metrics</li>
              <li>✓ Grade distribution analysis</li>
              <li>✓ Student progress tracking</li>
              <li>✓ Comparative analytics</li>
              <li>✓ Recommendations and insights</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button
              onClick={handleGenerateReport}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FileText size={20} />
              Generate Report
            </button>
            <button
              onClick={handleExportReport}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Export as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Sample Reports */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: 'Q1 Performance Summary',
            date: 'March 15, 2024',
            type: 'Semester',
          },
          {
            title: 'CSC201 Analysis Report',
            date: 'March 10, 2024',
            type: 'Course',
          },
          {
            title: 'Software Eng Department Stats',
            date: 'March 5, 2024',
            type: 'Department',
          },
          {
            title: 'Student Progress Tracking',
            date: 'March 1, 2024',
            type: 'Student',
          },
        ].map((report, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{report.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{report.date}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                {report.type}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                View
              </button>
              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold flex items-center justify-center gap-1">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;